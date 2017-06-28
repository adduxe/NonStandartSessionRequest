'use strict';

adminModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}]);

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}])