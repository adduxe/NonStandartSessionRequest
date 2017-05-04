'use strict';

sessionModule.factory('Submissions', ['$resource', function ($resource) {

    return $resource(
        "api/submissions/:department", { department: '@id' }
    );
}])