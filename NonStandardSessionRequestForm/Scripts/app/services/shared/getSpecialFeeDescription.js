'use strict';

function GetFeeDescription(fCode, feeCodes) {

    var feeDesc = '', burEntry = '', burCode = '';

    for (var i = 0; i < feeCodes.length; ++i) {

        burEntry = feeCodes[i];
        burCode = burEntry.substring(0, burEntry.indexOf(' '));
        
        if (burCode === fCode) {
            feeDesc = burEntry.substring(burCode.length, burEntry.length);
        }
    }

    return feeDesc;
}

adminModule.factory('GetSpecialFeeDescription',
    [
        "GetSpecialFeeCodes", function (GetSpecialFeeCodes) {
            return {
                getFeeDesc:
                    function (fee_code) {
                        return GetFeeDescription(fee_code, GetSpecialFeeCodes);
                    }
            }
        }
    ]
);

sessionModule.factory('GetSpecialFeeDescription',
    [
        "GetSpecialFeeCodes", function (GetSpecialFeeCodes) {
            "GetSpecialFeeCodes", function (GetSpecialFeeCodes) {
                return {
                    getFeeDesc:
                        function (fee_code) {
                            return GetFeeDescription(fee_code, GetSpecialFeeCodes);
                        }
                }
            }
        }
    ]
);