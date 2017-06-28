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

}])