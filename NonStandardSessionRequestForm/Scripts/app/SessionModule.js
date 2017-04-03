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
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    }
]);