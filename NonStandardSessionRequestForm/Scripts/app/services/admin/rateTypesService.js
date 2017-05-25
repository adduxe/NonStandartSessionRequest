'use strict';

adminModule.factory('RateTypes', ['$resource', function ($resource) {

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