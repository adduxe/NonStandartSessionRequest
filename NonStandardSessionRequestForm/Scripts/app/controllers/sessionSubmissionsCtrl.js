sessionModule.controller("sessionSubmissionsCtrl", ["$scope", function ($scope) {

    $scope.clickedHere = function (messg) {
//        alert(messg);
        $scope.session = messg;
    }

    $scope.showSchedule = function (sID) {
        alert(sID);
        $scope.secID = sID;
    }

    $scope.sessions =
        [{
            requestID: 001,
            acadTerm: "20171",
            sessionCode: "866",
            sessionName: "PHAR - MPTX",
            owningSchool: "School of Pharmacy",
            owningDept: "Preparatory",
            userUSCID: "1234567890",
            userContact: "Dr. Kana Biss",
            userEmail: "kbiss@usc.edu",
            userPhone: "(213) 821-5988",
            requestDate: "01/04/2017",
            sections: [
                {
                    sectionID: 500,
                    sectionNumber: "22919",
                    sectionPrefix: "PHAR",
                    sectionTitle: "Second Year Advanced Pharmacy",
                    courseNumber: "010",
                    unitValue: 8.0,
                    instructorName: "Dr. Jeckyl N. Hide",
                    classSchedule: [
                        { schedID: 100, classDay: "Tuesday", classStartTime: "02:00pm", classEndTime: "5:00pm" },
                        { schedID: 101, classDay: "Thursday", classStartTime: "05:00pm", classEndTime: "5:00pm" },
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
                        { schedID: 123, classDay: "Monday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { schedID: 124, classDay: "Wednesday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { schedID: 125, classDay: "Friday", classStartTime: "08:00am", classEndTime: "10:00am" }
                    ]   // end of classSchedules
                }]

        },  // end of 1 Session
        {
            requestID: 002,
            acadTerm: "20181",
            sessionCode: "037",
            sessionName: "CINEMA - Television",
            owningSchool: "School of Cinematic Arts",
            owningDept: "Broadcasting",
            userContact: "Bob Tube",
            userUSCID: "0987654321",
            userEmail: "btube@usc.edu",
            userPhone: "(213) 821-6688",
            requestDate: "01/03/2017",
            sections: [{
                sectionID: 700,
                sectionNumber: "17842D",
                sectionPrefix: "CNTV",
                sectionTitle: "The Television Industry:Networks, Cable, and the Internet",
                courseNumber: "522",
                unitValue: 9.0,
                instructorName: "Tony Etz",
                classSchedule: [
                    { schedID: 200, classDay: "Friday", classStartTime: "07:00pm", classEndTime: "10:00pm" }
                ]       // end of classSchedules
            }]
        }];

    //$scope.mainGridOptions = {

    //    dataSource: {
    //        data: $scope.submissions,
    //        pageSize: 5,
    //        serverPaging: true,
    //        serverSorting: true
    //    },
    //    sortable: true,
    //    pageable: true,
    //    //dataBound: function () {
    //    //    this.expandRow(this.tbody.find("tr.k-master-row").first());
    //    //},
    //    columns: [{
    //        field: "sessionCode",
    //        title: "Session",
    //        width: "100px"
    //    }, {
    //        field: "sessionName",
    //        title: "Session Name",
    //        width: "180px"
    //    }, {
    //        field: "owningSchool",
    //        title: "Requesting School",
    //        width: "180px"
    //    }, {
    //        field: "userContact",
    //        title: "Requested by",
    //        width: "120px"
    //    }, {
    //        field: "requestDate",
    //        title: "Requesting Date",
    //    }]
    //};

    //$scope.sectionGridOptions = function (dataItem) {
    //    return {
    //        dataSource: {
    //            data: dataItem.sections,
    //            pageSize: 5,
    //        },
    //        scrollable: false,
    //        sortable: true,
    //        pageable: true,
    //        columns: [
    //            { field: "sectionNumber", title: "Section", width: "40px" },
    //            { field: "sectionTitle", title: "Section Title", width: "160px" },
    //            { field: "unitValue", title: "Units", width: "60px" },
    //            { field: "instructorName", title: "Instructor Name", width: "80px" },
    //            {   field: "classSchedule",
    //                title: "Class Schedule",
    //                width: "240px",
    //                template: "<table border='1'>" +
    //                            "<tr>" +
    //                                "<td>#: data.sectionPrefix #</td>" +
    //                           "</tr>" +
    //                        "</table>"
    //            }
    //        ]
    //    };
    //};

    //$scope.scheduleGridOptions = function (dataItem) {
    //    return {
    //        dataSource: {
    //            data: dataItem.classSchedule,
    //            pageSize: 5,
    //        },
    //        scrollable: false,
    //        sortable: true,
    //        pageable: true,
    //        columns: [
    //            { field: "classDay", title: "Class Day", width: "100px" },
    //            { field: "classStartTime", title: "Start Time", width: "150px" },
    //            { field: "classEndTime", title: "End Time", width: "150px" }
    //        ]
    //    };
    //};

}]);