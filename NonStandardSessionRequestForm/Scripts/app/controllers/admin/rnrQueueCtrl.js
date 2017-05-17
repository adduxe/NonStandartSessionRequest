adminModule.controller("rnrQueueCtrl", ["$scope", "$filter", "Submissions", "WriteToSis", "EmailResult",

    function ($scope, $filter, Submissions, WriteToSis, EmailResult) {

        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    Submissions.query(function (data) {
                        $scope.submissions = data;
                        e.success(
                            data.map(
                                function (subm) {
                                    return {
                                        submissionId        : subm.submissionId,
                                        requestId           : subm.requestId,
                                        academicTerm        : subm.session.academicTerm,
                                        sessionCode         : subm.session.sessionCode,
                                        sessionName         : subm.session.sessionName,
                                        userEmail           : subm.session.userEmail,
                                        userPhone           : subm.session.userPhone,
                                        uscCampusLocation   : subm.session.uscCampusLocation,
                                        otherCampusLocation : subm.session.otherCampusLocation,
                                        lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                        lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                        lastDayForEnrollmentOptionChange: $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                        firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                        lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                        firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                        lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                        firstDayForFinalGrading: $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                        lastDayForFinalGrading: $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                        rateType: getRateTypeDescription(subm.session.rateType),
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
                                        faoActionDate: $filter('date')(subm.faoActionDate, "mediumDate"),
                                        faoActionReason     : subm.faoActionReason,
                                        rnrAction           : subm.rnrAction,
                                        rnrActionDate: $filter('date')(subm.rnrActionDate, "mediumDate"),
                                        rnrActionReason     : subm.rnrActionReason
                                    };
                                }));
                    }, function (error) {
                        alert("Cannot load submissions. " + error.data.message);
                        //                                e.error(new Error("Cannot load users. " + error.data.message));
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
            pageSize: 5
        });


        $scope.mainGridOptions =
            {
                dataSource: $scope.dataSource,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "requestId", title: "Request", width: "7.5%" },
                    { field: "academicTerm", title: "Term", width: "7.5%" },
                    { field: "sessionCode", title: "Session", width: "7.5%" },
                    { field: "sessionName", title: "Session Name", width: "15%" },
                    { field: "owningSchool", title: "School", width: "15%" },
                    { field: "owningDepartment", title: "Department", width: "15%" },
                    { field: "requestDate", title: "Date", width: "10%" },
                        // Approve/Reject buttons
                    { template: "<button ng-click='approveRequest(#= data.submissionId #)'>Approve</button>" },
                    { template: "<button ng-click='openRejectPopup(#= data.submissionId #)'>Reject</button>" }
                ],
                editable: "popup"
            };


        function getRateTypeDescription(rateTypeCode) {

            var rateTypes =[
                { rateCode: "STD",  rateName: "Standard (session 001)" },
                { rateCode: "GBUS", rateName: "Graduate Business" },
                { rateCode: "GCINA",rateName: "Graduate Cinematic Arts" },
                { rateCode: "GENGR",rateName: "Graduate Engineering" },
                { rateCode: "MRED", rateName: "Master of Real Estate Development"},
                { rateCode: "PHAR", rateName: "Pharmacy" },
                { rateCode: "DENT", rateName: "Dentistry"},
                { rateCode: "DH",   rateName: "Dental Hygiene" },
                { rateCode: "ADVDE",rateName: "Advanced Dentistry"},
                { rateCode: "LAW", rateName: "Law" },
                { rateCode: "MED", rateName: "Medicine" },
                { rateCode: "OTH", rateName: "Others"}
            ];

            var rateDesc = "";

            for (var i = 0; i < rateTypes.length; ++i) {
                if (rateTypes[i].rateCode == rateTypeCode) {
                    rateDesc = rateTypes[i].rateName;
                    break;
                }
            }
            return rateDesc;
        }   // getRateTypeDescription()

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
                    { field: "sectionNumber", title: "Section", width: "50px" },
                    { field: "title", title: "Section Title", width: "200px" },
                    { field: "unitValue", title: "Units", width: "50px" },
                    { field: "instructorName", title: " Name", width: "150px" } //,
                ]
            };
        };

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
                    { field: "classDayOfWeek", title: "Class Day", width: "100px" },
                    { field: "classStartTime", title: "Start Time", width: "150px" },
                    { field: "classEndTime", title: "End Time", width: "150px" }
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
                    { field: "startDate", title: "Start Date", format: "{0:MMM dd, yyyy}" },
                    { field: "endDate", title: "End Date", format: "{0:MMM dd, yyyy}" }
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

            WriteToSis.save(sisDatesPacket,
                function () {
                    $scope.updateRequest('A', 'Approved');
                    alert("Session Request Approved!");
                }, function () {
                    alert("Failed to update SIS. Please retry.");
                }
            );
            return;
        }   // approveRequest()


        $scope.updateRequest = function (actionCode, rejectReason) {

            var todaysDate = new Date();

            var status = {
                submissionId: $scope.submID,
                faoAction: $scope.selectedSess.faoAction,
                faoActionDate: $scope.selectedSess.faoActionDate,
                faoActionReason: $scope.selectedSess.faoActionReason,
                rnrAction: actionCode,
                rnrActionDate: todaysDate.toDateString(),
                rnrActionReason: rejectReason
            };

            Submissions.update({ submissionId: $scope.submID }, status)                 // update the request's status
                .$promise.then(function(){

                    switch (actionCode) {

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
                    }

                    // remove the submission from the list
                    for (var i = 0; i < $scope.dataSource._data.length; ++i) {

                        if ($scope.dataSource._data[i].submissionId == $scope.submID) {
                            $scope.dataSource._data.splice(i, 1);
                            break;
                        }
                    }   // for (var i...

                    if (actionCode == 'R') $scope.rejectWindow.close();
                });
        
            }   // $scope.updateRequest()
    }]);