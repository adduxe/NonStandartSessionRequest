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
