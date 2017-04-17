"use strict";
sessionModule.controller("sessionQueueCtrl", ["$scope", function ($scope) {

    var sessions =
        [{
            acadTerm                : "20171",
            sessionCode             : "866",
            sessionName             : "PHAR - MPTX",
            revisionNum             : 2,
            owningSchool            : "School of Pharmacy",
            owningDept              : "Preparatory",
            userUSCID               : "1234567890",
            userContact             : "Dr. Kana Biss",
            userEmail               : "kbiss@usc.edu",
            userPhone               : "(213) 821-5988",
            dateClassFirstDay       : "01/15/2017",
            dateClassLastDay        : "03/26/2017",
            dateAddDropLastDay      : "01/30/2017",
            dateWithdrawLastDay     : "02/13/2017",
            dateGradeChangeLastDay  : "03/15/2017",
            dateFinalsFirstDay      : "03/10/2017",
            dateFinalsLastDay       : "03/12/2017",
            dateFinalGradeFirstDay  : "03/11/2017",
            dateFinalGradeLastDay   : "03/16/2017",
            isClassHeldAtUPC        : false,
            upcCampusLoc            : "Catalina",
            otherCampusLoc          : "",
            dateSessBreakStart1     : "02/15/2017",
            dateSessBreakEnd1       : "02/20/2017",
            dateSessBreakStart2     : "",
            dateSessBreakEnd2       : "",
            rateType                : "Advanced Dentistry",
            ratePerUnit             : 1666,
            rateFlatAmount          : 24650,
            rateFlatRangeMin        : 10,
            rateFlatRangeMax        : 20,
            requestDate             : "01/04/2017",
            isApprovedByFAO         : true,
            dateApprovedFAO         : "01/05/2017",
            isApprovedByRNR         : false,
            dateApprovedRNR         : "01/06/2017",
            rejectReasonFAO         : "",
            rejectReasonRNR         : "Incorrect rates",
            dateSentRejectEmailFAO  : "",
            dateSentRejectEmailRNR  : "01/06/2017",
            sections: [
                {
                    sectionNumber: "01892",
                    sectionPrefix: "DENT",
                    sectionTitle: "Second Year Advanced Dentistry",
                    courseNumber: "010",
                    unitValue: 9.0,
                    instructorName: "Dr. Z. Vago",
                    classSchedule: [
                        { classDay: "Monday",   classStartTime: "08:00am", classEndTime: "10:00am"},
                        { classDay: "Wednesday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { classDay: "Friday",   classStartTime: "08:00am", classEndTime: "10:00am" }
                    ]   // end of classSchedules
                },
                {
                    sectionNumber: "22919",
                    sectionPrefix: "DENT",
                    sectionTitle: "Second Year Advanced Dentistry",
                    courseNumber: "010",
                    unitValue: 8.0,
                    instructorName: "Dr. Jeckyl N. Hide",
                    classSchedule: [
                        { classDay: "Tuesday", classStartTime: "02:00pm", classEndTime: "5:00pm" },
                        { classDay: "Thursday", classStartTime: "05:00pm", classEndTime: "5:00pm" },
                    ]  // end of classSchedules
                }
            ]   // end of Sections
        },  // end of 1 Session
        {
            acadTerm                : "20181",
            sessionCode             : "037",
            sessionName             : "CINEMA - Television",
            revisionNum             : 1,
            owningSchool            : "School of Cinematic Arts",
            owningDept              : "Broadcasting",
            userUSCID               : "0987654321",
            userContact             : "Bob Tube",
            userEmail               : "btube@usc.edu",
            userPhone               : "(213) 821-6688",
            dateClassFirstDay       : "01/05/2017",
            dateClassLastDay        : "04/26/2017",
            dateAddDropLastDay      : "01/26/2017",
            dateWithdrawLastDay     : "02/17/2017",
            dateEnrOptChangeLastDay : "04/03/2017",
            dateFinalsFirstDay      : "03/10/2017",
            dateFinalsLastDay       : "03/12/2017",
            dateFinalGradeFirstDay  : "03/11/2017",
            dateFinalGradeLastDay   : "03/16/2017",
            isClassHeldAtUPC        : false,
            upcCampusLoc            : "Others",
            otherCampusLoc          : "CBS Studio",
            dateSessBreakStart1     : "02/17/2017",
            dateSessBreakEnd1       : "02/21/2017",
            dateSessBreakStart2     : "",
            dateSessBreakEnd2       : "",
            rateType                : "Others",
            ratePerUnit             : 1777,
            rateFlatAmount          : 24650,
            rateFlatRangeMin        : 10,
            rateFlatRangeMax        : 20,
            requestDate             : "01/03/2017",
            isApprovedByFAO         : true,
            dateApprovedFAO         : "01/05/2017",
            isApprovedByRNR         : false,
            dateApprovedRNR         : "01/06/2017",
            rejectReasonFAO         : "",
            rejectReasonRNR         : "Incorrect rates",
            dateSentRejectEmailFAO  : "",
            dateSentRejectEmailRNR  : "01/06/2017",
            sections: [
                {
                    sectionNumber: "17842D",
                    sectionPrefix: "CNTV",
                    sectionTitle: "The Television Industry:Networks, Cable, and the Internet",
                    courseNumber: "522",
                    unitValue: 9.0,
                    instructorName: "Tony Etz",
                    classSchedule: [
                        { classDay: "Friday",   classStartTime: "07:00pm", classEndTime: "10:00pm" }
                    ]       // end of classSchedules
                },
            ]   // end of sections
        }];

    $scope.sessionRequests = sessions;
    $scope.sessionGrid = {

        dataSource: {

            data: $scope.sessionRequests,
            pageSize: 5,
            //    serverPaging: true,
            //    serverSorting: true
        },  // dataSource
        sortable: true,
        pageable: true,
        //dataBound: function() {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        columns: [
            { field: "sessionCode", title: "Session", width: 10 },
            { field: "sessionName", title: "Session Name", width: 30 },
            { field: "owningSchool", title: "School", width: 40 },
            { field: "userContact", title: "Requested By", width: 30 },
            { field: "requestDate", title: "Request Date", width: 30 },
            { command: { text: "Review Request", click: showDetails}, title: "Approval", width: 30 }
        ],
        editable: "popup"
    };

    var wnd = $("#details").kendoWindow({
            title: "Session Request Details",
            modal: true,
            visible: false,
            resizable: false,
            width: 600
    }).data("kendoWindow");

    var detailsTemplate = kendo.template($("#template").html());

    function showDetails(e) {
        e.preventDefault();

        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        wnd.content(detailsTemplate(dataItem));
        wnd.center().open();
    }

}]);