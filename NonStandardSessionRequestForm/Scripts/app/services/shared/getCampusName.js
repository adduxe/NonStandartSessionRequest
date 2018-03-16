'use strict';

function GetCampusName(cCode, cLocations) {

    var campusName = "";

    for (var i = 0; i < cLocations.length; ++i) {
        if (cLocations[i].campusCode == cCode) {
            campusName = cLocations[i].campusName;
            break;
        }
    }
    return campusName;
}

adminModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations){
            return function (campusCode) {
                var campusLocs = CampusLocations.query();
                return GetCampusName(campusCode, campusLocs)
            }
        }
    ]
);

sessionModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations) {
            return function (campusCode) {
                var campusLocs = CampusLocations.query();
                return GetCampusName(campusCode, campusLocs)
            }
        }
    ]
);