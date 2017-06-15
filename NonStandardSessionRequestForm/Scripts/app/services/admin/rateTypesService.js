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