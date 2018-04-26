﻿"use strict";
sessionModule.controller("sessionResultCtrl",

    ["Sessions", "GetCampusName", "CampusLocations", "$scope", "$location", "$rootScope",

        function (Sessions, GetCampusName, CampusLocations, $scope, $location, $rootScope) {

        $scope.session = $rootScope.savedSession;
        $scope.rateName = $rootScope.rateName;

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

        }; // switch()

        if (($rootScope.savedSession.ratePerUnitAmount == null) && ($rootScope.savedSession.flatRateAmount == null)) {
            $scope.session.ratePerUnitAmount = "TBA";
            $scope.session.flatRateAmount = "TBA";
        }

        CampusLocations.query(function(campusLocations) {
            $scope.campusDescription = GetCampusName($scope.session.uscCampusLocation, campusLocations);
        });

    }
]);