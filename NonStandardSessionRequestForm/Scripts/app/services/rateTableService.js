'use strict';

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        '/api/ratetable', null,
        { "query": { method: "GET" } }
    );

}])