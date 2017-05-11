"use strict";
sessionModule.controller("sessionRequestCtrl",

    ["RateTable", "Sessions", "Get001Dates", "SessionCodes", "$scope", "$http", "$location",

    function (RateTable, Sessions, Get001Dates, SessionCodes, $scope, $http, $location) {
    
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

        newDate.setDate(startDate.getDate() + daysToAdd - 1);

        do {
            switch (newDate.getDay()) {
                case 0:                                         // if the computed day falls on a Sunday
                    newDate.setDate(newDate.getDate() + 1);     // add a day to make it a Monday
                    break;
                case 6:                                         // Saturday
                    newDate.setDate(newDate.getDate() + 2);     // add 2 days to make it a Monday
                    break;
                default:
                    break;
            }   // switch()

            newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();

            if (holidays.indexOf(newDtmonthDay) > -1) {         // if the new date falls on a holiday, add a day
                newDate.setDate(newDate.getDate() + 1);
                newDtmonthDay = newDate.getMonth() +1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
        }                                                       // keep checking until the computed day is not a weekend nor a holiday
        while ((newDate.getDay() == 0) || (newDate.getDay() == 6) || (holidays.indexOf(newDtmonthDay) > -1));

        if (newDate > endDate) {                                // if computed new date is beyond the Last Day of classes,
            newDate = endDate;                                  //  make it equal to the last day of classes.
        }
            
        return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear());
    }   // ComputeDate()

    function convDateToString(givenDate) {
        var newDate = new Date(givenDate);
        return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear());
    }
            // Validate the Class Start and End dates
    $scope.ClassDatesChanged = function () {

        if (($scope.session.firstDayOfClass > '') && ($scope.session.lastDayOfClass > '')) {

            var startDt = new Date($scope.session.firstDayOfClass);
            var endDt = new Date($scope.session.lastDayOfClass);

            if (startDt > endDt) {

                alert("Class Start Date later than Class End Date");

            } else {        // dates OK.  Calculate computed date fields.

                if (($scope.stdDates.firstDayOfClass > '') && ($scope.stdDates.lastDayOfClass > ''))        // 001 dates exists for semester
                {
                    var stdStartDate = new Date($scope.stdDates.firstDayOfClass);
                    var stdEndDate = new Date($scope.stdDates.lastDayOfClass);

                    if ((startDt.toDateString() == stdStartDate.toDateString()) && (endDt.toDateString() == stdEndDate.toDateString())) {

                        $scope.session.lastDayForAddDrop = $scope.stdDates.lastDayForAddDrop;
                        $scope.session.lastDayForEnrollmentOptionChange = $scope.stdDates.lastDayForEnrollmentOptionChange;
                        $scope.session.lastDayForWithdrawal = $scope.stdDates.lastDayForWithdrawal;

                    } else {            // if the Class start and end dates don't match, compute the dates.
                        ComputeDates(startDt, endDt);
                    }
                } else {        // If there are no 001 dates, compute the dates
                    ComputeDates(startDt, endDt);
                }
            }   // if (startDt...
        }   // if (($scope...
        return;
    }       // ClassDateChanged()


    function ComputeDates(beginDate, endDate) {

        $scope.session.lastDayForAddDrop = ComputeDate(beginDate, endDate, 20);                 // Last day to Add/Drop (20%)
        $scope.session.lastDayForEnrollmentOptionChange = ComputeDate(beginDate, endDate, 40);  // Last day to Change Enrollment Options (40%)
        $scope.session.lastDayForWithdrawal = ComputeDate(beginDate, endDate, 80);              // Last Day to Withdraw (80%)
        return;
    }   // ComputeDates()


    $scope.FinalsDatesChanged = function () {

        if (($scope.session.firstDayOfFinals > '') && ($scope.session.lastDayOfFinals > '')) {

            var startDt = new Date($scope.session.firstDayOfFinals);
            var endDt = new Date($scope.session.lastDayOfFinals);

                // Compute Final Grading Period
            if (startDt > endDt) {
                alert("First day of Finals later than Last Day of Finals");
            } else {
                    // First Day of Grading = First Day of Finals
                $scope.session.firstDayForFinalGrading = (startDt.getMonth() + 1) + '/' + startDt.getDate() + '/' + startDt.getFullYear();
                var lastDayGradingDt = new Date();
                lastDayGradingDt.setDate(endDt.getDate() + 4);      // Last Day for Grading = Last Day of Finals + 4 days
                $scope.session.lastDayForFinalGrading = (lastDayGradingDt.getMonth() + 1) + '/' + lastDayGradingDt.getDate() + '/' + lastDayGradingDt.getFullYear();
            }
        }   // if (($scope...
    }   // FinalsDatesChanged()

        // Add a Section functionality
    $scope.AddSection = function () {

        var section = {
            sectionNumber: "",
            prefix: "",
            title: "",
            courseNumber: "",
            unitValue: 0,
            instructorName: "",
            estimatedEnrollment: 0,
            incomeAccountNumber: "",
            comments: "",
            schedules: []
        };

        $scope.session.sections.push(section);
        return;
    }

        // Add a Class Schedule functionality
    $scope.AddSchedule = function (thisSection) {
        var sched = { classDayOfWeek: "", classStartTime: "", classEndTime: "" };
        thisSection.schedules.push(sched);
        return;
    }


    $scope.SetRates = function () {         // setting the value of the Tuition per Unit and Flat Rate fields

        if ($scope.session.academicTerm > '') {

            $scope.stdDates.firstDayOfClass = "";
            $scope.stdDates.lastDayOfClass = "";
            $scope.stdDates.lastDayForAddDrop = "";
            $scope.stdDates.lastDayForWithdrawal = "";
            $scope.stdDates.lastDayForEnrollmentOptionChange = "";
            $scope.stdDates.firstDayForFinalGrading = "";
            $scope.stdDates.lastDayForFinalGrading = "";

            Get001Dates.get({semester: $scope.session.academicTerm},

                function (data) {

                    if (data.classBeginDate == undefined){
                        alert("data is undefined");
                    } else {
                        $scope.stdDates.firstDayOfClass                     = convDateToString(data.classBeginDate.trim());
                        $scope.stdDates.lastDayOfClass                      = convDateToString(data.classEndDate.trim());
                        $scope.stdDates.lastDayForAddDrop                   = convDateToString(data.lastAddDropDate.trim());
                        $scope.stdDates.lastDayForWithdrawal                = convDateToString(data.withdrawWithWDate.trim());
                        $scope.stdDates.lastDayForEnrollmentOptionChange    = convDateToString(data.lastEnrollmentOptionDate.trim());
                    }
                        //                    $scope.stdDates.firstDayForFinalGrading = data.finalGradeBeginDate.trim();
                    //                    $scope.stdDates.lastDayForFinalGrading = data.finalGradeEndDate.trim();
                },
                function() {
                    console.log("No Session 001 dates found for semester " + $scope.session.academicTerm);
                }
            );

            if ($scope.session.rateType > '') {

                $scope.session.rateFlatAmount = "";
                $scope.session.ratePerUnitAmount = "";

                angular.forEach($scope.rates, function (value) {
                    if (value.term == $scope.session.academicTerm) {
                        angular.forEach(value.rateTypes, function (value) {
                            if (value.rateTypeCode == $scope.session.rateType) {
                                $scope.session.flatRateAmount = value.rateTypeFlatRate;
                                $scope.session.ratePerUnitAmount = value.rateTypeUnitRate;
                        }
                    })
                }
            });
                }
        }
        return;
    }

    var holidays = [];

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

    function IsFormValid() {

        var formValid = true;

        var reqdFields = [
            $scope.session.academicTerm,
            $scope.session.firstDayOfClass,
            $scope.session.lastDayOfClass,
            $scope.session.firstDayOfFinals,
            $scope.session.lastDayOfFinals
        ];

        for (var i = 0; i < reqdFields.length; ++i){
            if(reqdFields[i].length == 0){
                formValid = false; // test
                break;
            }
        };
        return formValid;
    }   // IsFormValid()


    $scope.SubmitForm = function(){

        if (!IsFormValid()) {
            alert("Please provide required fields.");
            return;
        };

        var today = new Date();
        $scope.session.submitDate = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

        var sessionValue = $scope.sessCode.value().trim();
        $scope.session.sessionCode = sessionValue.substring(0, 3);
        $scope.session.sessionName = sessionValue.substring(3);
        $scope.session.sessionName = $scope.session.sessionName.trim();

        var reqID = Sessions
            .save($scope.session)
            .$promise.then(

                function () {

                    //                window.location.href = "successPage.usc.edu";
                    alert("Submission successful");
                    $location.url("/Result?requestId=" + reqID);
                },

                function () {
                    alert("Error in submitting the form.");
                }
            );

        return;
    }

    $scope.rates = [];

    function GetRateTable() {

        $scope.rates = RateTable.query(function () {
            ;       // just load the table
        });
        return;
    }   // GetRateTable()

    $(document).ready(function () {

        $scope.sessionCodes = SessionCodes;     // get the Session Codes for the Autocomplete feature on the Session field.

        PopulateSemesterDropdown();             // calculates the semester options for the user

        GetRateTable();                         // Reads the rate table from the database

        $scope.rateTypes = [                    // Rate type lookup table

            { rateCode: "STD",  rateName: "Standard (session 001)" },
            { rateCode: "GBUS", rateName: "Graduate Business" },
            { rateCode: "GCINA",rateName: "Graduate Cinematic Arts" },
            { rateCode: "GENGR",rateName: "Graduate Engineering" },
            { rateCode: "MRED", rateName: "Master of Real Estate Development" },
            { rateCode: "PHAR", rateName: "Pharmacy" },
            { rateCode: "DENT", rateName: "Dentistry" },
            { rateCode: "DH",   rateName: "Dental Hygiene" },
            { rateCode: "ADVDE",rateName: "Advanced Dentistry" },
            { rateCode: "LAW",  rateName: "Law" },
            { rateCode: "MED",  rateName: "Medicine" },
            { rateCode: "OTH",  rateName: "Others" }
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

            academicTerm: "",
            sessionCode: "",
            sessionName: "",
            owningSchool:           "Engineering",     // from Shib
            owningDepartment:       "Environmental",     // from Shib
            userContact:            "Jessie James",     // from Shib
            userEmail:              "jjames@usc.edu",     // from Shib
            userPhone:              "818.310.5689",     // from Shib
            firstDayOfClass:        "",
            lastDayOfClass:         "",
            lastDayForAddDrop:      "",
            lastDayForEnrollmentOptionChange: "",
            lastDayForWithdrawal:   "",
            firstDayOfFinals:       "",
            firstDayForFinalGrading: "",
            lastDayForFinalGrading: "",
            isClassHeldAtUpc:       false,
            uscCampusLocation:      "",
            otherCampusLocation:    "",
            rateType:               "",
            ratePerUnitAmount:      "",
            flatRateAmount:         "",
            flatRateUnitsMin:       "",
            flatRateUnitsMax:       "",
            comments:               "",
            sessionBreaks:          [],
            sections:               [],
            submitDate:             "",
        };

        $scope.stdDates = {
            firstDayOfClass : "",
            lastDayOfClass : "",
            lastDayForAddDrop : "",
            lastDayForWithdrawal : "",
            lastDayForEnrollmentOptionChange : "",
            firstDayForFinalGrading : "",
            lastDayForFinalGrading : ""
        }

    }); // document.ready()

}]);    // sessionModule()