'use strict';

sessionModule.factory('Submissions', ['$resource', function ($resource) {

    return $resource(
        "api/submissions/:submissionId", { submissionId: '@id' },
        { 'update': { method: 'PUT' } }
    );
}])