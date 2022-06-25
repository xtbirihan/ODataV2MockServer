sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log"
], function (MockServer, Log) {
    "use strict";

    return {
        init: function () {
            var oMockServer = new MockServer({
                rootUri : "/"
            });

            oMockServer.simulate("../localService/metadata.xml", {
                sMockdataBaseUrl:  "../localService/mockdata",
                bGenerateMissingMockData: true
            });

            var fnCustom = function(oEvent) {
				var oXhr = oEvent.getParameter("oXhr");
				if (oXhr && oXhr.url.indexOf("first") > -1) {
					oEvent.getParameter("oFilteredData").results.splice(3, 100);
				}
			};
			oMockServer.attachAfter("GET", fnCustom, "Meetups");

            oMockServer.start();
            Log.info("Running the app with mock data");            
        }

    };
});