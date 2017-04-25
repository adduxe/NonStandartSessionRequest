'use strict';

sessionModule.factory('Sessions', ['$resource', function ($resource) {

    return $resource(
                window.rootPath + 'api/sessionrequests/5',
//        window.rootPath + 'api/sessionrequests/:uscid',
        null,

        { "update": { method: "PUT" } }
    );

}])