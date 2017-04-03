"use strict";
sessionModule.controller("sessionQueueCtrl", ["$scope", function ($scope) {

    var sessions =
    '[{' +
        '"sessionCode" : "006",' +
        '"sessionName" : "DENT First Year",' +
        '"requestingSchool" : "Dentistry",' + 
        '"requestingDept" : "Preparatory",' +
        '"requestedBy": "Dr. Pliers Anesthesia Who",' +
        '"requestDate": "January 10, 2017"' +
    '},{' +
        '"sessionCode": "007",' +
        '"sessionName": "DENT - Dental Hygiene First Year",' +
        '"requestingSchool": "Dentistry",' +
        '"requestingDept": "Dental Hygiene",' +
        '"requestedBy": "Dr. Scrub With Wires",' +
        '"requestDate": "January 15, 2017"' +
    '}]';

    $scope.sessionRequests = JSON.parse(sessions);

    $scope.sessionGrid = {

        //dataSource: {
        //    type: "odata",
        //    transport: {
        //        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
        //    },
        //},

        dataSource: {

            data: $scope.sessionRequests,
            schema: {
                model: {
                    fields: {
                        sessionCode: { type: "string" },
                        sessionName: { type: "string" },
                        requestingSchool: { type: "string" },
                        requestedBy: { type: "string" },
                        requestDate: {type: "string"}
                    } // fields

                }   // model
            },  // schema
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
            { field: "sessionCode", title: "Session", width: 15 },
            { field: "sessionName", title: "Session Name", width: 40 },
            { field: "requestingSchool", title: "School", width: 20 },
            { field: "requestedBy", title: "Requested By", width: 40 },
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