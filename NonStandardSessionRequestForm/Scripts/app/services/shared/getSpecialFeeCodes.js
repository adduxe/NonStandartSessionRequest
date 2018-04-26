'use strict';

adminModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes/:term", {term: '@id'});

}]);

sessionModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes/:term", { term: '@id'});

}]);
