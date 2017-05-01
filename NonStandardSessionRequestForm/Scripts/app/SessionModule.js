"use strict";
var sessionModule = angular.module("sessionModule", ["ngResource", "ngRoute", "kendo.directives"]);

sessionModule.config([
    "$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/",
            {
                templateUrl: "scripts/app/views/SessionRequest.html",
                controller: "sessionRequestCtrl"
            })
            .when("/Review",
            {
                templateUrl: "scripts/app/views/SessionReview.html",
                controller: "sessionReviewCtrl"
            })
            .when("/Result",
            {
                templateUrl: "scripts/app/views/SubmissionResult.html",
                controller: "sessionResultCtrl"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    }
]);