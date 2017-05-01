"use strict";
sessionModule.controller("sessionResultCtrl", ["RateTable", "Sessions", "$scope", "$location",

    function (RateTable, Sessions, $scope, $location) {
        
        var reqID = $location.search()["requestId"];
        alert(reqID);

        $scope.session = Sessions.get({ requestId: reqID });

    }

]);