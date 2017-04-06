"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {


    $scope.Session = {
        sessionCode: "",
        sessionBreaks: [],
        sessionSections: []
    };

    // Add Semester Break functionality
    $scope.semBreaks = [];
    $scope.semBreakCount = 0;

    $scope.AddSemesterBreaks = function () {

        var semBreak = { startDate: "", endDate: "" };

        if ($scope.semBreakCount == 2) {
            alert("A maximum of 2 semester breaks are allowed per session.");
        } else {
            $scope.semBreaks[$scope.semBreakCount] = semBreak;
            $scope.semBreakCount += 1;
        }
        return;
    }   // AddSemesterBreaks()


    // Add a Section functionality

    $scope.sections = [];

    $scope.AddSection = function () {
        var section = { sectionNum: "", classSched: [] };
        $scope.sections.push(section);
        return;
    }   // AddSection()


    // Add a Class Schedule functionality

    $scope.AddSchedule = function (thisSection) {

        var sched = { classDay: "", classStartTime: "", classEndTime: "" };

        thisSection.classSched.push(sched);
        return;
    }   // AddSched()


    $scope.PopulateSemesterDropdown = function () {

        var acadSems =
            '[' +
                '{"semName":"2017 Spring", "semCode": 20172},' +
                '{"semName":"2017 Summer", "semCode": 20173},' +
                '{"semName":"2018 Fall", "semCode": 20181},' +
                '{"semName":"2018 Spring", "semCode": 20182}' +
            ']';    // only for testing  eventually this will be computed

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
    };   // populateRatesDropdown()


    $scope.PopulateSessionCodes = function () {

        $scope.sessionCodes =
            [
                "001      MAIN ON-CAMPUS SESSION",
                "002      LAW",
                "003      KECK - MD PROGRAM",
                "004      PHAR",
                "005      PHAR - PSCI & MPTX",
                "006      DENT - First Year",
                "007      DENT - Dental Hygiene First Year",
                "008      DENT - International First Year",
                "009      DENT - First Year Advanced",
                "010      DENT - Second Year Advanced",
                "011      DENT - Pediatric Dentistry Second Year",
                "012      DENT - OT",
                "013      PHAR - Continuing Student Program",
                "014      ENGR - DEN Program",
                "015      ENGR - DEN Program",
                "016      PHYS - Special Credit Exams for Subject Credit",
                "017      KECK - PM",
                "018      MAIN - Session with no tuition or fees",
                "019      KECK - PM"
            ];

    };  // PopulateSessionCodes()



    $(document).ready(function () {

        $scope.PopulateSemesterDropdown();
        $scope.PopulateCampusDropdown();
        $scope.PopulateRatesDropdown();
        $scope.PopulateSessionCodes();

    }); // document.ready()

}]);    // sessionModule()