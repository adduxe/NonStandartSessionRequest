'use strict';

sessionModule.factory('EmailResult', ['$resource', function ($resource) {

    return $resource(
        "api/email/:requestId", { requestId: '@id' }, null
//        "api/email/", null, null
    );
}])