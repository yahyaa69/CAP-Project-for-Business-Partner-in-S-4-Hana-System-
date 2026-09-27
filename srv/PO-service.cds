using { API_BUSINESS_PARTNER as s4 } from  './external/API_BUSINESS_PARTNER';

@path: 'buisness-partner'

service BusinessPartnerService {

      entity BusinessPartner as projection on s4.A_BusinessPartner;
      entity BusinessPartnerAddress as projection on s4.A_BusinessPartnerAddress;
      entity BusinessPartnerAddressUsage as projection on s4.A_BuPaAddressUsage;
      entity BusinessPartnerRole as projection on s4.A_BusinessPartnerRole;

      action createBusinessPartner(
            @Common.Label: 'Business Partner Category'
            @Common.FieldControl: #Mandatory
            BusinessPartnerCategory: String(1),
            @Common.Label: 'Business Partner Grouping'
            BusinessPartnerGrouping: String(4),
            @Common.Label: 'Organization Name'
            @Common.FieldControl: #Mandatory
            OrganizationBPName1: String(40),
            @Common.Label: 'Organization Name 2'
            OrganizationBPName2: String(40),
            @Common.Label: 'Language'
            @Common.FieldControl: #Mandatory
            Language: String(2),
            @Common.Label: 'Business Partner Role'
            @Common.FieldControl: #Mandatory
            BusinessPartnerRole: String(6),
            @Common.Label: 'Country'
            @Common.FieldControl: #Mandatory
            Country: String(3),
            @Common.Label: 'City'
            @Common.FieldControl: #Mandatory
            CityName: String(40),
            @Common.Label: 'Postal Code'
            @Common.FieldControl: #Mandatory
            PostalCode: String(10),
            @Common.Label: 'Street'
            @Common.FieldControl: #Mandatory
            StreetName: String(60),
            @Common.Label: 'House Number'
            @Common.FieldControl: #Mandatory
            HouseNumber: String(10),
            @Common.Label: 'Address Language'
            @Common.FieldControl: #Mandatory
            AddressLanguage: String(2),
            @Common.Label: 'Address Usage'
            @Common.FieldControl: #Mandatory
            AddressUsage: String(10),
            @Common.Label: 'Standard Usage'
            @Common.FieldControl: #Mandatory
            StandardUsage: Boolean
      ) returns BusinessPartner;
}

annotate BusinessPartnerService.BusinessPartner with
      @Capabilities.InsertRestrictions.Insertable: true
      

