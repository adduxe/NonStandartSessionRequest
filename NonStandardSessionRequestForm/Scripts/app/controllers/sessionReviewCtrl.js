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
        },  // end of 1 Session
        {
            submitID: 002,
            acadTerm: "20181",
            sessionCode: "037",
            sessionName: "CINEMA - Television",
            owningSchool: "School of Cinematic Arts",
            userContact: "Bob Tube",
            requestDate: "01/03/2017",
            sections: [
            ]   // end of sections
        }];

    $scope.sections = [
        {
            submitID: 001,
            sectionNumber: "17842D",
            sectionPrefix: "CNTV",
            sectionTitle: "The Television Industry:Networks, Cable, and the Internet",
            courseNumber: "522",
            unitValue: 9.0,
            instructorName: "Tony Etz",
            classSchedule: [
                { classDay: "Friday", classStartTime: "07:00pm", classEndTime: "10:00pm" }
            ]       // end of classSchedules
        }, {
            submitID: 001,
            sectionNumber: "01892",
            sectionPrefix: "PHAR",
            sectionTitle: "Second Year Advanced Pharmacy",
            courseNumber: "010",
            unitValue: 7.0,
            instructorName: "Dr. Z. Vago",
            classSchedule: [
                { classDay: "Monday", classStartTime: "08:00am", classEndTime: "10:00am" },
                { classDay: "Wednesday", classStartTime: "08:00am", classEndTime: "10:00am" },
                { classDay: "Friday", classStartTime: "08:00am", classEndTime: "10:00am" }
            ]   // end of classSchedules
        }, {
            submitID: 002,
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
        }
    ];   // end of Sections


    $scope.mainGridOptions = {

        dataSource: {
            data: $scope.submissions,
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
        },
        sortable: true,
        pageable: true,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [{
            field: "sessionCode",
            title: "Session",
            width: "60px"
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

    $scope.detailGridOptions = function (dataItem) {
        return {
            dataSource: {
                data: $scope.sections,
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: [{ field: "submitID", operator: "eq", value: dataItem.submitID },
                    ],
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
            { field: "sectionNumber", title: "Section", width: "100px" },
            { field: "sectionTitle", title: "Section Title", width: "210px" },
            { field: "unitValue", title: "Units", width: "50px" },
            { field: "instructorName", title: "Instructor Name", width: "150px" }
            ]
        };
    };

}]);