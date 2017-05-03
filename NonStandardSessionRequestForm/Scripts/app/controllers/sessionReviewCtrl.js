sessionModule.controller("sessionReviewCtrl", ["$scope", "Submissions", "RateTable",

    function ($scope, Submissions, RateTable) {
    
    $scope.submissions = [];

    Submissions.query(function (data) {

        $scope.submissions = data;
        $scope.sessions =
            data.map(
                function (subm) {
                    return {
                        sessionCode: subm.session.sessionCode,
                        sessionName: subm.session.sessionName,
                        owningSchool: subm.session.owningSchool,
                        userContact: subm.session.userContact,
                        requestDate: subm.session.requestDate
                    };
                });

        $scope.mainGridOptions =
            {
                dataSource: {
                    type: "jsonp",
                    data: $scope.sessions,
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
                    { field: "academicTerm", title: "Semester", width: "10%" },
                    { field: "sessionCode", title: "Session", width: "10%" },
                    { field: "sessionName", title: "Session Name", width: "20%" },
                    { field: "owningSchool", title: "School", width: "20%" },
                    { field: "owningDepartment", title: "Department", width: "10%" },
                    { field: "requestDate", title: "Request Date", width: "20%" },
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

    });

    $scope.submissions =
        [{
            requestId: 001,
            academicTerm: "20171",
            sessionCode: "866",
            sessionName: "PHAR - MPTX",
            owningSchool: "School of Pharmacy",
            owningDepartment: "Preparatory",
            userContact: "Dr. Kana Biss",
            userEmail: "kbiss@usc.edu",
            userPhone: "(213) 821-5988",
            firstDayOfClass: "01/15/2017",
            lastDayOfClass: "03/26/2017",
            lastDayForAddDrop: "01/30/2017",
            lastDayForWithdrawal: "02/13/2017",
            lastDayForEnrollmentOptionChange: "03/15/2017",
            firstDayOfFinals: "03/10/2017",
            lastDayOfFinals: "03/12/2017",
            firstDayForFinalGrading: "03/11/2017",
            lastDayForFinalGrading: "03/16/2017",
            isClassHeldAtUpc: false,
            uscCampusLocation: "Catalina",
            otherCampusLocation: "",
            rateType: "Advanced Dentistry",
            ratePerUnitAmount: 1666,
            rateFlatAmount: 24650,
            flatRateUnitsMin: 10,
            flatRateUnitsMax: 20,
            requestDate: "01/04/2017",
            isApprovedByFAO: true,
            dateApprovedFAO: "01/05/2017",
            isApprovedByRNR: false,
            dateApprovedRNR: "01/06/2017",
            rejectReasonFAO: "",
            rejectReasonRNR: "Incorrect rates",
            dateSentRejectEmailFAO: "",
            dateSentRejectEmailRNR: "01/06/2017",
            sessionBreaks: [
                { startDate: "02/15/2017", endDate: "02/20/2017" }
            ],
            sections: [
                {
                    sectionID: 500,
                    sectionNumber: "22919",
                    prefix: "PHAR",
                    title: "Second Year Advanced Pharmacy",
                    courseNumber: "010",
                    unitValue: 8.0,
                    instructorName: "Dr. Jeckyl N. Hide",
                    estimatedEnrollment: 50,
                    comments: "Section Comment",
                    incomeAccountNumber: 46587897,
                    schedules: [
                        { scheduleID: 100, classDayOfWeek: "Tuesday", classStartTime: "02:00pm", classEndTime: "5:00pm" },
                        { scheduleID: 101, classDayOfWeek: "Thursday", classStartTime: "05:00pm", classEndTime: "5:00pm" },
                    ]  // end of classSchedules
                }, {
                    sectionID: 600,
                    sectionNumber: "01892",
                    sectionPrefix: "PHAR",
                    sectionTitle: "Sophomore Pharmacy",
                    courseNumber: "010",
                    unitValue: 7.0,
                    instructorName: "Dr. Z. Vago",
                    classSchedule: [
                        { scheduleID: 123, classDayOfWeek: "Monday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { scheduleID: 124, classDayOfWeek: "Wednesday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { scheduleID: 125, classDayOfWeek: "Friday", classStartTime: "08:00am", classEndTime: "10:00am" }
                    ]   // end of classSchedules
                }
            ]
        }];
//        },  // end of 1 Session
        //       {
        //            requestID: 002,
        //            acadTerm: "20181",
        //            sessionCode: "037",
        //            sessionName: "CINEMA - Television",
        //            owningSchool: "School of Cinematic Arts",
        //            owningDept: "Broadcasting",
        //            userContact: "Bob Tube",
        //            userUSCID: "0987654321",
        //            userEmail: "btube@usc.edu",
        //            userPhone: "(213) 821-6688",
        //            dateClassFirstDay: "01/05/2017",
        //            dateClassLastDay: "04/26/2017",
        //            dateAddDropLastDay: "01/26/2017",
        //            dateWithdrawLastDay: "02/17/2017",
        //            dateEnrOptChangeLastDay: "04/03/2017",
        //            dateFinalsFirstDay: "03/10/2017",
        //            dateFinalsLastDay: "03/12/2017",
        //            dateFinalGradeFirstDay: "03/11/2017",
        //            dateFinalGradeLastDay: "03/16/2017",
        //            isClassHeldAtUPC: false,
        //            upcCampusLoc: "Others",
        //            otherCampusLoc: "CBS Studio",
        //            dateSessBreakStart1: "02/17/2017",
        //            dateSessBreakEnd1: "02/21/2017",
        //            dateSessBreakStart2: "",
        //            dateSessBreakEnd2: "",
        //            rateType: "Others",
        //            ratePerUnit: 1777,
        //            rateFlatAmount: 24650,
        //            rateFlatRangeMin: 10,
        //            rateFlatRangeMax: 20,
        //            requestDate: "01/03/2017",
        //            isApprovedByFAO: true,
        //            dateApprovedFAO: "01/05/2017",
        //            isApprovedByRNR: false,
        //            dateApprovedRNR: "01/06/2017",
        //            rejectReasonFAO: "",
        //            rejectReasonRNR: "Incorrect rates",
        //            dateSentRejectEmailFAO: "",
        //            dateSentRejectEmailRNR: "01/06/2017",
        //            sections: [{
        //                sectionID: 700,
        //                sectionNumber: "17842D",
        //                sectionPrefix: "CNTV",
        //                sectionTitle: "The Television Industry:Networks, Cable, and the Internet",
        //                courseNumber: "522",
        //                unitValue: 9.0,
        //                instructorName: "Tony Etz",
        //                classSchedule: [
        //                    { schedID: 200, classDay: "Friday", classStartTime: "07:00pm", classEndTime: "10:00pm" }
        //                ]       // end of classSchedules
        //            }]
        //        ;

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
        },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "startDate", title: "Start Date" },
                    { field: "endDate", title: "End Date" }
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