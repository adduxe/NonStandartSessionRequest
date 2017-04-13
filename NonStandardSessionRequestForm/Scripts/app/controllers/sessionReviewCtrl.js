sessionModule.controller("sessionReviewCtrl", ["$scope", function ($scope) {

    $scope.submissions =
        [{
            submitID: 001,
            acadTerm: "20171",
            sessionCode: "866",
            sessionName: "PHAR - MPTX",
            owningSchool: "School of Pharmacy",
            userContact: "Dr. Kana Biss",
            requestDate: "01/04/2017",
            sections: [
                {
                    sectionNumber: "22919",
                    sectionPrefix: "PHAR",
                    sectionTitle: "Second Year Advanced Pharmacy",
                    courseNumber: "010",
                    unitValue: 8.0,
                    instructorName: "Dr. Jeckyl N. Hide",
                    classSchedule: [
                        { classDay: "Tuesday", classStartTime: "02:00pm", classEndTime: "5:00pm" },
                        { classDay: "Thursday", classStartTime: "05:00pm", classEndTime: "5:00pm" },
                    ]  // end of classSchedules
                }, {
                    sectionNumber: "01892",
                    sectionPrefix: "PHAR",
                    sectionTitle: "Sophomore Pharmacy",
                    courseNumber: "010",
                    unitValue: 7.0,
                    instructorName: "Dr. Zhe Vago",
                    classSchedule: [
                        { classDay: "Monday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { classDay: "Wednesday", classStartTime: "08:00am", classEndTime: "10:00am" },
                        { classDay: "Friday", classStartTime: "08:00am", classEndTime: "10:00am" }
                    ]   // end of classSchedules
                }]

        },  // end of 1 Session
        {
            submitID: 002,
            acadTerm: "20181",
            sessionCode: "037",
            sessionName: "CINEMA - Television",
            owningSchool: "School of Cinematic Arts",
            userContact: "Bob Tube",
            requestDate: "01/03/2017",
            sections: [{
                sectionNumber: "17842D",
                sectionPrefix: "CNTV",
                sectionTitle: "The Television Industry:Networks, Cable, and the Internet",
                courseNumber: "522",
                unitValue: 9.0,
                instructorName: "Tony Etz",
                classSchedule: [
                    { classDay: "Friday", classStartTime: "07:00pm", classEndTime: "10:00pm" }
                ]       // end of classSchedules
            }]
        }];

    $scope.mainGridOptions = {

        dataSource: {
            data: $scope.submissions,
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
        },
        sortable: true,
        pageable: true,
        //dataBound: function () {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        columns: [{
            field: "sessionCode",
            title: "Session",
            width: "100px"
        }, {
            field: "sessionName",
            title: "Session Name",
            width: "180px"
        }, {
            field: "owningSchool",
            title: "Requesting School",
            width: "180px"
        }, {
            field: "userContact",
            title: "Requested by",
            width: "120px"
        }, {
            field: "requestDate",
            title: "Requesting Date",
        }]
    };

    $scope.sectionGridOptions = function (dataItem) {
        return {
            dataSource: {
                data: dataItem.sections,
                pageSize: 5,
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "sectionNumber", title: "Section", width: "50px" },
                { field: "sectionTitle", title: "Section Title", width: "200px" },
                { field: "unitValue", title: "Units", width: "50px" },
                { field: "instructorName", title: " Name", width: "150px" },
                {
                    field: "classSchedule", title: "Class Schedule", width: "240px"
                    , template: "<div ng-repeat='eachSched in #= classSchedule #'> eachSched.classDay </div>"
                }
            ]
        };
    };


    function scheduleGrid() {
        return "aad;lkfdj";
    }

    $scope.scheduleGridOptions = function (dataItem) {
        return {
            dataSource: {
                data: dataItem.classSchedule,
                pageSize: 5,
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "classDay", title: "Class Day", width: "100px" },
                { field: "classStartTime", title: "Start Time", width: "150px" },
                { field: "classEndTime", title: "End Time", width: "150px" }
            ]
        };
    };

}]);