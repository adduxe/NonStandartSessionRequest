adminModule.controller("burQueueCtrl",

    ["$scope", "$filter", "Submissions", "RateTable", "RateDescription", "GetCampusName", "CampusLocations", "SessionCodes", "GetSessionName",

        function ($scope, $filter, Submissions, RateTable, RateDescription, GetCampusName, CampusLocations, SessionCodes, GetSessionName) {
        
            RateTable.query(
                function (data){
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
                                                sessionName: GetSessionName(subm.session.sessionCode, $scope.sessCodes),
                                                userEmail           : subm.session.userEmail,
                                                userPhone           : subm.session.userPhone,
                                                isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                                uscCampusLocation: GetCampusName(subm.session.uscCampusLocation, $scope.campusLocations),
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
                                                burActionReason     : (subm.burAction == null) ? "1. Review" : subm.burActionReason
                                            };
                                        }));
                                        $scope.spinningWheel.center().close();

                            }, function (error) {
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
                                owningSchool:{ type: "string" },
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
                    { field: "burActionReason", title: "Status",        width: "12.5%"  },
                    { field: "requestId",       title: "Request",       width: "7.5%"   },
                    { field: "academicTerm",    title: "Term",          width: "7.5%"   },
                    { field: "sessionCode",     title: "Session",       width: "7.5%"   },
                    { field: "sessionName",     title: "Session Name",  width: "15%"    },
                    { field: "owningSchool",    title: "School",        width: "20%"    },
                    { field: "owningDepartment",title: "Department",    width: "15%"    },
                    { field: "requestDate",     title: "Date",          width: "10%"    },
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
            };  // sectionGridOptions

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
            };  // scheduleGridOptions


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
    };  // specialFeeGridOptions

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
                    { field: "startDate",   title: "Start Date",format: "{0:MMM dd, yyyy}" },
                    { field: "endDate",     title: "End Date",  format: "{0:MMM dd, yyyy}" }
                ]
            };
    };  // sessionBrkGridOptions

            $scope.ChangeBurStatus = function (submID, burStatus)
            {
                var selectedSess = $filter('filter')($scope.submissions, { "submissionId": submID }, true)[0];

                if (selectedSess != null) {

                    $scope.rejectSess = selectedSess;
                    $scope.rejectSess.rnrActionReason = "";

                    var todaysDate = new Date();
                    var burStatusText = null;

                    switch (burStatus) {

                        case "":
                            burStatusText = "1. Review";
                            break;

                        case "I":
                            burStatusText = "2. Issue";
                            break;
                
                        case "C":
                            burStatusText = "3. Complete";
                            break;

                        default:
                            burStatusText = "";
                            break;
                    }

                    var status = {
                        submissionId    : submID,
                        faoAction       : $scope.rejectSess.faoAction,
                        faoActionDate   : $scope.rejectSess.faoActionDate,
                        faoActionReason : $scope.rejectSess.faoActionReason,
                        rnrAction       : $scope.rejectSess.rnrAction,
                        rnrActionDate   : $scope.rejectSess.rnrActionDate,
                        rnrActionReason : $scope.rejectSess.rnrActionReason,
                        burAction       : burStatus,
                        burActionDate   : todaysDate.toDateString(),
                        burActionReason : burStatusText
                    };

                    $scope.spinningWheel.center().open();

                    Submissions.update({ submissionId: submID }, status)     // update the request's status
                        .$promise.then(function () {

                            // remove the submission from the list
                            for (var i = 0; i < $scope.dataSource._data.length; ++i) {
                                if ($scope.dataSource._data[i].submissionId == submID) {
                                    $scope.dataSource._data[i].burActionReason = burStatusText;
                                    break;
                                }
                            }   // for (var i...

                            $scope.spinningWheel.center().close();
                        }), function () {
                            alert("Failed in updating the Bursar status for Request ID: " + $scope.rejectSess.requestId);
                            $scope.spinningWheel.center().close();
                        }; // promise.fail()
                }

                return;
            }   // Submissions.ChangeBurStatus()


            $(document).ready(function () {
                $scope.spinningWheel.center().open();
            });

}]);