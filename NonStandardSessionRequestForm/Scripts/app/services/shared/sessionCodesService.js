'use strict';

sessionModule.factory('SessionCodes',
    [
        '$resource',
        function ($resource) {
            return $resource('api/sessioncodes');
        }
    ]
);

adminModule.factory('SessionCodes',
    [
        '$resource',
        function ($resource) {
            return $resource('api/sessioncodes');
        }
    ]
);
