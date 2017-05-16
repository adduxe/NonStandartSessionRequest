'use strict';

sessionModule.factory('EmailResult', ['$resource', function ($resource) {

    return $resource(
        "api/email/:decision/:id", {decision: 'Declined' , id: '@id' },null
    );
}])