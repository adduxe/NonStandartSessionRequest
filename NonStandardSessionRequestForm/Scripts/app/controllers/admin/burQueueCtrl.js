adminModule.controller("burQueueCtrl", ["$scope", "$filter", "Submissions",

    function ($scope, $filter, Submissions) {
        
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
                                            rateType            : getRateTypeDescription(subm.session.rateType),
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
                                            rnrActionReason     : subm.rnrActionReason
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
                            owningSchool: { type: "string" },
                            userContact: { type: "string" },
                            requestDate: { type: "string" }
                        }
                    }
                },
                pageSize: 5
        });


        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            sortable: true,
            pageable: true,
            columns: [
                { field: "requestId", title: "Request", width: "10%" },
                { field: "academicTerm", title: "Term", width: "10%" },
                { field: "sessionCode", title: "Session", width: "15%" },
                { field: "sessionName", title: "Session Name", width: "20%" },
                { field: "owningSchool", title: "School", width: "20%" },
                { field: "owningDepartment", title: "Department", width: "15%" },
                { field: "requestDate", title: "Date", width: "10%" },
            ],
            editable: "popup"
        };


        function getRateTypeDescription(rateTypeCode) {

                    // Rate type lookup table
            var rateTypes = [
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

    $(document).ready(function () {
        $scope.spinningWheel.center().open();
    });

}]);