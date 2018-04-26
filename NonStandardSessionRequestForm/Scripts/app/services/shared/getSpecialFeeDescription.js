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
        function () {
            return function (fee_code, codeList) {
                return GetFeeDescription(fee_code, codeList);
            }
        }
    ]
);

sessionModule.factory('GetSpecialFeeDescription',
    [
        function () {
            return function (fee_code, codeList) {
                return GetFeeDescription(fee_code, codeList);
            }
        }
    ]
);