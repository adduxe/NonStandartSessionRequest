'use strict';

sessionModule.factory('PostSession', ['$resource', function ($resource) {

    return $resource(
        window.location.origin + window.location.pathname + "api/sessionrequests", null
    );

}])