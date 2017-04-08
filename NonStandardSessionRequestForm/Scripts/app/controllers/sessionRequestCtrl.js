"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {


    $scope.Session = {
        sessionCode: "",
        sessionBreaks: [],
        sessionSections: []
    };

    // Add Semester Break functionality
    $scope.semBreaks = [];
    $scope.AddSemesterBreaks = function () {

        var semBreak = { startDate: "", endDate: "" };

        if ($scope.semBreaks.length == 2) {
            alert("A maximum of 2 semester breaks are allowed per session.");
        } else {
            $scope.semBreaks.push(semBreak);
        }
        return;
    }   // AddSemesterBreaks()

    // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
    Date.dateDiff = function (datepart, fromdate, todate) {
        datepart = datepart.toLowerCase();
        var diff = todate - fromdate;
        var divideBy = {
            w: 604800000,
            d: 86400000,
            h: 3600000,
            n: 60000,
            s: 1000
        };

        return Math.floor(diff / divideBy[datepart]);
    }   // Date.dateDiff


    //  1) Calculates computed dates given the:
    //      a) start date
    //      b) end date
    //      c) percentage number of days to be added to the start date
    //
    //  2) If the new date falls on a weekend, or a holiday:
    //      - move it to the next school day      

    function ComputeDate(startDate, endDate, percentAdd) {

        var totalDays = Date.dateDiff('d', startDate, endDate) + 1;
        var daysToAdd = Math.round(totalDays * (percentAdd/100));
        var newDate = new Date();
        var newDtmonthDay = '';

        do {
            newDate.setDate(startDate.getDate() + daysToAdd - 1);
            switch (newDate.getDay()) {
                case 0:     // Sunday
                    newDate.setDate(newDate.getDate() + 1);
                    break;
                case 6:     // Saturday
                    newDate.setDate(newDate.getDate() + 2);
                    break;
                default:
                    break;
            } // switch()

            newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            if (holidays.indexOf(newDtmonthDay) > -1) {
                newDate.setDate(newDate.getDate() + 1);
                newDtmonthDay = newDate.getMonth() +1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
        }
        while ((newDate.getDay() == 0) || (newDate.getDay() == 6) || (holidays.indexOf(newDtmonthDay) > -1));

        if (newDate > endDate) {    // if computed new date is beyond the Last Day of classes,
            newDate = endDate;      //  make it equal to the last day of classes.
        }
            
        return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear());
    }   // ComputeDate()


    //// Validate the Class Start and End dates
    $scope.ClassDatesChanged = function () {

        if (($scope.classStartDate > '') && ($scope.classEndDate > '')) {

            var startDt = new Date($scope.classStartDate);
            var endDt = new Date($scope.classEndDate);

            if (startDt > endDt) {

                alert("Start Date later than End Date");

            } else {        // dates OK.  Calculate computed date fields.

                $scope.lastDayAddDrop = ComputeDate(startDt, endDt, 20);    // Last day to Add/Drop (20%)
                $scope.lastDayEnrollOptionChange = ComputeDate(startDt, endDt, 40); // Last day to Change Enrollment Options (40%)
                $scope.lastDayWithdraw = ComputeDate(startDt, endDt, 80);   // Last Day to Withdraw (80%)

            }   // if (startDt...
        }   // if (($scope...
        return;
    }       // ClassDateChanged()


    $scope.FinalsDatesChanged = function () {

        if (($scope.finalsStartDate > '') && ($scope.finalsEndDate > '')) {
            // compute Final Grading Period
        } else {

        } // if (($scope...
    }   // FinalsDatesChanged()

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
    };                  // PopulateSemesterDropdown()


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
    };              // PopulateCampusDropdown


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
    };              // PopulateRatesDropdown()


    $scope.PopulateSessionCodes = function () {

        $scope.sessionCodes = [
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

    var holidays = [];
    $(document).ready(function () {

        $scope.PopulateSemesterDropdown();
        $scope.PopulateCampusDropdown();
        $scope.PopulateRatesDropdown();
        $scope.PopulateSessionCodes();

/*
                        2017 	            2018 	            2019 	                2020
New Year’s Day 	        Mon 1/2 	        Mon 1/1 	        Tue 1/1 	            Wed 1/1
Martin Luther King Day 	Mon 1/16 	        Mon 1/15 	        Mon 1/21 	            Mon 1/20
Presidents’ Day 	    Mon 2/20 	        Mon 2/19 	        Mon 2/18 	            Mon 2/17
Memorial Day 	        Mon 5/29 	        Mon 5/28 	        Mon 5/27 	            Mon 5/25
Independence Day 	    Mon 7/3-Tue 7/4     Wed 7/4 	        Thu 7/4-Fri 7/5         Fri 7/3
Labor Day 	            Mon 9/4 	        Mon 9/3 	        Mon 9/2 	            Mon 9/7
Thanksgiving 	        Thu 11/23–Fri 11/24 Thu 11/22–Fri 11/23 Thu 11/28–Fri 11/29 	Thu 11/26–Fri 11/27
Christmas 	            Mon 12/25 	        Mon 12/24–Tue 12/25 Wed 12/25 	            Fri 12/25
Winter Recess 	        Tue 12/26–Fri 12/29 Wed 12/26–Mon 12/31 Thu 12/26–Tue 12/31 	Mon 12/28–Thu 12/31
*/
        holidays = [
            "1/2/2017", "1/16/2017", "2/20/2017", "5/29/2017", "7/3/2017", "7/4/2017", "9/14/2017", "11/23/2017", "11/24/2017", "11/24/2017", "12/25/2017", "12/26/2017", "12/27/2017", "12/28/2017", "12/29/2017",
            "1/1/2018", "1/15/2018", "2/19/2018", "5/28/2018", "7/4/2018", "9/3/2018", "11/22/2018", "11/23/2018", "12/24/2018", "12/25/2018", "12/25/2018", "12/26/2018", "12/27/2018", "12/28/2018", "12/29/2018", "12/30/2017", "12/31/2018",
            "1/1/2019", "1/21/2019", "2/18/2019", "5/27/2019", "7/4/2019", "7/5/2019", "9/2/2019", "11/28/2019", "11/29/2019", "12/25/2019", "12/26/2019", "12/27/2019", "12/28/2019", "12/29/2019", "12/30/2019", "12/31/2019",
            "1/1/2020", "1/20/2020", "2/17/2020", "5/25/2020", "7/3/2020", "9/7/2020", "11/26/2020", "11/27/2020", "12/25/2020", "12/28/2020", "12/29/2020", "12/30/2020", "12/31/2020"
        ];

    }); // document.ready()

}]);    // sessionModule()