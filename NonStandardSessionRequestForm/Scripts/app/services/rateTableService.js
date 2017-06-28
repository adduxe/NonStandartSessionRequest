'use strict';

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}]);

adminModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}])