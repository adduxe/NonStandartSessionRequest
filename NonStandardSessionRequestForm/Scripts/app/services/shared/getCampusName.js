'use strict';

function GetCampusLocation(cCode, cLocations) {

    var campusName = "";

    for (var i = 0; i < cLocations.length; ++i) {
        if (cLocations[i].campusCode == cCode) {
            campusName = cLocations[i].campusName;
            break;
        }
    }
    return campusName;
}

sessionModule.factory('GetCampusName',
    [
        function () {
            return function (campusCode, campusLocs) {
                return GetCampusLocation(campusCode, campusLocs);
            }
        }
    ]
);

adminModule.factory('GetCampusName',
    [
        function () {
            return function (campusCode, campusLocs) {
                return GetCampusLocation(campusCode, campusLocs);
            }
        }
    ]
);
