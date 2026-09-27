namespace PO;


entity PurchaseOrders{
 key PurchaseOrder          : String(10);
      Supplier               : String(10);
      CompanyCode            : String(4);
      PurchasingOrganization : String(4);
      PurchasingGroup        : String(3);
      DocumentDate           : Date;
      CreatedByUser          : String(12);
      PurchasingDocumentType : String(4);   
      Currency               : String(5);
}