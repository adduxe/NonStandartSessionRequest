"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {

    $scope.Session = {
        sessionCode: "",
        sessionBreaks: [],
        sessionSections: []
    };

    $scope.SessionCode = function () {
//        alert($scope.sessionCode);
    }

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

    // datepart: 'y', 'm', 'w', 'd', 'h', 'm', 's'
    Date.dateDiff = function (datepart, fromdate, todate) {
        datepart = datepart.toLowerCase();
        var diff = todate - fromdate;
        var divideBy = {
            w: 604800000,   // weeks
            d: 86400000,    // days
            h: 3600000,     // hours
            m: 60000,       // minutes
            s: 1000         // seconds
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
        var newDate = new Date(startDate);
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


            // Validate the Class Start and End dates
    $scope.ClassDatesChanged = function () {

        if (($scope.classStartDate > '') && ($scope.classEndDate > '')) {

            var startDt = new Date($scope.classStartDate);
            var endDt = new Date($scope.classEndDate);

            if (startDt > endDt) {

                alert("Class Start Date later than Class End Date");

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

            var startDt = new Date($scope.finalsStartDate);
            var endDt = new Date($scope.finalsEndDate);

                // Compute Final Grading Period
            if (startDt > endDt) {
                alert("First day of Finals later than Last Day of Finals");
            } else {
                    // First Day of Grading = First Day of Finals
                $scope.lastFinalGradingStartDate = (startDt.getMonth() + 1) + '/' + startDt.getDate() + '/' + startDt.getFullYear();
                var lastDayGradingDt = new Date();
                lastDayGradingDt.setDate(endDt.getDate() + 4);      // Last Day for Grading = Last Day of Finals + 4 days
                $scope.lastFinalGradingEndDate = (lastDayGradingDt.getMonth() + 1) + '/' + lastDayGradingDt.getDate() + '/' + lastDayGradingDt.getFullYear();
            }

        }   // if (($scope...
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

    $scope.PopulateSessionCodes = function () {

        $scope.sessionCodes = [
                "001  MAIN ON-CAMPUS SESSION",
                "002  LAW",
                "003  KECK - MD PROGRAM",
                "004  PHAR",
                "005  PHAR - PSCI & MPTX",
                "006  DENT - First Year",
                "007  DENT - Dental Hygiene First Year",
                "008  DENT - International First Year",
                "009  DENT - First Year Advanced",
                "010  DENT - Second Year Advanced",
                "011  DENT - Pediatric Dentistry Second Year",
                "012  DENT - OT",
                "013  PHAR - Continuing Student Program",
                "014  ENGR - DEN Program",
                "015  ENGR - DEN Program",
                "016  PHYS - Special Credit Exams for Subject Credit",
                "017  KECK - PM",
                "018  MAIN - Session with no tuition or fees",
                "019  KECK - PM"
            ];
    };  // PopulateSessionCodes()

    $scope.SetRates = function () {

        if (($scope.acadTerm > '') && ($scope.rateType > '')) {
            var rateIndex = $scope.acadTerm + $scope.rateType;
            $scope.tuitionFlatRate = rates[rateIndex].flatRate;
            $scope.tuitionUnitRate = rates[rateIndex].unitRate;
        }
        return;
    }

    var holidays = [];

    var rates =
        {       // 2017 Fall Rates
            "20171STD": { unitRate: "u_20171STD", flatRate: "f_20171STD" },
            "20171GB": { unitRate: "u_20171GB", flatRate: "f_20171GB" },
            "20171GCA": { unitRate: "u_20171GCA", flatRate: "f_20171GCA" },
            "20171GE": { unitRate: "u_20171GE", flatRate: "f_20171GE" },
            "20171DT3": { unitRate: "u_20171DT3", flatRate: "f_20171DT3" },
            "20171AD3": { unitRate: "u_20171AD3", flatRate: "f_20171AD3" },
            "20171LAW": { unitRate: "u_20171LAW", flatRate: "f_20171LAW" },
            "20171MED": { unitRate: "u_20171MED", flatRate: "f_20171MED" },
            "20171OTH": { unitRate: "u_20171OTH", flatRate: "f_20171OTH" },

            // 2017 Spring Rates
            "20172STD": { unitRate: "u_20172STD", flatRate: "f_20172STD" },
            "20172GB": { unitRate: "u_20172GB", flatRate: "f_20172GB" },
            "20172GCA": { unitRate: "u_20172GCA", flatRate: "f_20172GCA" },
            "20172GE": { unitRate: "u_20172GE", flatRate: "f_20172GE" },
            "20172DT3": { unitRate: "u_20172DT3", flatRate: "f_20172DT3" },
            "20172AD3": { unitRate: "u_20172AD3", flatRate: "f_20172AD3" },
            "20172LAW": { unitRate: "u_20172LAW", flatRate: "f_20172LAW" },
            "20172MED": { unitRate: "u_20172MED", flatRate: "f_20172MED" },
            "20172OTH": { unitRate: "u_20172OTH", flatRate: "f_20172OTH" },

            // 2017 Summer Rates
            "20173STD": { unitRate: "u_20173STD", flatRate: "f_20173STD" },
            "20173GB": { unitRate: "u_20173GB", flatRate: "f_20173GB" },
            "20173GCA": { unitRate: "u_20173GCA", flatRate: "f_20173GCA" },
            "20173GE": { unitRate: "u_20173GE", flatRate: "f_20173GE" },
            "20173DT3": { unitRate: "u_20173DT3", flatRate: "f_20173DT3" },
            "20173AD3": { unitRate: "u_20173AD3", flatRate: "f_20173AD3" },
            "20173LAW": { unitRate: "u_20173LAW", flatRate: "f_20173LAW" },
            "20173MED": { unitRate: "u_20173MED", flatRate: "f_20173MED" },
            "20173OTH": { unitRate: "u_20173OTH", flatRate: "f_20173OTH" },

            // 2018 Fall Rates
            "20181STD": { unitRate: "u_20181STD", flatRate: "f_20181STD" },
            "20181GB": { unitRate: "u_20181GB", flatRate: "f_20181GB" },
            "20181GCA": { unitRate: "u_20181GCA", flatRate: "f_20181GCA" },
            "20181GE": { unitRate: "u_20181GE", flatRate: "f_20181GE" },
            "20181DT3": { unitRate: "u_20181DT3", flatRate: "f_20181DT3" },
            "20181AD3": { unitRate: "u_20181AD3", flatRate: "f_20181AD3" },
            "20181LAW": { unitRate: "u_20181LAW", flatRate: "f_20181LAW" },
            "20181MED": { unitRate: "u_20181MED", flatRate: "f_20181MED" },
            "20181OTH": { unitRate: "u_20181OTH", flatRate: "f_20181OTH" }
        };

    function PopulateSemesterDropdown (){

        var currDate = new Date();
        var currYear = currDate.getFullYear();
        var nextYear = parseInt(currYear) + 1;

        var springDate = new Date("01/01/" + currYear);
        var summerDate = new Date("05/01/" + currYear);
        var fallDate = new Date("08/01/" + currYear);

        var semChoices = [];

        if ((currDate >= springDate) && (currDate < summerDate)) {      // Display Spring Current Year to Spring Next Year

            semChoices = [

                { semName: currYear + " Spring", semCode: currYear + "1" },
                { semName: currYear + " Summer",    semCode: currYear + "2" },
                { semName: currYear + " Fall",      semCode: nextYear + "3" },
                { semName: nextYear + " Spring",    semCode: nextYear + "1" }
            ];

        } else if ((currDate >= summerDate) && (currDate < fallDate)){  // Display Summer Current Year to Summer Next Year

            semChoices = [

                { semName: currYear + " Summer",    semCode: currYear + "2" },
                { semName: currYear + " Fall",      semCode: currYear + "3" },
                { semName: nextYear + " Spring",    semCode: nextYear + "1" },
                { semName: nextYear + " Summer",    semCode: nextYear + "2" }
            ];

        } else {                                                        // Display Current Fall to Next Year Fall
            
            semChoices = [

                { semName: currYear + " Fall",      semCode: currYear + "3" },
                { semName: nextYear + " Spring",    semCode: nextYear + "1" },
                { semName: nextYear + " Summer",    semCode: nextYear + "2" },
                { semName: nextYear + " Fall",      semCode: nextYear + "3" }
            ];
        }

        $scope.semesters = semChoices;
    }   // PopulateSemesterDropdown


    $(document).ready(function () {

        $scope.PopulateSessionCodes();

        PopulateSemesterDropdown();

        $scope.rateTypes = [                                    // Populate the Rate Type dropdown

	        { rateCode: "STD", rateName: "Standard" },
	        {rateCode: "GB",  rateName:"Graduate Business"},
	        {rateCode: "GCA", rateName:"Graduate Cinematic Arts"},
	        {rateCode: "GE",  rateName:"Graduate Engineering"},
	        {rateCode: "DT3", rateName:"Dentistry"},
	        {rateCode: "AD3", rateName:"Advanced Dentistry"},
	        {rateCode: "LAW", rateName:"Law"},
	        {rateCode: "MED", rateName:"Medicine"},
	        {rateCode: "OTH", rateName:"Others"}
        ];

        $scope.campusLocs = [                                   // Populate the Campus Location dropdown.

                { campusCode: "HSC", campusName: "Health Science Campus" },
                { campusCode: "OCC", campusName: "Orange County Campus" },
                { campusCode: "OVS", campusName: "Overseas" },
                { campusCode: "DC", campusName: "Washington D.C." },
                { campusCode: "SAC", campusName: "Sacramento" },
                { campusCode: "USA", campusName: "Off-campus in U.S." },
                { campusCode: "VIR", campusName: "Virtual(DEN/Online)" },
                { campusCode: "CAT", campusName: "Catalina" },
                { campusCode: "LAC", campusName: "L.A. Center" },
                { campusCode: "SD", campusName: "San Diego" },
                { campusCode: "ATT", campusName: "AT&T Center" },
                { campusCode: "SKB", campusName: "No Tuition or Fees" },
                { campusCode: "OTH", campusName: "Others" }
         ];

        /*
                                2017 	                2018 	                2019 	                2020
        New Year’s Day 	        Mon 1/2 	            Mon 1/1 	            Tue 1/1 	            Wed 1/1
        Martin Luther King Day 	Mon 1/16 	            Mon 1/15 	            Mon 1/21 	            Mon 1/20
        Presidents’ Day 	    Mon 2/20 	            Mon 2/19 	            Mon 2/18 	            Mon 2/17
        Memorial Day 	        Mon 5/29 	            Mon 5/28 	            Mon 5/27 	            Mon 5/25
        Independence Day 	    Mon 7/3-Tue 7/4         Wed 7/4 	            Thu 7/4-Fri 7/5         Fri 7/3
        Labor Day 	            Mon 9/4 	            Mon 9/3 	            Mon 9/2 	            Mon 9/7
        Thanksgiving 	        Thu 11/23–Fri 11/24     Thu 11/22–Fri 11/23     Thu 11/28–Fri 11/29 	Thu 11/26–Fri 11/27
        Christmas 	            Mon 12/25 	            Mon 12/24–Tue 12/25     Wed 12/25 	            Fri 12/25
        Winter Recess 	        Tue 12/26–Fri 12/29     Wed 12/26–Mon 12/31     Thu 12/26–Tue 12/31 	Mon 12/28–Thu 12/31
*/
        holidays = [
            "1/2/2017", "1/16/2017", "2/20/2017", "5/29/2017", "7/3/2017", "7/4/2017", "9/14/2017", "11/23/2017", "11/24/2017", "11/24/2017", "12/25/2017", "12/26/2017", "12/27/2017", "12/28/2017", "12/29/2017",
            "1/1/2018", "1/15/2018", "2/19/2018", "5/28/2018", "7/4/2018", "9/3/2018", "11/22/2018", "11/23/2018", "12/24/2018", "12/25/2018", "12/25/2018", "12/26/2018", "12/27/2018", "12/28/2018", "12/29/2018", "12/30/2017", "12/31/2018",
            "1/1/2019", "1/21/2019", "2/18/2019", "5/27/2019", "7/4/2019", "7/5/2019", "9/2/2019", "11/28/2019", "11/29/2019", "12/25/2019", "12/26/2019", "12/27/2019", "12/28/2019", "12/29/2019", "12/30/2019", "12/31/2019",
            "1/1/2020", "1/20/2020", "2/17/2020", "5/25/2020", "7/3/2020", "9/7/2020", "11/26/2020", "11/27/2020", "12/25/2020", "12/28/2020", "12/29/2020", "12/30/2020", "12/31/2020"
        ];

    }); // document.ready()

}]);    // sessionModule()