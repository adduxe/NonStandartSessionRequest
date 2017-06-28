'use strict';

function GetCampusLocations(){

    var campusLocations = [ // Populate the Campus Location dropdown.

            { campusCode: "HSC", campusName: "Health Science Campus" },
            { campusCode: "OCC", campusName: "Orange County Campus" },
            { campusCode: "OVS", campusName: "Overseas" },
            { campusCode: "DC", campusName: "Washington D.C." },
            { campusCode: "SAC", campusName: "Sacramento" },
            { campusCode: "USA", campusName: "Off-campus in U.S." },
            { campusCode: "VIR", campusName: "Virtual(DEN/Online)" },
            { campusCode: "CAT", campusName: "Catalina" },
            { campusCode: "LAC", campusName: "L.A. Center" },
            { campusCode: "SD", campusName: "San Diego" },
            { campusCode: "ATT", campusName: "AT&T Center" },
            { campusCode: "SKB", campusName: "No Tuition or Fees" },
            { campusCode: "OTH", campusName: "Others" }
    ];

    return campusLocations;
}   // GetCampusLocations()


adminModule.factory('CampusLocations', ['$resource', function ($resource) {

    return GetCampusLocations();

}]);

sessionModule.factory('CampusLocations', ['$resource', function ($resource) {

    return GetCampusLocations();

}]);