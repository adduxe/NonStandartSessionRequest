adminModule.controller("rnrQueueCtrl",

    ["$scope", "$filter", "Submissions", "WriteToSis", "EmailResult", "RateTable", "RateDescription", "GetCampusName", "CampusLocations", "SessionCodes", "GetSessionName",

        function ($scope, $filter, Submissions, WriteToSis, EmailResult, RateTable, RateDescription, GetCampusName, CampusLocations, SessionCodes, GetSessionName) {

            RateTable.query(
                function (data) {
                    $scope.rates = data;
                }
            );

            SessionCodes.get(
                function (data) {       // lookup table to get the Session Name
                    $scope.sessCodes = data.sessionCodes;
                }
            );

            CampusLocations.query(
                function (data) {
                    $scope.campusLocations = data;
                }
            );

            $scope.dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        Submissions.query(function (data) {
                            $scope.submissions = data;
                            e.success(
                                data.map(
                                    function (subm) {
                                        return {
                                            requestId           : subm.requestId,
                                            submissionId        : subm.submissionId,
                                            academicTerm        : subm.session.academicTerm,
                                            sessionCode         : subm.session.sessionCode,
                                            sessionName         : GetSessionName(subm.session.sessionCode, $scope.sessCodes),
                                            userEmail           : subm.session.userEmail,
                                            userPhone           : subm.session.userPhone,
                                            isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                            uscCampusLocation   : GetCampusName(subm.session.uscCampusLocation, $scope.campusLocations),
                                            otherCampusLocation : subm.session.otherCampusLocation,
                                            lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                            lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                            lastDayForEnrollmentOptionChange:
                                                                $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                            firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                            lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                            firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                            lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                            firstDayForFinalGrading:
                                                                $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                            lastDayForFinalGrading:
                                                                $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                            rateType            : RateDescription(subm.session.rateType, subm.session.academicTerm, $scope.rates),
                                            ratePerUnitAmount   : subm.session.ratePerUnitAmount,
                                            flatRateAmount      : subm.session.flatRateAmount,
                                            flatRateUnitsMin    : subm.session.flatRateUnitsMin,
                                            flatRateUnitsMax    : subm.session.flatRateUnitsMax,
                                            owningSchool        : subm.session.owningSchool,
                                            owningDepartment    : subm.session.owningDepartment,
                                            userContact         : subm.session.userContact,
                                            requestDate         : $filter('date')(subm.session.requestDate, "mediumDate"),
                                            sections            : subm.session.sections,
                                            sessionBreaks       : subm.session.sessionBreaks,
                                            comments            : subm.session.comments,
                                            faoAction           : subm.faoAction,
                                            faoActionDate       : $filter('date')(subm.faoActionDate, "mediumDate"),
                                            faoActionReason     : subm.faoActionReason,
                                            rnrAction           : subm.rnrAction,
                                            rnrActionDate       : $filter('date')(subm.rnrActionDate, "mediumDate"),
                                            rnrActionReason     : subm.rnrActionReason,
                                            burAction           : subm.burAction,
                                            burActionDate       : $filter('date')(subm.burActionDate, "mediumDate"),
                                            burActionReason     : subm.burActionReason
                                        };
                                    }));
                                    $scope.spinningWheel.center().close();
                            },
                            function (error) {

                                alert("Cannot load submissions. " + error.data.message);
                                $scope.spinningWheel.center().close();

                            });
                        }   // read: function()
                    },      // transport {
                    schema: {
                    model: {
                        fields: {
                            sessionCode: { type: "string" },
                            sessionName: { type: "string" },
                            owningSchool: { type: "string" },
                            userContact: { type: "string" },
                            requestDate: { type: "string" }
                        }
                    }
                },
                pageSize: 10
            });


            $scope.mainGridOptions =
                {
                    dataSource: $scope.dataSource,
                    sortable: true,
                    pageable: true,
                    columns: [
                            { field: "requestId",       title: "Request",       width: "7.5%" },
                            { field: "academicTerm",    title: "Term",          width: "7.5%" },
                            { field: "sessionCode",     title: "Session",       width: "7.5%" },
                            { field: "sessionName",     title: "Session Name",  width: "15%" },
                            { field: "owningSchool",    title: "School",        width: "15%" },
                            { field: "owningDepartment",title: "Department",    width: "15%" },
                            { field: "requestDate",     title: "Date",          width: "10%" },
                            // Approve/Reject buttons
                            { template: "<button ng-click='approveRequest(#= data.submissionId #)'>Approve</button>" },
                            { template: "<button ng-click='openRejectPopup(#= data.submissionId #)'>Reject</button>" }
                    ],
                    editable: "popup"
                };

            $scope.sectionGridOptions = function (dataItem) {

                return {
                    dataSource: {
                        data: dataItem.sections,
                        pageSize: 5
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
                        { field: "sectionNumber",       title: "Section",       width: "10%" },
                        { field: "prefix",              title: "Prefix",        width: "10%" },
                        { field: "title",               title: "Section Title", width: "15%" },
                        { field: "courseNumber",        title: "Course #",      width: "10%" },
                        { field: "unitValue",           title: "Units",         width: "10%" },
                        { field: "estimatedEnrollment", title: "Class size",    width: "10%" },
                        { field: "instructorName",      title: "Instructor",    width: "15%" },
                        { field: "incomeAmountNumber",  title: "Acct. no.",     width: "10%" }
                    ]
                };
            }   // sectionGridOptions()


            $scope.scheduleGridOptions = function (dataItem) {
                return {
                    dataSource: {
                        data: dataItem.schedules,
                        pageSize: 5,
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
                        { field: "classDayOfWeek",  title: "Class Day",     width: "100px" },
                        { field: "classStartTime",  title: "Start Time",    width: "150px" },
                        { field: "classEndTime",    title: "End Time",      width: "150px" }
                    ]
                };
            };

        $scope.specialFeeGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.specialFees
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "feeCode", title: "Fee Code", width: "100px" },
                    { field: "amount", title: "Amount", width: "100px" },
                    { field: "assessedTo", title: "Assessed To", width: "100px" }
                ]
            };
        };

        $scope.sessionBrkGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.sessionBreaks,
                    pageSize: 5,
                    schema: {
                        model: {
                            fields: {
                                startDate: { type: "date" },
                                endDate: { type: "date" }
                            }
                        }
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "startDate",   title: "Start Date",    format: "{0:MMM dd, yyyy}" },
                    { field: "endDate",     title: "End Date",      format: "{0:MMM dd, yyyy}" }
                ]
            };
        };  // $scope.sessionBrkGridOptions

            $scope.rejectSess = {};

            $scope.openRejectPopup = function (submID) {
                $scope.submID = submID;
                $scope.rejectWindow.center().open();
                $scope.selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];
                return;
            }

            function convDateToString(givenDate) {

                var dateString = "";

                if (givenDate) {
                    var newDate = new Date(givenDate);
                    dateString = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
                }
                return dateString;
            }   // convDateToString()

            $scope.approveRequest = function (submID) {

                $scope.submID = submID;
                $scope.selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];

                // Get the Session Breaks
                var session = $scope.selectedSess.session;
                var sessDates = {"Sess1Start": 0, "Sess1End": 1, "Sess2Start": 2, "Sess2End": 3};
                var sessBreaks = ["", "", "", ""];

                switch (session.sessionBreaks.length) {

                    case 2:      // if there are two session breaks, it will fall through case 1
                        sessBreaks[sessDates.Sess2Start]    = session.sessionBreaks[1].startDate;
                        sessBreaks[sessDates.Sess2End]      = session.sessionBreaks[1].endDate;

                    case 1:     // if there is only one break, it will only get the first one
                        sessBreaks[sessDates.Sess1Start]    = session.sessionBreaks[0].startDate;
                        sessBreaks[sessDates.Sess1End]      = session.sessionBreaks[0].endDate;
                        break;

                    default:
                        break;
                }   // end of switch()

                var sisDatesPacket = {
                    academicTerm            : session.academicTerm,
                    sessionCode             : session.sessionCode,
                    firstDayOfClass         : convDateToString(session.firstDayOfClass),
                    lastDayOfClass          : convDateToString(session.lastDayOfClass),
                    firstDayOfFinals        : convDateToString(session.firstDayOfFinals),
                    lastDayOfFinals         : convDateToString(session.lastDayOfFinals),
                    lastDayForAddDrop       : convDateToString(session.lastDayForAddDrop),
                    lastDayForWithdrawal    : convDateToString(session.lastDayForWithdrawal),
                    lastDayForEnrollmentOptionChange: convDateToString(session.lastDayForEnrollmentOptionChange),
                    firstDayForFinalGrading : convDateToString(session.firstDayForFinalGrading),
                    lastDayForFinalGrading  : convDateToString(session.lastDayForFinalGrading),
                    sessionBreak1BeginDate  : convDateToString(sessBreaks[sessDates.Sess1Start]),
                    sessionBreak1EndDate    : convDateToString(sessBreaks[sessDates.Sess1End]),
                    sessionBreak2BeginDate  : convDateToString(sessBreaks[sessDates.Sess2Start]),
                    sessionBreak2EndDate    : convDateToString(sessBreaks[sessDates.Sess2End])
                };

                $scope.spinningWheel.center().open();
                WriteToSis.save(sisDatesPacket,

                    function () {       // success
                        $scope.updateRequest('A', 'Approved');
                        alert("Session Request Approved!");
                        $scope.spinningWheel.center().close();
                    },
                    function () {      // fail
                        alert("Failed to write the approved session " + sisDatesPacket.academicTerm + "-" + sisDatesPacket.sessionCode +" because it already exists in SIS.");
                        $scope.spinningWheel.center().close();
                    }
                );

                return;
            }   // approveRequest()


            $scope.updateRequest = function (actionCode, rejectReason) {

                if (!rejectReason) {
                    alert("Please provide a reason for rejecting the request.");
                    return;
                }

                var todaysDate = new Date();

                var status = {
                    submissionId    : $scope.submID,
                    faoAction       : $scope.selectedSess.faoAction,
                    faoActionDate   : $scope.selectedSess.faoActionDate,
                    faoActionReason : $scope.selectedSess.faoActionReason,
                    rnrAction       : actionCode,
                    rnrActionDate   : todaysDate.toDateString(),
                    rnrActionReason: rejectReason,
                    burAction       :   $scope.rejectSess.burAction,
                    burActionDate   :   todaysDate.toDateString(),
                    burActionReason :   $scope.rejectSess.burActionReason
                };

                $scope.spinningWheel.center().open();

                Submissions.update({ submissionId: $scope.submID }, status)                 // update the request's status

                    .$promise.then(function () {

                        EmailResultAndUpdateList(actionCode);

                    }, function(errMsg) {

                        alert("Update failed: " + errMsg);

                    });
        
            }   // $scope.updateRequest()


            function EmailResultAndUpdateList(codeAction) {

                $scope.spinningWheel.center().close();

                switch (codeAction) {

                    case "A":
                        EmailResult.save({ id: $scope.submID });                           // Send Request Approval Email
                        alert("Approval email sent");
                        break;

                    case "R":
                        EmailResult.save({ id: $scope.submID });                           // Send Rejection Email
                        alert("Rejection email sent");
                        break;

                    default:
                        break;
                }   // switch()

                // remove the submission from the list
                for (var i = 0; i < $scope.dataSource._data.length; ++i) {

                    if ($scope.dataSource._data[i].submissionId == $scope.submID) {
                        $scope.dataSource._data.splice(i, 1);
                        break;
                    }
                }   // for (var i...

                if (actionCode == 'R') {
                    $scope.rejectWindow.close();
                }

                return;
            }   // EmailResultAndUpdateList()

        $scope.assessDecode = function (aCode) {

            var assessTo = "";

            switch (aCode) {
                case 'G':
                    assessTo = "Graduate";
                    break;
                case 'U':
                    assessTo = "Undergraduate";
                    break;
                case 'B':
                    assessTo = "All";
                    break;
            }
            return assessTo;
        }

        $(document).ready(function () {
            $scope.spinningWheel.center().open();
            $scope.rates = RateTable.query();
        })

    }]);