'use strict';

sessionModule.factory('EmailResult', ['$resource', function ($resource) {

    return $resource(
        "api/email/:dept/:id", { id: '@id' },null
    );
}])