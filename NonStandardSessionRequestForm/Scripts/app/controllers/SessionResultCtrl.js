"use strict";
sessionModule.controller("sessionResultCtrl", ["RateTable", "Sessions", "$scope", "$location",

    function (RateTable, Sessions, $scope, $location) {
        
        var reqID = $location.search()["requestId"];        // submission ID

        $scope.session = Sessions.get({ requestId: reqID });

    }

]);