'use strict';

adminModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}])