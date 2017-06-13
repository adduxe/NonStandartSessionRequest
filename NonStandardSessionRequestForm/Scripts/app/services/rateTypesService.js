'use strict';

sessionModule.factory('RateTypes', ['RateTable', '$resource', '$scope', function (RateTable, $resource, $scope) {

    function selectTermRateType() {

        $scope.rates = RateTable.query();

        var termRateType = $scope.rates.find(function (rate) {
            return rate.term == $scope.session.academicTerm;
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

    var rateTypes = selectTermRateType;

    var rateTypes = [                    // Rate type lookup table

        { rateCode: "STD",  rateName: "Standard (session 001)" },
        { rateCode: "GBUS", rateName: "Graduate Business" },
        { rateCode: "GCINA",rateName: "Graduate Cinematic Arts" },
        { rateCode: "GENGR",rateName: "Graduate Engineering" },
        { rateCode: "MRED", rateName: "Master of Real Estate Development" },
        { rateCode: "PHAR", rateName: "Pharmacy" },
        { rateCode: "DENT", rateName: "Dentistry" },
        { rateCode: "DH",   rateName: "Dental Hygiene" },
        { rateCode: "ADVDE",rateName: "Advanced Dentistry" },
        { rateCode: "LAW",  rateName: "Law" },
        { rateCode: "MED",  rateName: "Medicine" },
        { rateCode: "OTH",  rateName: "Other" }
    ];

    return rateTypes;

}])