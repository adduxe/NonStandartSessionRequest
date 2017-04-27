'use strict';

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        window.location.origin + window.location.pathname + "api/ratetable", null,
        { "query": { method: "GET", isArray: true} }
    );

}])