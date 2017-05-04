sessionModule.controller("sessionReviewCtrl", ["$scope", "$filter", "Submissions", "RateTable",

    function ($scope, $filter, Submissions, RateTable) {
    
        $scope.mainGridOptions =
            {
                dataSource: {
                    transport: {
                        read: function (e) {
                            Submissions.query(function (data) {
                                e.success(
                                    data.map(
                                        function (subm) {
                                            return {
                                                academicTerm: subm.session.academicTerm,
                                                sessionCode: subm.session.sessionCode,
                                                sessionName: subm.session.sessionName,
                                                userEmail: subm.session.userEmail,
                                                userPhone: subm.session.userPhone,
                                                uscCampusLocation: subm.session.uscCampusLocation,
                                                lastDayForAddDrop: $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                                lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                                lastDayForEnrollmentOptionChange: $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                                firstDayOfClass: $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                                lastDayOfClass: $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                                firstDayOfFinals: $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                                lastDayOfFinals: $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                                firstDayForFinalGrading: $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                                lastDayForFinalGrading: $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                                rateType: subm.session.rateType,
                                                ratePerUnitAmount: subm.session.ratePerUnitAmount,
                                                rateFlatAmount: subm.session.rateFlatAmount,
                                                flatRateUnitsMin: subm.session.flatRateUnitsMin,
                                                flatRateUnitsMax: subm.session.flatRateUnitsMax,
                                                owningSchool: subm.session.owningSchool,
                                                userContact: subm.session.userContact,
                                                requestDate: $filter('date')(subm.session.requestDate, "mediumDate"),
                                                sections: subm.session.sections,
                                                sessionBreaks: subm.session.sessionBreaks,
                                                comments: subm.session.comments                        
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
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true
                },
                sortable: true,
                pageable: true,
                columns: [
                    { field: "academicTerm", title: "Term", width: "7.5%" },
                    { field: "sessionCode", title: "Session", width: "7.5%" },
                    { field: "sessionName", title: "Session Name", width: "15%" },
                    { field: "owningSchool", title: "School", width: "15%" },
                    { field: "owningDepartment", title: "Department", width: "15%" },
                    { field: "requestDate", title: "Request Date", width: "15%" },
                    {
                        command: [
                            { text: "Approve" },
                            { text: "Reject" },
                            //{ text: "Reject", click: showPopup }
                        ]
                    }
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
    };



        //    });

        //$scope.notifOptions = {
        //    templates: [{
        //        type: "ngTemplate",
        //        template: $("#rejectPopup").html()
        //    }]
        //};

        //function showPopup() {
        //    $scope.notif.show({kValue: "Sonny"}, "ngTemplate");
        //};

        //    // Configure the pop-up window for the details
        //function showDetails(e) {
        //    e.preventDefault();
        //    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        //    wnd.content(detailsTemplate(dataItem));
        //    wnd.center().open();
        //}

        //var detailsTemplate = kendo.template($("#template").html());

        //var wnd = $("#details").kendoWindow({
        //    title: "Reason for Rejection",
        //    modal: true,
        //    visible: false,
        //    resizable: true,
        //    width: "15%"
        //}).data("kendoWindow");
}]);