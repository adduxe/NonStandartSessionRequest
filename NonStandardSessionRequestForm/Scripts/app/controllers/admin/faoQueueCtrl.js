﻿
adminModule.controller("faoQueueCtrl",

    ["$scope", "$filter", "Submissions", "RateTable", "RateDescription", "EmailResult", "CampusLocations", "SessionCodes", "GetSessionName",

        function ($scope, $filter, Submissions, RateTable, RateDescription, EmailResult, CampusLocations, SessionCodes, GetSessionName) {

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
                                            uscCampusLocation   : getCampusLocation(subm.session.uscCampusLocation, $scope.campusLocations),
                                            otherCampusLocation : subm.session.otherCampusLocation,
                                            lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate", "+0"),
                                            lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate", "+0"),
                                            lastDayForEnrollmentOptionChange:
                                                                    $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate", "+0"),
                                            firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate", "+0"),
                                            lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate", "+0"),
                                            firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate", "+0"),
                                            lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate", "+0"),
                                            firstDayForFinalGrading:
                                                                    $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate", "+0"),
                                            lastDayForFinalGrading:
                                                                    $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate", "+0"),
                                            rateType            : RateDescription(subm.session.rateType, subm.session.academicTerm, $scope.rates),
                                            ratePerUnitAmount   : subm.session.ratePerUnitAmount,
                                            flatRateAmount      : subm.session.flatRateAmount,
                                            flatRateUnitsMin    : subm.session.flatRateUnitsMin,
                                            flatRateUnitsMax    : subm.session.flatRateUnitsMax,
                                            gradFlatRateUnitsMin: subm.session.gradFlatRateUnitsMin,
                                            gradFlatRateUnitsMax: subm.session.gradFlatRateUnitsMax,
                                            owningSchool        : subm.session.owningSchool,
                                            owningDepartment    : subm.session.owningDepartment,
                                            userContact         : subm.session.userContact,
                                            requestDate         : $filter('date')(subm.session.requestDate, "mediumDate", "+0"),
                                            sections            : subm.session.sections,
                                            sessionBreaks       : subm.session.sessionBreaks,
                                            specialFees         : subm.session.specialFees,
                                            comments            : subm.session.comments,
                                            faoAction           : subm.faoAction,
                                            faoActionDate       : $filter('date')(subm.faoActionDate, "mediumDate", "+0"),
                                            faoActionReason     : subm.faoActionReason,
                                            rnrAction           : subm.rnrAction,
                                            rnrActionDate       : $filter('date')(subm.rnrActionDate, "mediumDate", "+0"),
                                            rnrActionReason     : subm.rnrActionReason,
                                            burAction           : subm.burAction,
                                            burActionDate       : $filter('date')(subm.burActionDate, "mediumDate", "+0"),
                                            burActionReason     : subm.burActionReason
                                    };
                                    }));
                            $scope.spinningWheel.center().close();
                        }, function (error) {
                            alert("Cannot load submissions. " + error.data.message);
                            $scope.spinningWheel.center().close();
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
                pageSize: 10
            });

            $scope.mainGridOptions = {

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
                        { field: "sectionNumber", title: "Section", width: "10%" },
                        { field: "prefix", title: "Prefix", width: "10%" },
                        { field: "title", title: "Section Title", width: "15%" },
                        { field: "courseNumber", title: "Course #", width: "10%" },
                        { field: "unitValue", title: "Units", width: "10%" },
                        { field: "estimatedEnrollment", title: "Class size", width: "10%" },
                        { field: "instructorName", title: "Instructor", width: "15%" },
                        { field: "incomeAmountNumber", title: "Acct. no.", width: "10%" }
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
                        { field: "startDate", title: "Start Date", format: "{0: MMM dd, yyyy}" },
                        { field: "endDate", title: "End Date", format: "{0: MMM dd, yyyy}" }
                    ]
                };
            };  // $scope.sessionBrkGridOptions

            $scope.rejectSess = {};

            $scope.openRejectPopup = function (submID) {
                $scope.submID = submID;
                $scope.rejectWindow.center().open();
                return;
            }

            $scope.approveRequest = function (submID) {
                $scope.submID = submID;
                $scope.updateRequest('A', 'Approved');
                alert("Session Request Approved!");
                return;
            }

            $scope.EmailUser = function (submID) {
                EmailResult.save({ id: submID });                      // Email requestor upon approval or rejection
                alert("Email sent for Submission ID: " + submID);
                return;
            }

            $scope.updateRequest = function (actionCode, rejectReason) {

                if (!rejectReason) {
                    alert("Please provide a reason for rejecting the request.");
                    return;
                }

                var selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];

                if (selectedSess != null) {
                    $scope.rejectSess = selectedSess;
                }

                var todaysDate = new Date();

                var status = {
                    submissionId: $scope.submID,
                    faoAction: actionCode,
                    faoActionDate: todaysDate.toDateString(),
                    faoActionReason: rejectReason,
                    rnrAction: $scope.rejectSess.rnrAction,
                    rnrActionDate: $scope.rejectSess.rnrActionDate,
                    rnrActionReason: $scope.rejectSess.rnrActionReason,
                    burAction: $scope.rejectSess.burAction,
                    burActionDate: todaysDate.toDateString(),
                    burActionReason: $scope.rejectSess.burActionReason
                };

                $scope.spinningWheel.center().open();

                Submissions.update({ submissionId: $scope.submID }, status)                         // update the request's status
                    .$promise.then(function () {

                        $scope.spinningWheel.center().close();

                        switch (actionCode) {

                            case "A":
                                // EmailResult.save($scope.rejectSess.requestId);                   // Email requestor upon approval
                                break;

                            case "R":
                                EmailResult.save({ id: $scope.submID });                           // Email requestor upon rejection
                                alert("Rejection email sent.");
                                break;

                            default:
                                break;
                        }       // switch()

                        if (actionCode == 'R')
                            $scope.rejectWindow.close();

                        // remove the submission from the list
                        for (var i = 0; i < $scope.dataSource._data.length; ++i) {
                            if ($scope.dataSource._data[i].submissionId == $scope.submID) {
                                $scope.dataSource._data.splice(i, 1);
                                break;
                            }
                        }   // for (var i...
                    }); // promise.then()
            }   // updateRequest()

            $(document).ready(function () {

                $scope.spinningWheel.center().open();

            })   // function ($scope...
        }
    ]
); // adminController...