"use strict";
sessionModule.controller("sessionRequestCtrl", ["$scope", function ($scope) {

    $(document).ready(function () {

        var acadSems =
            '[' +
                '{"semName":"2017 Spring", "semCode": 20172},' +
                '{"semName":"2017 Summer", "semCode": 20173},' +
                '{"semName":"2018 Fall", "semCode": 20181},' +
                '{"semName":"2018 Spring", "semCode": 20182}' +
            ']';                // only for testing

        $scope.acadTerms = JSON.parse(acadSems);

        $("#sessionCode").kendoDropDownList({
            dataTextField: "semName",
            dataValueField: "semCode",
            dataSource: {
                data: $scope.acadTerms      // just for testing
                //transport: {              // use this for production
                //    read: {
                //        dataType: "jsonp",
                //        url: "https://demos.telerik.com/kendo-ui/service/Products",  // change the link to the web service
                //    }
                //}
            }
        });
    });

}]);