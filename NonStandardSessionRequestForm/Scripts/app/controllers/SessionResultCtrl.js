"use strict";
sessionModule.controller("sessionResultCtrl",

        ["Sessions", "RateTypes", "$scope", "$location", "$rootScope",

    function (Sessions, RateTypes, $scope, $location, $rootScope) {
        
        var reqID = $location.search()["requestId"];        // request ID

        //$scope.session = Sessions.get(

        //    { requestId: reqID },

            //function () {       // on-success
        
        $scope.session = $rootScope.savedSession;

        var sessBreaks = $scope.session.sessionBreaks;

//                switch (sessBreaks.$values.length) {
                switch (sessBreaks.length) {

                    case 2:
                        $scope.session.sessionBreakStart_2  = sessBreaks[1].startDate;
                        $scope.session.sessionBreakEnd_2    = sessBreaks[1].endDate;

                    case 1:
                        $scope.session.sessionBreakStart_1  = sessBreaks[0].startDate;
                        $scope.session.sessionBreakEnd_1    = sessBreaks[0].endDate;
                        break;

                    default:
                        $scope.session.sessionBreakStart_2 = "";
                        $scope.session.sessionBreakEnd_2 = "";
                        break;
                } // switch()

                
                for (var i = 0; i < RateTypes.length; ++i) {

                    if (RateTypes[i].rateCode == $rootScope.savedSession.rateType) {
                        $scope.rateType = RateTypes[i].rateName;
                        break;
                    };
                }   // for (var...)
            //},

            //function () {
            //    alert("Error in retrieving request no. " + reqID);
            //    return;
            //}
        //);
        return;
    }
]);