'use strict';

sessionModule.factory('Get001Dates', ['$resource', function ($resource) {

    return $resource(
        'api/sessions/:semester/001', { semester: '@id' }
        );
    }
])