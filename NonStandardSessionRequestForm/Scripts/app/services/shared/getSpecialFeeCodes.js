'use strict';

adminModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes");

}]);

sessionModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes");

}]);
