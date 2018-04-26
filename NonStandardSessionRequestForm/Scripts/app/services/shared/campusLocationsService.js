'use strict';


adminModule.factory('CampusLocations', ['$resource', function ($resource) {

    return $resource('api/usclocations');

}]);

sessionModule.factory('CampusLocations', ['$resource', function ($resource) {

    return $resource('api/usclocations');

}]);