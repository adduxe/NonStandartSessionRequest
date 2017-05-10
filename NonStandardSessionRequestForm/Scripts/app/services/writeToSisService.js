'use strict';

sessionModule.factory('WriteToSis', ['$resource', function ($resource) {

    return $resource(
        "api/rnrswebsess", null, null
    );
}])