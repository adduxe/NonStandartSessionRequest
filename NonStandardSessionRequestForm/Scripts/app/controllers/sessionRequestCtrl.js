"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {

    $scope.items = [];
    $scope.n = 0;

    $scope.AddSemesterBreaks = function () {
        if ($scope.n == 2) {
            alert("A maximum of 2 semester breaks are allowed per session.");
        } else {
            $scope.n += 1;
            $scope.items.push($scope.n);
        }
        return;
    }

    $scope.PopulateSemesterDropdown = function () {

        var acadSems =
            '[' +
                '{"semName":"2017 Spring", "semCode": 20172},' +
                '{"semName":"2017 Summer", "semCode": 20173},' +
                '{"semName":"2018 Fall", "semCode": 20181},' +
                '{"semName":"2018 Spring", "semCode": 20182}' +
            ']';                // only for testing  eventually this will be computed

        $scope.acadTerms = JSON.parse(acadSems);

        $("#semester").kendoDropDownList({
            dataTextField: "semName",
            dataValueField: "semCode",
            dataSource: {
                data: $scope.acadTerms
            }
        });

        return;
    };      // populateSemesterDropdown()


    $scope.PopulateCampusDropdown = function () {

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
        $scope.campusLocations = JSON.parse(offCampusLocs);

        $("#offCampusLocation").kendoDropDownList({
            dataTextField: "campusName",
            dataValueField: "campusCode",
            dataSource: {
                data: $scope.campusLocations
            }
        });
        return;
    };  // populateCampusDropdown


    $scope.PopulateRatesDropdown = function () {
        var rateTypes =
                '[' +
	                '{"rateCode": "STD",	"rateName":"Standard"},' +
	                '{"rateCode": "GB", 	"rateName":"Graduate Business"},' +
	                '{"rateCode": "GCA", 	"rateName":"Graduate Cinematic Arts"},' +
	                '{"rateCode": "GE",	    "rateName":"Graduate Engineering"},' +
	                '{"rateCode": "DT3",	"rateName":"Dentistry"},' +
	                '{"rateCode": "AD3",	"rateName":"Advanced Dentistry"},' +
	                '{"rateCode": "LAW",	"rateName":"Law"},' +
	                '{"rateCode": "MED",	"rateName":"Medicine"},' +
	                '{"rateCode": "OTH",	"rateName":"Others"}' +
                ']';

        $scope.rates = JSON.parse(rateTypes);
        $("#rateType").kendoDropDownList({
            dataTextField: "rateName",
            dataValueField: "rateCode",
            dataSource: {
                data: $scope.rates
            }
        });

        return;
    }   // populateRatesDropdown


    $(document).ready(function () {

        $scope.PopulateSemesterDropdown();
        $scope.PopulateCampusDropdown();
        $scope.PopulateRatesDropdown();

    }); // document.ready()

}]);    // sessionModule()