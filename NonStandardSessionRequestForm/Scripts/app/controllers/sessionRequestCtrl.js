"use strict";

sessionModule.controller("sessionRequestCtrl",

        ["RateTable", "Sessions", "Get001Dates", "SessionCodes", "CampusLocations", "SemStartDates", "$scope", "$http", "$location", "$rootScope",

    function (RateTable, Sessions, Get001Dates, SessionCodes, CampusLocations, SemStartDates, $scope, $http, $location, $rootScope) {

        $scope.AddSemesterBreaks = function () {                    // Add Semester Break functionality

            var semBreak = { startDate: "", endDate: "" };

            if ($scope.session.sessionBreaks.length == 2) {
                alert("A maximum of 2 semester breaks are allowed per session.");
            } else {
                $scope.session.sessionBreaks.push(semBreak);
            }
            return;
        }   // AddSemesterBreaks()

        Date.dateDiff = function (datepart, fromdate, todate) {     // datepart: 'y', 'm', 'w', 'd', 'h', 'm', 's'
            datepart = datepart.toLowerCase();
            var diff = todate - fromdate;
            var divideBy = {
                w: 604800000,                                       // weeks
                d: 86400000,                                        // days
                h: 3600000,                                         // hours
                m: 60000,                                           // minutes
                s: 1000                                             // seconds
            };

            return Math.floor(diff / divideBy[datepart]);
        }   // Date.dateDiff


        function AdjustDate(newDate)                                // Computes a new date incrementing the day if it falls on a weekend or a holiday.
        {
            var newDtmonthDay = '';

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
                    newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
                }
            }                                                       // keep checking until the computed day is not a weekend nor a holiday
            while ((newDate.getDay() == 0) || (newDate.getDay() == 6) || (holidays.indexOf(newDtmonthDay) > -1));
            return newDate;
        }       // AdjustDate()


        function ComputeDate(startDate, endDate, percentAdd) {      //  1) Calculates computed dates given the:
                                                                    //      a) start date
                                                                    //      b) end date
                                                                    //      c) percentage number of days to be added to the start date
                                                                    //  2) If the new date falls on a weekend, or a holiday:
                                                                    //      - move it to the next school day      
            var totalDays = Date.dateDiff('d', startDate, endDate) + 1;
            var daysToAdd = Math.round(totalDays * (percentAdd / 100));   // days to add based on the percentage (percentAdd) provided
            var initialDate = new Date(startDate);

            initialDate.setDate(startDate.getDate() + daysToAdd - 1);
            var adjustedDate = AdjustDate(initialDate);

            if (adjustedDate > endDate) {                           // if computed new date is beyond the Last Day of classes,
                adjustedDate = endDate;                             //  make it equal to the last day of classes.
            }

            return ((adjustedDate.getMonth() + 1) + '/' + adjustedDate.getDate() + '/' + adjustedDate.getFullYear());
        }   // ComputeDate()


        function convDateToString(givenDate) {

            var dateString = "";

            if (givenDate) {
                var newDate = new Date(givenDate.trim());
                dateString = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
            return dateString;
        }   // convDateToString()


        $scope.ClassDatesChanged = function () {                    // Validate the Class Start and End dates

            $scope.classStartDt = new Date($scope.session.firstDayOfClass);

            if ($scope.session.firstDayOfClass > '') {
                $scope.classEndOptions = { min: $scope.classStartDt };
            }

            $scope.classEndDt = new Date($scope.session.lastDayOfClass);

            if ($scope.session.lastDayOfClass > '') {
                $scope.finalsStartOptions = { min: $scope.classEndDt };
            }

            if (($scope.session.firstDayOfClass > '') && ($scope.session.lastDayOfClass > '')) {    // First Day and Last Day of Class entered?

                if (($scope.sess001Dates.firstDayOfClass > '') && ($scope.sess001Dates.lastDayOfClass > '')) {        // Session 001 dates exists for semester

                    var stdStartDate = new Date($scope.sess001Dates.firstDayOfClass);
                    var stdEndDate = new Date($scope.sess001Dates.lastDayOfClass);
                    // if class start and end dates match Session 001 dates
                    if (($scope.classStartDt.toDateString() == stdStartDate.toDateString()) && ($scope.classEndDt.toDateString() == stdEndDate.toDateString())) {

                        $scope.session.lastDayForAddDrop = $scope.sess001Dates.lastDayForAddDrop;
                        $scope.session.lastDayForEnrollmentOptionChange = $scope.sess001Dates.lastDayForEnrollmentOptionChange;
                        $scope.session.lastDayForWithdrawal = $scope.sess001Dates.lastDayForWithdrawal;
                        $scope.session.firstDayOfFinals = $scope.sess001Dates.firstDayOfFinals;
                        $scope.session.lastDayOfFinals = $scope.sess001Dates.lastDayOfFinals;
                        $scope.FinalsDatesChanged();

                    } else {                                                                        // if the Class start and end dates don't match, compute the dates.
                        ComputeDates($scope.classStartDt, $scope.classEndDt);
                    }
                } else {                                                                            // If there are no 001 dates, compute the dates
                    ComputeDates($scope.classStartDt, $scope.classEndDt);
                }
            }   // if (($scope...
            return null;
        }       // ClassDateChanged()


        function ComputeDates(beginDate, endDate) {

            $scope.session.lastDayForAddDrop = ComputeDate(beginDate, endDate, 20);                 // Last day to Add/Drop (20%)
            $scope.session.lastDayForEnrollmentOptionChange = ComputeDate(beginDate, endDate, 40);  // Last day to Change Enrollment Options (40%)
            $scope.session.lastDayForWithdrawal = ComputeDate(beginDate, endDate, 80);              // Last Day to Withdraw (80%)
            return;
        }   // ComputeDates()


        $scope.FinalsDatesChanged = function () {

            $scope.finalsStartDt = new Date($scope.session.firstDayOfFinals);

            if ($scope.session.firstDayOfFinals > '') {
                $scope.finalsEndOptions = { min: $scope.finalsStartDt };
            }

            $scope.finalsEndDt = new Date($scope.session.lastDayOfFinals);

            if (($scope.session.firstDayOfFinals > '') && ($scope.session.lastDayOfFinals > '')) {

                // Compute Final Grading Period
                // First Day of Grading = First Day of Finals
                $scope.session.firstDayForFinalGrading = ($scope.finalsStartDt.getMonth() + 1) + '/' + $scope.finalsStartDt.getDate() + '/' + $scope.finalsStartDt.getFullYear();

                var initialLastDay = new Date($scope.finalsEndDt);
                var notaSchoolDay = false, newDateStr = "";

                for (var i = 0; i < 4; ++i) {

                    notaSchoolDay = false;

                    do {                                    // keep incrementing the date by a day until a school day is found.

                        initialLastDay.setDate(initialLastDay.getDate() + 1);
                        newDateStr = initialLastDay.getMonth() + 1 + '/' + initialLastDay.getDate() + '/' + initialLastDay.getFullYear();

                        if ((initialLastDay.getDay() == 0) || (initialLastDay.getDay() == 6) || (holidays.indexOf(newDateStr) > -1))
                            notaSchoolDay = true;
                        else
                            notaSchoolDay = false;

                    } while (notaSchoolDay)

                }   // for(var i...)

                var lastDayGradingDt = initialLastDay;
                $scope.session.lastDayForFinalGrading = (lastDayGradingDt.getMonth() + 1) + '/' + lastDayGradingDt.getDate() + '/' + lastDayGradingDt.getFullYear();
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

        $scope.AddSchedule = function (thisSection) {           // Adding a Class Schedule functionality

            var sched = { classDayOfWeek: "", classStartTime: "", classEndTime: "" };

            thisSection.schedules.push(sched);
            return;
        }

        $scope.GetDatesAndRates = function () {

            Get001Dates.get(
                { semester: $scope.session.academicTerm },
                function (data) {

                    if (data.classBeginDate == undefined) {

                        alert("No Session 001 dates found for semester " + $scope.session.academicTerm);

                    } else {

                        $scope.sess001Dates.firstDayOfClass = convDateToString(data.classBeginDate);
                        $scope.sess001Dates.lastDayOfClass = convDateToString(data.classEndDate);
                        $scope.sess001Dates.lastDayForAddDrop = convDateToString(data.lastAddDropDate);
                        $scope.sess001Dates.lastDayForWithdrawal = convDateToString(data.withdrawWithWDate);
                        $scope.sess001Dates.lastDayForEnrollmentOptionChange = convDateToString(data.lastEnrollmentOptionDate);
                        $scope.sess001Dates.sessBreak1Begin = convDateToString(data.break1BeginDate);
                        $scope.sess001Dates.sessBreak1End = convDateToString(data.break1EndDate);
                        $scope.sess001Dates.sessBreak2Begin = convDateToString(data.break2BeginDate);
                        $scope.sess001Dates.sessBreak2End = convDateToString(data.break2EndDate);
                        $scope.sess001Dates.firstDayOfFinals = convDateToString(data.finalExamBeginDate);
                        $scope.sess001Dates.lastDayOfFinals = convDateToString(data.finalExamEndDate);
                    }
                },
                function () {
                    console.log("No Session 001 dates found for semester " + $scope.session.academicTerm);
                    $scope.sess001Dates.firstDayOfClass = "";
                    $scope.sess001Dates.lastDayOfClass = "";
                    $scope.sess001Dates.lastDayForAddDrop = "";
                    $scope.sess001Dates.lastDayForWithdrawal = "";
                    $scope.sess001Dates.lastDayForEnrollmentOptionChange = "";
                    $scope.sess001Dates.firstDayForFinalGrading = "";
                    $scope.sess001Dates.lastDayForFinalGrading = "";
                    $scope.sess001Dates.sessBreak1Begin = "";
                    $scope.sess001Dates.sessBreak1End = "";
                    $scope.sess001Dates.sessBreak2Begin = "";
                    $scope.sess001Dates.sessBreak2End = "";
                    $scope.sess001Dates.firstDayOfFinals = "";
                    $scope.sess001Dates.lastDayOfFinals = "";
                }
            );

            function selectTermRateType(rates, term) {
                var termRateType = rates.find(function (rate) {
                    return rate.term == term;
                })

                if (termRateType != undefined) {
                    return termRateType.rateTypes.map(function (rateType) {
                        return {
                            rateCode: rateType.rateTypeCode,
                            rateName: rateType.rateTypeDesc
                        };
                    });
                } else {
                    return [];
                }
            }   // selectTermRateType            

            $scope.rateTypes = selectTermRateType($scope.rates, $scope.session.academicTerm);

            $scope.rateTypes.push({
                rateCode: "OTH",
                rateName: "Other"
            });

            if ($scope.session.rateType > '')
                $scope.SetRates();

            return;
        }   // GetDatesAndRates()

        $scope.SetRates = function () {                     // setting the value of the Tuition per Unit and Flat Rate fields

            if ($scope.session.rateType == 'ZERO') {

                $scope.session.flatRateUnitsMin = 98;
                $scope.session.flatRateUnitsMax = 99;

                $('#flatUnitsMin').prop('readonly', true);
                $('#flatUnitsMax').prop('readonly', true);

            } else {

                $scope.session.flatRateUnitsMin = '';
                $scope.session.flatRateUnitsMax = '';

                $('#flatUnitsMin').prop('readonly', false);
                $('#flatUnitsMax').prop('readonly', false);
            }

            $scope.session.flatRateAmount = '';
            $scope.session.ratePerUnitAmount = '';

            if ($scope.session.academicTerm > '') {
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

            return;
        }   // SetRates()


        function areCampusLocFieldsOk() {           // Checks the Campus Location Fields

            var campusOK = true;

            switch ($scope.session.isClassHeldAtUpc) {

                case 'true':                        // Class held on campus.  Will not require the other Location fields.
                    break;

                case 'false':                       // Would require at least one of the two other location fields.

                    $scope.requireUSCLoc = false;
                    $scope.requireOtherLoc = false;

                    if ($scope.session.uscCampusLocation == '') {

                        campusOK = false;
                        $scope.requireUSCLoc = true;

                    } else {
                        // if "Other" campus location and Other campus location is blank
                        if (($scope.session.uscCampusLocation == 'OTH') && ($scope.session.otherCampusLocation == "")) {
                            campusOK = false;
                            $scope.requireOtherLoc = true;
                        }
                    }
                    break;

                default:                                    // radio button unselected
                    campusOK = false;
                    break;
            }   // switch()

            return campusOK;

        }   // areCampusLocFieldsOk()


        function areClassDatesOK() {                        // check the Class Start and End Dates

            var classDatesOK = true;
                                                            // Class Start Date should not be earlier than the earliest date
            if ($scope.classStartDt )                                             // Class End Date should not be earlier than the Class Start Date
                                                            // Finals Start Date should not be earlier than Class End Date
                                                            // Finals End Date should not be earlier than the Finals Start Date
            return classDatesOK;
        }   // areClassDatesOK()


        function IsFormValid() {

            var formValid = true;

            if (formValid) {
                formValid = areCampusLocFieldsOk();                     // Check Campus Location Fields
            }


            if (formValid) {
                formValid = areClassDatesOK();
            }

                                                    // Check the rate fields
            if (formValid && ($scope.session.flatRateAmount > '')) {

                if (($scope.session.flatRateUnitsMin == '') || ($scope.session.flatRateUnitsMax == '')) {

                    $scope.requireUnitRange = true;
                    formValid = false;

                } else { // Range is specified but validate the values

                    if ($scope.session.flatRateUnitsMax <= $scope.session.flatRateUnitsMin) {

                        alert("The flat rate maximum units should be more than the minimum units.");
                        $scope.requireUnitRange = true;
                        formValid = false;
                    }
                }
            } // if (formValid...)

            // check Session Breaks
            if (formValid && !$scope.noBreaks) {        // if "No Breaks" checkbox checked, no need to check Session Breaks

                if ($scope.session.sessionBreaks.length == 0) {
                    formValid = false;
                    alert("Either check the No Breaks checkbox or enter Session Breaks");

                } else {                                // if the "No Breaks" checkbox is unchecked 
                                                        // and no Session Breaks were entered: error out
                    for (var i = 0; i < $scope.session.sessionBreaks.length; ++i) {
                        if (($scope.session.sessionBreaks[i].startDate == "") || ($scope.session.sessionBreaks[i].endDate == "")) {
                            formValid = false;
                            alert("Either enter Session Breaks or check the No Breaks checkbox.");
                        }
                    }
                }
            }   // if (formValid)

            return formValid;
        }   // IsFormValid()


        $scope.checkSessBreak = function (i) {

            var sessBeginDate = $scope.session.sessionBreaks[i].startDate;

            if (sessBeginDate > '') {

                var beginDate = new Date(sessBeginDate);

                if (beginDate < earliestDate) {
                    alert("Entered date is from a previous semester.");
                    $scope.session.sessionBreaks[i].startDate = '';
                }
            }

            var sessEndDate = $scope.session.sessionBreaks[i].endDate;

            if (sessEndDate > '') {

                var endDate = new Date(sessEndDate);

                if (endDate < earliestDate) {
                    alert("Entered date is from a previous semester.");
                    $scope.session.sessionBreaks[i].endDate = '';
                }
            }

            if ((sessBeginDate > '') && (sessEndDate > '')) {

                if (endDate < beginDate) {
                    alert("The session end date is earlier than the session begin date.");
                }
            }
        }

        $scope.deleteBreaks = function () {

            if ($scope.noBreaks) {
                $scope.session.sessionBreaks = [];  // delete existing breaks
            }
            return;
        }   // deleteBreaks()


        $scope.BlankOtherLocation = function () {

            if (($scope.session.uscCampusLocation != "OTH") && ($scope.session.otherCampusLocation > "")) {
                $scope.session.otherCampusLocation = "";
            }
            return;
        }


        $scope.SubmitForm = function () {

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

            $rootScope.rateName = '';
            for (var i = 0; i < $scope.rateTypes.length; ++i) {
                if ($scope.rateTypes[i].rateCode == $scope.session.rateType) {
                    $rootScope.rateName = $scope.rateTypes[i].rateName;
                    break;
                };
            }   // for (var...)

            $rootScope.savedSession = new Sessions($scope.session);

            $rootScope.savedSession.$save(null,

                    function () {
                        alert("Submission successful");
                        $location.url("/Result");
                    },

                    function () {
                        alert("Error in submitting the form.");
                    }
                );
            return;
        }   // SubmitForm()

        $scope.rates = [];

        function GetRateTable() {
            $scope.rates = RateTable.query();
            return;
        }   // GetRateTable()


        $scope.CheckRateAmount = function (value, fieldName) {

            if ($scope.session.rateType == 'OTH') {
                if (value < 1) {
                    alert("Please enter an amount greater than 0 in the " + fieldName + " box.");
                }
            }
        }   // CheckRateAmount()

        var holidays = [];                                  // holiday needs to be a global that's why it's outside document.ready()
        var earliestDate = new Date(SemStartDates.sStart);

        $(document).ready(function () {

            $scope.sessionCodes = SessionCodes;             // get the Session Codes for the Autocomplete feature on the Session field.

            $scope.semesters = SemStartDates.sChoices;    // populates the semester dropdown for the user

            $scope.earliestDate = SemStartDates.sStart;      // Ultimate earliest date.  Do not accept any date before this date in any field.

            GetRateTable();                                 // Reads the rate table from the database

            $scope.campusLocs = CampusLocations;
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
                owningSchool: "",         // from Shib
                owningDepartment: "",         // from Shib
                userContact: "",         // from Shib
                userEmail: "",         // from Shib
                userPhone: "",         // from Shib
                firstDayOfClass: "",
                lastDayOfClass: "",
                lastDayForAddDrop: "",
                lastDayForEnrollmentOptionChange: "",
                lastDayForWithdrawal: "",
                firstDayOfFinals: "",
                firstDayForFinalGrading: "",
                lastDayForFinalGrading: "",
                isClassHeldAtUpc: null,
                uscCampusLocation: "",
                otherCampusLocation: "",
                rateType: "",
                ratePerUnitAmount: "",
                flatRateAmount: "",
                flatRateUnitsMin: "",
                flatRateUnitsMax: "",
                comments: "",
                sessionBreaks: [],
                sections: [],
                submitDate: "",
            };

            $scope.sess001Dates = {

                firstDayOfClass: "",
                lastDayOfClass: "",
                lastDayForAddDrop: "",
                lastDayForWithdrawal: "",
                lastDayForEnrollmentOptionChange: "",
                firstDayForFinalGrading: "",
                lastDayForFinalGrading: "",
                sessBreak1Begin: "",
                sessBreak1End: "",
                sessBreak2Begin: "",
                sessBreak2End: ""
            }

            $scope.requireUSCLoc = false;        // field validation flags
            $scope.requireOtherLoc = false;
            $scope.requireUnitRange = false;

        }); // document.ready()

    }]);    // sessionModule()
