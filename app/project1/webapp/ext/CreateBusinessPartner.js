sap.ui.define([
  'sap/m/Button',
  'sap/m/CheckBox',
  'sap/m/ComboBox',
  'sap/m/Dialog',
  'sap/m/Input',
  'sap/ui/core/Item',
  'sap/m/Label',
  'sap/m/MessageBox',
  'sap/m/MessageToast',
  'sap/m/Title',
  'sap/m/VBox'
], function (
  Button,
  CheckBox,
  ComboBox,
  Dialog,
  Input,
  Item,
  Label,
  MessageBox,
  MessageToast,
  Title,
  VBox
) {
  'use strict';

  const serviceRoot = '/odata/v4/buisness-partner/';

  function createInput(value, maxLength) {
    return new Input({
      value,
      maxLength,
      width: '100%'
    });
  }

  function addField(items, labelText, control) {
    items.push(new Label({ text: labelText, labelFor: control }));
    items.push(control);
  }

  async function invokeCreateAction(values) {
    const tokenResponse = await fetch(serviceRoot, {
      headers: { 'X-CSRF-Token': 'Fetch' }
    });
    const csrfToken = tokenResponse.headers.get('X-CSRF-Token');
    const headers = { 'Content-Type': 'application/json' };

    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    const response = await fetch(`${serviceRoot}createBusinessPartner`, {
      method: 'POST',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const message = errorBody.error?.message;
      throw new Error(typeof message === 'string' ? message : `Create failed (${response.status})`);
    }

    return response.json();
  }

  return {
    openCreateDialog: function (context) {
      const formItems = [];
      const fields = {
        BusinessPartnerCategory: new ComboBox({
          selectedKey: '',
          width: '100%',
          items: [
            new Item({ key: '1', text: 'Person' }),
            new Item({ key: '2', text: 'Organization' }),
            new Item({ key: '3', text: 'Group' })
          ]
        }),
        BusinessPartnerGrouping: createInput('', 4),
        OrganizationBPName1: createInput('', 40),
        OrganizationBPName2: createInput('', 40),
        Language: createInput('', 2),
        BusinessPartnerRole: createInput('', 6),
        Country: createInput('', 3),
        CityName: createInput('', 40),
        PostalCode: createInput('', 10),
        StreetName: createInput('', 60),
        HouseNumber: createInput('', 10),
        AddressLanguage: createInput('', 2),
        AddressUsage: createInput('', 10),
        StandardUsage: new CheckBox({ selected: false })
      };

      formItems.push(new Title({ text: 'Business Partner', level: 'H5' }));
      addField(formItems, 'Category', fields.BusinessPartnerCategory);
      addField(formItems, 'Grouping ',
         fields.BusinessPartnerGrouping);
      addField(formItems, 'Organization Name', fields.OrganizationBPName1);
      addField(formItems, 'Organization Name 2', fields.OrganizationBPName2);
      addField(formItems, 'Language', fields.Language);

      formItems.push(new Title({ text: 'Role', level: 'H5' }));
      addField(formItems, 'Business Partner Role', fields.BusinessPartnerRole);

      formItems.push(new Title({ text: 'Address', level: 'H5' }));
      addField(formItems, 'Country', fields.Country);
      addField(formItems, 'City', fields.CityName);
      addField(formItems, 'Postal Code', fields.PostalCode);
      addField(formItems, 'Street', fields.StreetName);
      addField(formItems, 'House Number', fields.HouseNumber);
      addField(formItems, 'Address Language', fields.AddressLanguage);

      formItems.push(new Title({ text: 'Address Usage', level: 'H5' }));
      addField(formItems, 'Address Usage', fields.AddressUsage);
      addField(formItems, 'Standard Usage', fields.StandardUsage);

      let dialog;
      const createButton = new Button({
        text: 'Create',
        type: 'Emphasized',
        press: async function () {
          const values = Object.fromEntries(
            Object.entries(fields).map(([name, control]) => [
              name,
              control instanceof CheckBox
                ? control.getSelected()
                : control instanceof ComboBox
                  ? control.getSelectedKey()
                  : control.getValue()
            ])
          );
          createButton.setEnabled(false);

          try {
            const result = await invokeCreateAction(values);
            dialog.close();
            MessageToast.show(
              result.BusinessPartner
                ? `Business Partner ${result.BusinessPartner} created`
                : 'Business Partner created'
            );
            const model = context?.getModel?.();
            model?.refresh?.();
          } catch (error) {
            MessageBox.error(error.message);
          } finally {
            createButton.setEnabled(true);
          }
        }
      });

      dialog = new Dialog({
        title: 'Create Business Partner',
        contentWidth: '36rem',
        contentHeight: '80%',
        stretchOnPhone: true,
        verticalScrolling: true,
        content: [new VBox({ width: '100%', items: formItems })],
        beginButton: createButton,
        endButton: new Button({
          text: 'Cancel',
          press: function () {
            dialog.close();
          }
        }),
        afterClose: function () {
          dialog.destroy();
        }
      });

      dialog.open();
    }
  };
});