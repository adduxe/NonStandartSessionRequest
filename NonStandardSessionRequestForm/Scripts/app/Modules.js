"use strict";

// FAO, RNR, and BUR Admin pages
var adminModule = angular.module("adminModule", ["ngResource", "kendo.directives"]);

// Session Request and Session Result pages
var sessionModule = angular.module("sessionModule", ["ngResource", "ngRoute", "kendo.directives"]);

sessionModule.config([

    "$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/",
            {
                templateUrl: "scripts/app/views/SessionRequest.html",
                controller: "sessionRequestCtrl"
            })
            .when("/Result",
            {
                templateUrl: "scripts/app/views/SessionResult.html",
                controller: "sessionResultCtrl"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    }
]);