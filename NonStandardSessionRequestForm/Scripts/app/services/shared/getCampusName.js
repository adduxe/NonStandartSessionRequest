'use strict';

function getCampusLocation(cCode, cLocations) {

    var campusLocation = "";

    for (var i = 0; i < cLocations.length; ++i) {
        if (cLocations[i].campusCode == cCode) {
            campusLocation = cLocations[i].campusName;
            break;
        }
    }
    return campusLocation;
}

sessionModule.factory('GetCampusName',
    [
        "CampusLocations", function(CampusLocations){

            return function (campusCode) {
                var campusName = getCampusLocation(campusCode, CampusLocations);
                return campusName;
            }
        }
    ]
);

adminModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations) {

            return function (campusCode) {
                var campusName = getCampusLocation(campusCode, CampusLocations);
                return campusName;
            }
        }
    ]
);
