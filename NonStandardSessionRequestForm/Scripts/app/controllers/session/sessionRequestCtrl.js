"use strict";

sessionModule.controller("sessionRequestCtrl",

            ["RateTable", "Sessions", "Get001Dates", "SessionCodes", "CampusLocations", "SemStartDates", "$scope", "$http", "$location", "$rootScope",

    function (RateTable, Sessions, Get001Dates, SessionCodes, CampusLocations, SemStartDates, $scope, $http, $location, $rootScope) {

        $scope.MAXUNITS = 40;

        $scope.AddSemesterBreaks = function () {                                // Add Semester Break functionality

            var semBreak = { startDate: "", endDate: "" };

            if ($scope.session.sessionBreaks.length == 2) {

                alert("A maximum of 2 semester breaks are allowed per session.");

            } else {
                $scope.session.sessionBreaks.push(semBreak);
            }
            return;
        }   // AddSemesterBreaks()

        Date.dateDiff = function (datepart, fromdate, todate) {      // datepart: 'y', 'm', 'w', 'd', 'h', 'm', 's'

            datepart = datepart.toLowerCase();

            var dateDiff = todate - fromdate;

            var divideBy = {
                w: 604800000,   // weeks
                d: 86400000,    // days
                h: 3600000,     // hours
                m: 60000,       // minutes
                s: 1000         // seconds
            };

            return Math.floor(dateDiff / divideBy[datepart]);
        }   // Date.dateDiff


        function AdjustDate(newDate)                                // Computes a new date incrementing the day if it falls on a weekend or a holiday.
        {
            var newDtmonthDay = '';

            var weekDay = {
                Sunday  : 0,
                Monday  : 1,
                Tuesday : 2,
                Wednesday:3,
                Thursday: 4,
                Friday  : 5,
                Saturday: 6
            };

            do {

                switch (newDate.getDay()) {                         // see which week day it falls on

                    case weekDay.Sunday:                            // if the computed day falls on a Sunday
                        newDate.setDate(newDate.getDate() + 1);     // add a day to make it a Monday
                        break;

                    case weekDay.Saturday:                          // Saturday
                        newDate.setDate(newDate.getDate() + 2);     // add 2 days to make it a Monday
                        break;

                    default:
                        break;
                }   // switch()

                newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();

                if (holidays.indexOf(newDtmonthDay) > -1) {         // if the new date falls on a holiday, add a day

                    newDate.setDate(newDate.getDate() +1);

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
            var daysToAdd = Math.round(totalDays * (percentAdd / 100));       // days to add based on the percentage (percentAdd) provided
            var initialDate = new Date(startDate);

            initialDate.setDate(startDate.getDate() + daysToAdd - 1);
            var adjustedDate = AdjustDate(initialDate);

            if (adjustedDate > endDate) {                                   // if computed new date is beyond the Last Day of classes,
                adjustedDate = endDate;                                     //  make it equal to the last day of classes.
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

            if (($scope.session.firstDayOfClass > '') && ($scope.session.lastDayOfClass > '')) {                    // First Day and Last Day of Class entered?

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

                var termHasRates = false;
                var termRateType = [];

                for (var i = 0; i < rates.length; ++i) {
                    if (rates[i].term == term) {
                        termHasRates = true;
                        termRateType = rates[i];
                    }
                }

                if (termHasRates) {
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

            $scope.rateTypes.push(
                { rateCode: "OTHU", rateName: "Other Unit Rate" },
                { rateCode: "OTH", rateName: "Other Flat Rate" }
            );

            if ($scope.session.rateType > ''){
                $scope.SetRates();
            }

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
            $scope.unitRateRequired = false;

            if ($scope.session.academicTerm > '') {

                switch ($scope.session.rateType) {

                    case 'OTH':

                        $scope.unitRateRequired = true;
                        $scope.flatRateRequired = true;

                        $scope.session.flatRateUnitsMin = '';
                        $scope.session.flatRateUnitsMax = '';
                        break;

                    case 'OTHU':

                        $scope.unitRateRequired = true;
                        $scope.flatRateRequired = false;

                        $scope.session.flatRateUnitsMin = 98;
                        $scope.session.flatRateUnitsMax = 99;
                        break;

                    default:

                        $scope.unitRateRequired = false;
                        $scope.flatRateRequired = false;

                        angular.forEach($scope.rates, function (value) {

                            if (value.term == $scope.session.academicTerm) {

                                angular.forEach(value.rateTypes, function (value) {

                                    if (value.rateTypeCode == $scope.session.rateType) {

                                        $scope.session.ratePerUnitAmount = value.rateTypeUnitRate;
                                        $scope.session.flatRateAmount = value.rateTypeFlatRate;

                                        if ((value.rateTypeCode == "ZERO") || (value.rateTypeFlatRate == '')) {

                                            $scope.session.flatRateUnitsMin = 98;
                                            $scope.session.flatRateUnitsMax = 99;

                                        } else {

                                            $scope.session.flatRateUnitsMin = '';
                                            $scope.session.flatRateUnitsMax = '';

                                        }   // if (value.rateType...)
                                    }
                                })  // angular.forEach
                            }   // if (value.term)
                        });
                        break;
                }   // switch()
            }   // if ($scope.session..)
            return;
        }   // SetRates()

        var holidays = [];

        function PopulateSemesterDropdown() {

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
                    { semName: currYear + " Summer", semCode: currYear + "2" },
                    { semName: currYear + " Fall", semCode: currYear + "3" },
                    { semName: nextYear + " Spring", semCode: nextYear + "1" }
                ];

            } else if ((currDate >= summerDate) && (currDate < fallDate)) {  // Display Summer Current Year to Summer Next Year

                semChoices = [
                    { semName: currYear + " Summer", semCode: currYear + "2" },
                    { semName: currYear + " Fall", semCode: currYear + "3" },
                    { semName: nextYear + " Spring", semCode: nextYear + "1" },
                    { semName: nextYear + " Summer", semCode: nextYear + "2" }
                ];

            } else {                                                        // Display Current Fall to Next Year Fall

                semChoices = [
                    { semName: currYear + " Fall", semCode: currYear + "3" },
                    { semName: nextYear + " Spring", semCode: nextYear + "1" },
                    { semName: nextYear + " Summer", semCode: nextYear + "2" },
                    { semName: nextYear + " Fall", semCode: nextYear + "3" }
                ];
            }

            $scope.semesters = semChoices;
        }   // PopulateSemesterDropdown


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


        function areRateFieldsOK()              // Checks the Rate Type, Unit Rate Amount, Flat Rate Amount, and Flat Unit Range Fields
        {
            var rateFieldsOk = true;
            var errMsg = "";

            if (($scope.session.rateType == 'OTH') || ($scope.session.rateType == 'OTHU')){ // If rate type 'Others' is chosen
                                                                                            // Make sure Tuition per  Unit and 
                                                                                            //   Tuition Flat Rate are required                
                if (!(parseInt($scope.session.ratePerUnitAmount) > 0)){
                    errMsg = "The Tuition per Unit must have an amount greater than zero.";
                    rateFieldsOk = false;
                }

                if (rateFieldsOk && ($scope.session.rateType == 'OTH')) {

                    switch (true) {

                        case !(parseInt($scope.session.flatRateAmount) > 0):

                            errMsg = "The Tuition Flat Rate amount must have an amount greater than zero.";
                            rateFieldsOk = false;
                            break;

                        case (parseInt($scope.session.ratePerUnitAmount) >= parseInt($scope.session.flatRateAmount)):

                            errMsg = "The Tuition Flat Rate must be greater than the Tuition per Unit amount.";
                            rateFieldsOk = false;
                            $scope.ratesOK = false;
                            break;

                        default:
                            $scope.ratesOK = true;
                            break;
                    }   // switch()
                }
            }   // if ($scope.session.rateType...)

            if (parseInt($scope.session.flatRateAmount) > 0) {       // Check the Flat Rate Unit Range fields

                switch (true) {

                    case (typeof $scope.session.flatRateUnitsMin === "undefined"):      // value is outside field min/max value
                    case !(parseInt($scope.session.flatRateUnitsMin) > 0):

                        errMsg = "The Flat Rate Range minimum units should between 1 and " + ($scope.MAXUNITS - 1) + ".";
                        $scope.requireUnitRange = true;
                        rateFieldsOk = false;
                        break;

                    case (typeof $scope.session.flatRateUnitsMax === "undefined"):      // value is outside field min/max value
                    case !(parseInt($scope.session.flatRateUnitsMin) > 1):

                        errMsg = "The Flat Rate Range maximum units should between 2 and " + $scope.MAXUNITS + ".";
                        $scope.requireUnitRange = true;
                        rateFieldsOk = false;
                        break;

                    case (parseInt($scope.session.flatRateUnitsMax) <= parseInt($scope.session.flatRateUnitsMin)):

                        errMsg = "The flat rate maximum units should be more than the minimum units.";
                        $scope.requireUnitRange = true;
                        rateFieldsOk = false;
                        break;

                    default:
                        $scope.requireUnitRange = false;
                        break;
                }
            }   // if (rateFieldsOk...)

            if (errMsg > '') {
                alert(errMsg);
            }

            return rateFieldsOk;
        }   // areRateFieldsOK()


        function sessionBreaksOK()                      // check Session Breaks
        {
            var sessBreaksOK = true;
            var errMsg = "";
            $scope.requireBreaks = false;

            if (!$scope.noBreaks) {                     // 1) is "No Breaks" checkbox unchecked?

                if ($scope.session.sessionBreaks.length == 0) {     //  - if no Session Breaks entered, error out
                    errMsg = "Either check the No Breaks checkbox or enter Session Breaks";
                    sessBreaksOK = false;
                    $scope.requireBreaks = true;
                } else {                                            // check for blank entries
                    for (var i = 0; i < $scope.session.sessionBreaks.length; ++i) {
                        if (($scope.session.sessionBreaks[i].startDate == "") || ($scope.session.sessionBreaks[i].endDate == "")) {
                            errMsg = "Either enter Session Breaks or check the No Breaks checkbox.";
                            sessBreaksOK = false;
                            $scope.requireBreaks = true;
                        }
                    }
                }
            }                                           // 2) if "No Breaks" is checked, no need to check Session Breaks

            if (errMsg > '') {
                alert(errMsg);
            }

            return sessBreaksOK;
        }   // sessionBreaksOK()


        function IsFormValid() {

            var formValid = true;

            var reqdFields = [

                $scope.session.academicTerm,        // Semester field
                $scope.sessCode.value(),            // Session code
                $scope.session.firstDayOfClass,     // First day of Classes
                $scope.session.lastDayOfClass,      // Last day of Classes
                $scope.session.firstDayOfFinals,    // First day of Finals
                $scope.session.lastDayOfFinals      // Last day of Finals
            ];

            for (var i = 0; i < reqdFields.length; ++i) {
                if (reqdFields[i].length == 0) {
                    formValid = false; // test
                    break;
                }
            };

            if (formValid) {
                formValid = areCampusLocFieldsOk();                     // Check Campus Location Fields
            }

            if (formValid) {
                formValid = areRateFieldsOK();                          // Check Tuition Rate Fields
            }

            if (formValid) {
                formValid = sessionBreaksOK();                          // Check if the Session Breaks were entered
            }

            return formValid;
        }   // IsFormValid()


        $scope.checkSessBreak = function (i) {

            var sessBeginDate = $scope.session.sessionBreaks[i].startDate;
            var errMsg = '';

            if (sessBeginDate > '') {

                var beginDate = new Date(sessBeginDate);

                if (beginDate < $scope.semStart) {

                    errMsg = "Entered date is from a previous semester.";
                    $scope.session.sessionBreaks[i].startDate = '';

                } else {

                    var sessEndDate = $scope.session.sessionBreaks[i].endDate;
                    var endDate = new Date(sessEndDate);

                    if (beginDate > endDate) {
                        errMsg = "Entered Session Begin Date is later than Session End Date."
                        $scope.session.sessionBreaks[i].endDate = '';
                    }
                }
            }

            if (errMsg > '') {
                alert(errMsg);
            }
            return;

        }   // checkSessBreak()


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
                }

            }   // for (var...)

            $rootScope.savedSession = new Sessions($scope.session);

            $scope.spinningWheel.center().open();
            $rootScope.savedSession.$save(null,

                    function () {       // success
                        alert("Submission successful");
                        $scope.spinningWheel.center().close();
                        $location.url("/Result");
                    },

                    function () {       // fail
                        alert("Error in submitting the form.");
                        $scope.spinningWheel.center().close();
                    }
            );
            return;
        }   // SubmitForm()

        $scope.rates = [];

        function GetRateTable() {
            $scope.rates = RateTable.query();
            return;
        }


        $scope.CheckRateAmount = function (rateAmount, rateName) {

            if ($scope.session.rateType == 'OTH') {
                if (rateAmount < 1) {
                    alert("Please enter an amount greater than 0 in the " + rateName + " box.");
                }
            }

            if (rateAmount < 1) {

                alert("Please enter a " + rateName + " that is greater than 0.");

            } else {

                var flatRate = parseInt($scope.session.flatRateAmount);
                var unitRate = parseInt($scope.session.ratePerUnitAmount);

                if ((flatRate > 0) && (unitRate > 0)) {

                    if (unitRate > flatRate) {

                        alert("The Tuition Unit Rate amount cannot be higher than the Tuition Flat Rate amount.");
                        $scope.ratesOK = false;
                    }
                }
            }

        }   // CheckRateAmount()


        $(document).ready(function () {

            $scope.sessionCodes = SessionCodes;     // get the Session Codes for the Autocomplete feature on the Session field.

            PopulateSemesterDropdown();             // calculates the semester options for the user

            $scope.semStart = SemStartDates.sStart;      // Ultimate start date.  Do not accept any date before this date.

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
            "1/1/2018", "1/15/2018", "2/19/2018", "5/28/2018", "7/4/2018", "9/3/2018", "11/22/2018","11/23/2018", "12/24/2018", "12/25/2018", "12/25/2018", "12/26/2018", "12/27/2018", "12/28/2018", "12/29/2018", "12/30/2017", "12/31/2018",
            "1/1/2019", "1/21/2019", "2/18/2019", "5/27/2019", "7/4/2019", "7/5/2019", "9/2/2019",  "11/28/2019", "11/29/2019", "12/25/2019", "12/26/2019", "12/27/2019", "12/28/2019", "12/29/2019", "12/30/2019", "12/31/2019",
            "1/1/2020", "1/20/2020", "2/17/2020", "5/25/2020", "7/3/2020", "9/7/2020", "11/26/2020","11/27/2020", "12/25/2020", "12/28/2020", "12/29/2020", "12/30/2020", "12/31/2020"
        ];

            $scope.session = {
                academicTerm: "",
                sessionCode: "",
                sessionName: "",
                owningSchool: "",     // from Shib
                owningDepartment: "",     // from Shib
                userContact: "",     // from Shib
                userEmail: "",     // from Shib
                userPhone: "",     // from Shib
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

            // field validation flags
            $scope.requireUSCLoc = false;
            $scope.requireOtherLoc = false;
            $scope.requireUnitRange = false;
            $scope.ratesOK = true;

        }); // document.ready()
    }]);    // sessionModule()