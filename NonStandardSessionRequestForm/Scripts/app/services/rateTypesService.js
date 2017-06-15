'use strict';

sessionModule.factory('RateTypes', ['RateTable', '$scope', function (RateTable, $scope) {

    function selectTermRateType(term) {

        var rates = RateTable.query();

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
    }

    return function(rateCode, acadTerm){

        var rateDescription = "";
        var rateTypes = selectTermRateType(acadTerm);

        rateTypes.push({
            rateCode: "OTH",
            rateName: "Other"
        });

        for (var i = 0; i < rateTypes.length; ++i) {
            if (rateTypes[i].rateCode == rateCode) {
                rateDescription = $scope.rateTypes[i].rateName;
                break;
            };
        }   // for (var...)

        return rateDescription;
    }   // return function()...


    //var rateTypes = [                    // Rate type lookup table

    //    { rateCode: "STD",  rateName: "Standard (session 001)" },
    //    { rateCode: "GBUS", rateName: "Graduate Business" },
    //    { rateCode: "GCINA",rateName: "Graduate Cinematic Arts" },
    //    { rateCode: "GENGR",rateName: "Graduate Engineering" },
    //    { rateCode: "MRED", rateName: "Master of Real Estate Development" },
    //    { rateCode: "PHAR", rateName: "Pharmacy" },
    //    { rateCode: "DENT", rateName: "Dentistry" },
    //    { rateCode: "DH",   rateName: "Dental Hygiene" },
    //    { rateCode: "ADVDE",rateName: "Advanced Dentistry" },
    //    { rateCode: "LAW",  rateName: "Law" },
    //    { rateCode: "MED",  rateName: "Medicine" },
    //    { rateCode: "OTH",  rateName: "Other" }
    //];

}])