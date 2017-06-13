"use strict";
sessionModule.controller("sessionResultCtrl",

        ["Sessions", "RateTable", "$scope", "$location", "$rootScope",

    function (Sessions, RateTable, $scope, $location, $rootScope) {

        $scope.session = $rootScope.savedSession;

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

//        var selectTermRateType = function (rates, term) {
//            var termRateType = rates.find(function (rate) {
//                return rate.term == $scope.session.academicTerm;
//            })

//            if (termRateType != undefined) {
//                return termRateType.rateTypes.map(function (rateType) {
//                    return {
//                        rateCode: rateType.rateTypeCode,
//                        rateName: rateType.rateTypeDesc
//                    };
//                });
//            } else {
//                return [];
//            }
//        }   // selectTermRateType()

////        var rateTypes = selectTermRateType($scope.rates, $scope.session.academicTerm);

//        for (var i = 0; i < $scope.rateTypes.length; ++i) {

//            if (rateTypes[i].rateCode == $rootScope.savedSession.rateType) {
//                $scope.rateType = rateTypes[i].rateName;
//                break;
//            };
        //        }   // for (var...)

        $scope.rateType = $scope.session.rateType;

        return;
    }
]);