"use strict";
sessionModule.controller("sessionResultCtrl",

    ["Sessions", "$scope", "$location", "$rootScope", "GetSpecialFeeDescription", "GetSpecialFeeCodes", "CampusLocations",

        function (Sessions, $scope, $location, $rootScope, GetSpecialFeeDescription, GetSpecialFeeCodes, CampusLocations) {

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

            if ($scope.session.uscCampusLocation) {
                CampusLocations.query(function (data) {
                    $scope.campusName = getCampusLocation($scope.session.uscCampusLocation, data);
                });
            } else {
                $scope.campusName = "";
            }
            
            GetSpecialFeeCodes.query(function (data) {
                $scope.SpecialFeeList = data;
            });

            $scope.getFeeDescription = function (feeCode) {
                return GetSpecialFeeDescription(feeCode, $scope.SpecialFeeList);
            }

            $scope.assessDecode = function (aCode) {

                var assessTo = "";

                switch (aCode) {
                    case 'G':
                        assessTo = "Graduate";
                        break;
                    case 'U':
                        assessTo = "Undergraduate";
                        break;
                    case 'B':
                        assessTo = "All";
                        break;
                }
                return assessTo;
            }
        }
]);