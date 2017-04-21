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
            .when("/Queue",
            {
                templateUrl: "scripts/app/views/SessionQueue.html",
                controller: "sessionQueueCtrl"
            })
            .when("/Submissions",
            {
                templateUrl: "scripts/app/views/SessionSubmissions.html",
                controller: "sessionSubmissionsCtrl"
            })
            .when("/Review",
            {
                templateUrl: "scripts/app/views/SessionReview.html",
                controller: "sessionReviewCtrl"
            })
            .when("/sessions",
            {
                templateUrl: "scripts/app/views/dummyData/sessions.json"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    }
]);