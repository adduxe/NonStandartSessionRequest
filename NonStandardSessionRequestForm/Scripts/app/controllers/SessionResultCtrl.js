"use strict";
sessionModule.controller("sessionResultCtrl",

        ["Sessions", "$scope", "$location", "$rootScope",

    function (Sessions, $scope, $location, $rootScope) {

        $scope.session = $rootScope.savedSession;
        $scope.rateName = $rootScope.rateName;

        var sessBreaks = $scope.session.sessionBreaks;

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

//        $scope.rateType = $scope.session.rateType;

        return;
    }
]);