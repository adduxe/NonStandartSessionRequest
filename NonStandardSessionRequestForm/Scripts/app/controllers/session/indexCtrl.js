"use strict";
sessionModule.controller("indexCtrl", ["$scope", "$q", function ($scope, $q) {
    var init = function () {
        $scope.notifyOptions = {
            autoHideAfter: 7000,
            templates: [{
                type: "error",
                template: $("#errorTemplate").html()
            },
            {
                type: "info",
                template: $("#infoTemplate").html()
            },
            {
                type: "warning",
                template: $("#warningTemplate").html()
            },
            {
                type: "success",
                template: $("#successTemplate").html()
            }
            ]
        };


        $scope.showNotification = function(type, message) {
            $scope.winNotification.show({
                    title: type.charAt(0).toUpperCase() + type.slice(1),
                    message: message
                },
                type);
        };

    };

    init();
}]);