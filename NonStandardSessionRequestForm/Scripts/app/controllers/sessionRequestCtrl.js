"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {

        // Add Semester Break functionality
    $scope.AddSemesterBreaks = function () {

        var semBreak = { startDate: "", endDate: "" };

        if ($scope.session.sessionBreaks.length == 2) {
            alert("A maximum of 2 semester breaks are allowed per session.");
        } else {
            $scope.session.sessionBreaks.push(semBreak);
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
                case 0:             // if the computed day falls on a Sunday
                    newDate.setDate(newDate.getDate() + 1);     // add a day to make it a Monday
                    break;
                case 6:             // Saturday
                    newDate.setDate(newDate.getDate() + 2);     // add 2 days to make it a Monday
                    break;
                default:
                    break;
            } // switch()

            newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            if (holidays.indexOf(newDtmonthDay) > -1) {     // if the new date falls on a holiday, add a day
                newDate.setDate(newDate.getDate() + 1);
                newDtmonthDay = newDate.getMonth() +1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
        }       // keep checking until the computed day is not a weekend nor a holiday
        while ((newDate.getDay() == 0) || (newDate.getDay() == 6) || (holidays.indexOf(newDtmonthDay) > -1));

        if (newDate > endDate) {    // if computed new date is beyond the Last Day of classes,
            newDate = endDate;      //  make it equal to the last day of classes.
        }
            
        return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear());
    }   // ComputeDate()


            // Validate the Class Start and End dates
    $scope.ClassDatesChanged = function () {

        if (($scope.session.firstDayOfClass > '') && ($scope.session.lastDayOfClass > '')) {

            var startDt = new Date($scope.session.firstDayOfClass);
            var endDt = new Date($scope.session.lastDayOfClass);

            if (startDt > endDt) {

                alert("Class Start Date later than Class End Date");

            } else {        // dates OK.  Calculate computed date fields.

                $scope.session.lastDayToAddDrop = ComputeDate(startDt, endDt, 20);    // Last day to Add/Drop (20%)
                $scope.session.lastDayEnrollChange = ComputeDate(startDt, endDt, 40); // Last day to Change Enrollment Options (40%)
                $scope.session.lastDayToWithdraw = ComputeDate(startDt, endDt, 80);   // Last Day to Withdraw (80%)

            }   // if (startDt...
        }   // if (($scope...
        return;
    }       // ClassDateChanged()


    $scope.FinalsDatesChanged = function () {

        if (($scope.session.firstDayOfFinals > '') && ($scope.session.lastDayOfFinals > '')) {

            var startDt = new Date($scope.session.firstDayOfFinals);
            var endDt = new Date($scope.session.lastDayOfFinals);

                // Compute Final Grading Period
            if (startDt > endDt) {
                alert("First day of Finals later than Last Day of Finals");
            } else {
                    // First Day of Grading = First Day of Finals
                $scope.session.firstDayForFinalGrades = (startDt.getMonth() + 1) + '/' + startDt.getDate() + '/' + startDt.getFullYear();
                var lastDayGradingDt = new Date();
                lastDayGradingDt.setDate(endDt.getDate() + 4);      // Last Day for Grading = Last Day of Finals + 4 days
                $scope.session.lastDayForFinalGrades = (lastDayGradingDt.getMonth() + 1) + '/' + lastDayGradingDt.getDate() + '/' + lastDayGradingDt.getFullYear();
            }
        }   // if (($scope...
    }   // FinalsDatesChanged()

        // Add a Section functionality
    $scope.AddSection = function () {

        var section = { sectionNum: "", classSched: [] };
        $scope.session.sections.push(section);
        return;
    }

        // Add a Class Schedule functionality
    $scope.AddSchedule = function (thisSection) {
        var sched = { classDay: "", classStartTime: "", classEndTime: "" };
        thisSection.classSched.push(sched);
        return;
    }


    function PopulateSessionCodes() {

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

        if (($scope.session.acadTerm > '') && ($scope.session.rateType > '')) {
            var rateIndex = $scope.session.acadTerm + $scope.session.rateType;
            $scope.session.tuitionFlatRate = rates[rateIndex].flatRate;
            $scope.session.tuitionUnitRate = rates[rateIndex].unitRate;
        }
        return;
    }

    var holidays = [];

    var rates =
        {       // 2017 Spring Rates
            "20171STD": { unitRate: "24732", flatRate: "1666" },
            "20171GB": { unitRate: "n/a", flatRate: "1710" },
            "20171GCA": { unitRate: "n/a", flatRate: "1772" },
            "20171GE": { unitRate: "n/a", flatRate: "1774" },
            "20171DT3": { unitRate: "28142", flatRate: "1666" },
            "20171AD3": { unitRate: "28445", flatRate: "1666" },
            "20171LAW": { unitRate: "28643", flatRate: "2214" },
            "20171MED": { unitRate: "28424", flatRate: "1666" },
            "20171OTH": { unitRate: "", flatRate: "" },

            // 2017 Summer Rates
            "20172STD": { unitRate: "25732", flatRate: "2666" },
            "20172GB": { unitRate: "n/a", flatRate: "2710" },
            "20172GCA": { unitRate: "n/a", flatRate: "2772" },
            "20172GE": { unitRate: "n/a", flatRate: "2774" },
            "20172DT3": { unitRate: "29142", flatRate: "2666" },
            "20172AD3": { unitRate: "29445", flatRate: "2666" },
            "20172LAW": { unitRate: "29643", flatRate: "2214" },
            "20172MED": { unitRate: "29424", flatRate: "2666" },
            "20172OTH": { unitRate: "", flatRate: "" },

            // 2017 Fall Rates
            "20173STD": { unitRate: "26732", flatRate: "3666" },
            "20173GB": { unitRate: "n/a", flatRate: "3710" },
            "20173GCA": { unitRate: "n/a", flatRate: "3774" },
            "20173GE": { unitRate: "n/a", flatRate: "3774" },
            "20173DT3": { unitRate: "30142", flatRate: "3666" },
            "20173AD3": { unitRate: "30445", flatRate: "3666" },
            "20173LAW": { unitRate: "30643", flatRate: "3214" },
            "20173MED": { unitRate: "30424", flatRate: "3666" },
            "20173OTH": { unitRate: "", flatRate: "" },

            // 2018 Spring Rates
            "20181STD": { unitRate: "27732", flatRate: "4666" },
            "20181GB": { unitRate: "n/a", flatRate: "4710" },
            "20181GCA": { unitRate: "n/a", flatRate: "4772" },
            "20181GE": { unitRate: "n/a", flatRate: "4774" },
            "20181DT3": { unitRate: "31142", flatRate: "4666" },
            "20181AD3": { unitRate: "31445", flatRate: "4666" },
            "20181LAW": { unitRate: "31643", flatRate: "4214" },
            "20181MED": { unitRate: "31424", flatRate: "4666" },
            "20181OTH": { unitRate: "", flatRate: "" }
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

                { semName: currYear + " Spring",    semCode: currYear + "1" },
                { semName: currYear + " Summer",    semCode: currYear + "2" },
                { semName: currYear + " Fall",      semCode: currYear + "3" },
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


    $scope.SubmitForm = function () {
        // ValidateForm();
        var today = new Date();
        $scope.session.submitDate = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
        alert($scope.session.submitDate);
//        alert("In SubmitForm");
    }


    $(document).ready(function () {

        PopulateSessionCodes();             // for the Session Code Autocomplete feature

        PopulateSemesterDropdown();         // calculates the semester options for the user

        $scope.rateTypes = [                // Populate the Rate Type dropdown

	        {rateCode: "STD", rateName: "Standard" },
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

        $scope.session = {
            acadTerm    :           "",
            sessionCode:            "",
            owningSchool:           "",     // from Shib
            owningDepartment:       "",     // from Shib
            userContact:            "",     // from Shib
            userEmail:              "",     // from Shib
            userPhone:              "",      // from Shib
            firstDayOfClass:        "",
            lastDayToAddDrop:       "",
            lastDayOfClass:         "",
            lastDayEnrollChange:    "",
            lastDayToWithdraw:      "",
            firstDayOfFinals:       "",
            firstDayForFinalGrades: "",
            lastDayForFinalGrades:  "",
            isClassHeldAtUpc:       false,
            uscCampusLocation:      "",
            otherCampusLocation:    "",
            rateType:               "",
            tuitionUnitRate:        0,
            tuitionFlatRate:        0,
            flatRateUnitsMin:       0,
            flatRateUnitsMax:       0,
            submitDate:             "",
            sessionBreaks:          [],
            sections: []
        };

    }); // document.ready()

}]);    // sessionModule()