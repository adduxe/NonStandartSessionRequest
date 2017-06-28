'use strict';

function GetCampusLocations(){

    var campusLocations = [                                   // Populate the Campus Location dropdown.
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
        "CampusLocations", function(CampusLocations){

            return function (campusCode) {
                return GetCampusName(campusCode, CampusLocations)
            }
        }
    ]
);

sessionModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations) {

            return function (campusCode) {
                return GetCampusName(campusCode, CampusLocations)
            }
        }
    ]
);
'use strict';

adminModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}]);

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}])
'use strict';

adminModule.factory('RateDescription', [function () {

    function selectTermRateType(term, rates) {

        var termRateType = rates.find(function (rate) {
            return rate.term == term;
        })

        if (termRateType != undefined) {
            return termRateType.rateTypes.map(function (rateType) {
                return {
                    rateCode: rateType.rateTypeCode,
                    rateName: rateType.rateTypeDesc
                };
            });
        } else {
            return [];
        }
    }   // selectTermRateType            

    return function (rateCode, term, rateTable) {

        var rateTypes = selectTermRateType(term, rateTable);

        rateTypes.push({
            rateCode: "OTH",
            rateName: "Other"
        });

        var rateDesc = "";
        for (var i = 0; i < rateTypes.length; ++i) {
            if (rateTypes[i].rateCode == rateCode) {
                rateDesc = rateTypes[i].rateName;
                break;
            }
        }
        return rateDesc;
    }

}])