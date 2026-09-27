sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"buisnesspartner/project1/test/integration/pages/BusinessPartnerList.gen",
	"buisnesspartner/project1/test/integration/pages/BusinessPartnerObjectPage.gen"
], function (JourneyRunner, BusinessPartnerListGenerated, BusinessPartnerObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('buisnesspartner/project1') + '/test/flp.html#app-preview',
        pages: {
			onTheBusinessPartnerListGenerated: BusinessPartnerListGenerated,
			onTheBusinessPartnerObjectPageGenerated: BusinessPartnerObjectPageGenerated
        },
        async: true
    });

    return runner;
});

