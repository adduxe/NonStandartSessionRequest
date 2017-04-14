sessionModule.controller("sessionSubmissionsCtrl", ["$scope", function ($scope) {

    $scope.ShowSections = function (sessID) {
        $scope.session = sessID;
    }

    $scope.showSchedule = function (sID) {
        $scope.secID = sID;
    }

    $scope.sessions =
        [{
            requestID: 001,
            acadTerm: "20171",
            sessionCode: "866",
            sessionName: "PHAR - MPTX",
            revisionNum: 2,
            owningSchool: "School of Pharmacy",
            owningDept: "Preparatory",
            userUSCID: "1234567890",
            userContact: "Dr. Kana Biss",
            userEmail: "kbiss@usc.edu",
            userPhone: "(213) 821-5988",
            dateClassFirstDay: "01/15/2017",
            dateClassLastDay: "03/26/2017",
            dateAddDropLastDay: "01/30/2017",
            dateWithdrawLastDay: "02/13/2017",
            dateGradeChangeLastDay: "03/15/2017",
            dateFinalsFirstDay: "03/10/2017",
            dateFinalsLastDay: "03/12/2017",
            dateFinalGradeFirstDay: "03/11/2017",
            dateFinalGradeLastDay: "03/16/2017",
            isClassHeldAtUPC: false,
            upcCampusLoc: "Catalina",
            otherCampusLoc: "",
            dateSessBreakStart1: "02/15/2017",
            dateSessBreakEnd1: "02/20/2017",
            dateSessBreakStart2: "",
            dateSessBreakEnd2: "",
            rateType: "Advanced Dentistry",
            ratePerUnit: 1666,
            rateFlatAmount: 24650,
            rateFlatRangeMin: 10,
            rateFlatRangeMax: 20,
            requestDate: "01/04/2017",
            isApprovedByFAO: true,
            dateApprovedFAO: "01/05/2017",
            isApprovedByRNR: false,
            dateApprovedRNR: "01/06/2017",
            rejectReasonFAO: "",
            rejectReasonRNR: "Incorrect rates",
            dateSentRejectEmailFAO: "",
            dateSentRejectEmailRNR: "01/06/2017",
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
            dateClassFirstDay: "01/05/2017",
            dateClassLastDay: "04/26/2017",
            dateAddDropLastDay: "01/26/2017",
            dateWithdrawLastDay: "02/17/2017",
            dateEnrOptChangeLastDay: "04/03/2017",
            dateFinalsFirstDay: "03/10/2017",
            dateFinalsLastDay: "03/12/2017",
            dateFinalGradeFirstDay: "03/11/2017",
            dateFinalGradeLastDay: "03/16/2017",
            isClassHeldAtUPC: false,
            upcCampusLoc: "Others",
            otherCampusLoc: "CBS Studio",
            dateSessBreakStart1: "02/17/2017",
            dateSessBreakEnd1: "02/21/2017",
            dateSessBreakStart2: "",
            dateSessBreakEnd2: "",
            rateType: "Others",
            ratePerUnit: 1777,
            rateFlatAmount: 24650,
            rateFlatRangeMin: 10,
            rateFlatRangeMax: 20,
            requestDate: "01/03/2017",
            isApprovedByFAO: true,
            dateApprovedFAO: "01/05/2017",
            isApprovedByRNR: false,
            dateApprovedRNR: "01/06/2017",
            rejectReasonFAO: "",
            rejectReasonRNR: "Incorrect rates",
            dateSentRejectEmailFAO: "",
            dateSentRejectEmailRNR: "01/06/2017",
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

}]);