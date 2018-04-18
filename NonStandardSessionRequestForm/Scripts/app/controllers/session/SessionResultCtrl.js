"use strict";
sessionModule.controller("sessionResultCtrl",

    ["Sessions", "GetCampusName", "$scope", "$location", "$rootScope", "GetSpecialFeeDescription", "GetSpecialFeeCodes",

        function (Sessions, GetCampusName, $scope, $location, $rootScope, GetSpecialFeeDescription, GetSpecialFeeCodes) {

            $scope.session = $rootScope.savedSession;
            $scope.rateName = $rootScope.rateName;      // instead of looking up the code on this side,
                                                        // it was decoded before it was submitted.

            var sessBreaks = $scope.session.sessionBreaks;

            switch (sessBreaks.length) {

                case 2:
                    $scope.session.sessionBreakStart_2 = sessBreaks[1].startDate;
                    $scope.session.sessionBreakEnd_2 = sessBreaks[1].endDate;

                case 1:
                    $scope.session.sessionBreakStart_1 = sessBreaks[0].startDate;
                    $scope.session.sessionBreakEnd_1 = sessBreaks[0].endDate;
                    break;

                default:
                    $scope.session.sessionBreakStart_2 = "";
                    $scope.session.sessionBreakEnd_2 = "";
                    break;

            } // switch()

            if (($rootScope.savedSession.ratePerUnitAmount == null) && ($rootScope.savedSession.flatRateAmount == null)) {
                $scope.session.ratePerUnitAmount = "TBA";
                $scope.session.flatRateAmount = "TBA";
            }

            $scope.campusName = GetCampusName($scope.session.uscCampusLocation);

            GetSpecialFeeCodes.query(function (data) {
                $scope.SpecialFeeList = data;
            });

            $scope.getFeeDescription = function (feeCode) {
                return GetSpecialFeeDescription(feeCode, $scope.SpecialFeeList);
            }
        }
]);