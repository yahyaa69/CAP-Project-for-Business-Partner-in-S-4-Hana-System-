import cds from '@sap/cds';

export default cds.service.impl(async function () {
  const s4 = await cds.connect.to('API_BUSINESS_PARTNER');

  const entities = [
    'BusinessPartner',
    'BusinessPartnerAddress',
    'BusinessPartnerAddressUsage',
    'BusinessPartnerRole'
  ];

  for (const entity of entities) {
    for (const event of ['READ', 'CREATE']) {
      this.on(event, entity, async (req) => {
        return await s4.send({
          query: req.query,
          headers: { 'x-requested-with': 'XMLHttpRequest' }
        });
      });
    }
  }

  this.on('createBusinessPartner', async (req) => {
    const {
      BusinessPartnerCategory,
      BusinessPartnerGrouping,
      OrganizationBPName1,
      OrganizationBPName2,
      Language,
      BusinessPartnerRole,
      Country,
      CityName,
      PostalCode,
      StreetName,
      HouseNumber,
      AddressLanguage,
      AddressUsage,
      StandardUsage
    } = req.data;

    const requiredFields = [
      'BusinessPartnerCategory',
      'OrganizationBPName1',
      'Language',
      'BusinessPartnerRole',
      'Country',
      'CityName',
      'PostalCode',
      'StreetName',
      'HouseNumber',
      'AddressLanguage',
      'AddressUsage',
      'StandardUsage'
    ];

    for (const field of requiredFields) {
      const value = req.data[field];
      const isValid = field === 'StandardUsage'
        ? typeof value === 'boolean'
        : typeof value === 'string' && value.trim().length > 0;

      if (!isValid) {
        return req.reject(400, `${field} is required`);
      }
    }

    return await s4.send({
      method: 'POST',
      path: '/A_BusinessPartner',
      data: {
        BusinessPartnerCategory,
        BusinessPartnerGrouping,
        OrganizationBPName1,
        OrganizationBPName2,
        Language,
        to_BusinessPartnerRole: [
          { BusinessPartnerRole }
        ],
        to_BusinessPartnerAddress: [
          {
            Country,
            CityName,
            PostalCode,
            StreetName,
            HouseNumber,
            Language: AddressLanguage,
            to_AddressUsage: [
              { AddressUsage, StandardUsage }
            ]
          }
        ]
      },
      headers: { 'x-requested-with': 'XMLHttpRequest' }
    });
  });
});