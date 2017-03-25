"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {

    $(document).ready(function () {

        var acadSems =
            '[' +
                '{"semName":"2017 Spring", "semCode": 20172},' +
                '{"semName":"2017 Summer", "semCode": 20173},' +
                '{"semName":"2018 Fall", "semCode": 20181},' +
                '{"semName":"2018 Spring", "semCode": 20182}' +
            ']';                // only for testing

        $scope.acadTerms = JSON.parse(acadSems);

        $("#semester").kendoDropDownList({     // populate the off-campus location dropdown
            dataTextField: "semName",
            dataValueField: "semCode",
            dataSource: {
                data: $scope.acadTerms      // just for testing
            }
        }); // $("#sessionCode")

        var offCampusLocs =
                '[' +
	                '{"campusCode": "HSC",	"campusName":"Health Science Campus"},' +
	                '{"campusCode": "OCC", 	"campusName":"Orange County Campus"},' +
	                '{"campusCode": "OVS", 	"campusName":"Overseas"},' +
	                '{"campusCode": "DC",	"campusName":"Washington D.C."},' +
	                '{"campusCode": "SAC",	"campusName":"Sacramento"},' +
	                '{"campusCode": "USA",	"campusName":"Off-campus in U.S."},' +
	                '{"campusCode": "VIR",	"campusName":"Virtual(DEN/Online)"},' +
	                '{"campusCode": "CAT",	"campusName":"Catalina"},' +
	                '{"campusCode": "LAC",	"campusName":"L.A. Center"},' +
	                '{"campusCode": "SD",	"campusName":"San Diego"},' +
	                '{"campusCode": "ATT",	"campusName":"AT&T Center"},' +
	                '{"campusCode": "SKB",	"campusName":"No Tuition or Fees"},' +
	                '{"campusCode": "OTH",	"campusName":"Others"}' +
                ']';

        $scope.campusLocations = JSON.parse(offCampusLocs);     // populate the off-campus location dropdown
        $("#offCampusLocation").kendoDropDownList({
            dataTextField: "campusName",
            dataValueField: "campusCode",
            dataSource: {
                data: $scope.campusLocations
            }
        }); // $("#offCampusLocation")

    }); // document.ready()

}]);    // sessionModule()