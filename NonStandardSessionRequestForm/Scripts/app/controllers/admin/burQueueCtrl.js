adminModule.controller("burQueueCtrl",

    ["$scope", "$filter", "Submissions", "RateTable", "RateDescription", "GetCampusName",

    function ($scope, $filter, Submissions, RateTable, RateDescription, GetCampusName) {
        
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
                                            sessionName         : subm.session.sessionName,
                                            userEmail           : subm.session.userEmail,
                                            userPhone           : subm.session.userPhone,
                                            isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                            uscCampusLocation   : GetCampusName(subm.session.uscCampusLocation),
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
                                            burStatus           : getBurStatus(Math.random() * 10)
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

        function getBurStatus(rNum) {

            var randNum = Math.round(rNum);
            var burStatus = "";

            switch (randNum % 3) {
                case 1:
                    burStatus = "Not reviewed";
                    break;
                case 2:
                    burStatus = "Needs follow-up";
                    break;
                default:
                    burStatus = "Tuition Entered";
                    break;
            }
            return burStatus;
        }

        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            sortable: true,
            pageable: true,
            columns: [
                { field: "burStatus",       title: "Status",        width: "12.5%"  },
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

    $scope.ChangeBurStatus = function (submID)
    {
        var selectedSess = $filter('filter')($scope.submissions, { "submissionId": submID }, true)[0];

        if (selectedSess != null) {
            $scope.rejectSess = selectedSess;
        }

        var todaysDate = new Date();

        var status = {
                submissionId    :   submID,
                faoAction       :   $scope.rejectSess.faoAction,
                faoActionDate   :   $scope.rejectSess.faoActionDate,
                faoActionReason :   $scope.rejectSess.faoActionReason,
                rnrAction       :   $scope.rejectSess.rnrAction,
                rnrActionDate   :   $scope.rejectSess.rnrActionDate,
                rnrActionReason :   $scope.rejectSess.rnrActionReason //,
                //burAction       :   $scope.rejectSess.burAction,
                //burActionDate   :   todaysDate.toDateString(),
                //burActionReason :   $scope.rejectSess.burActionReason
        };

        $scope.spinningWheel.center().open();

        Submissions.update({ submissionId: submID }, status)     // update the request's status
            .$promise.then(function () {
                $scope.spinningWheel.center().close();
            }), function(){
                alert("Failed in updating the Bursar Status for Request ID: " + $scope.rejectSess.requestId);
                $scope.spinningWheel.center().close();
            }; // promise.fail()

        return;
    }   // Submissions.ChangeBurStatus()


    $(document).ready(function () {
        $scope.spinningWheel.center().open();
        $scope.rates = RateTable.query();
    });

}]);