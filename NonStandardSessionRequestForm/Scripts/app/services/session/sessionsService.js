'use strict';

sessionModule.factory('Sessions', ['$resource', function ($resource) {

    return $resource(
        'api/sessionrequests/:requestId', { requestId: '@id' }
        );
    }
])