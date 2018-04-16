'use strict';

function GetSpecialFeeDescription(fCode, feeCodes) {

    var feeDesc = '', burEntry = '', burCode = '';

    for (var i = 0; i < feeCodes.length; ++i) {

        burEntry = feeCodes[i];
        burCode = burEntry.substring(0, burEntry.indexOf(' '));
        
        if (burCode === fCode) {
            feeDesc = burEntry.substring(burCode.length, burEntry.length)
        }
    }

    return feeDesc;
}

adminModule.factory('GetSpecialFeeDescription',
    [
        "GetSpecialFeeCodes", function (GetSpecialFeeCodes) {
            return function (fee_code) {
                return GetSpecialFeeDescription(fee_code, GetSpecialFeeCodes)
            }
        }
    ]
);

sessionModule.factory('GetSpecialFeeDescription',
    [
        "GetSpecialFeeCodes", function (GetSpecialFeeCodes) {

            return function (fee_code) {
                return GetSpecialFeeDescription(fee_code, GetSpecialFeeCodes)
            }
        }
    ]
);