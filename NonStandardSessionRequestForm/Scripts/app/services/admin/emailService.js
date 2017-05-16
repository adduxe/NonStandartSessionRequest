'use strict';

adminModule.factory('EmailResult', ['$resource', function ($resource) {

    return $resource(
        "api/email/:requestId", { requestId: '@id' }
    );
}])