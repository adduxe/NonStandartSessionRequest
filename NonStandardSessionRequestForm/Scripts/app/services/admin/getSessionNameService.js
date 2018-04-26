function GetSessName(sCode, sCodes) {

    var sessionName = '';

    for (var i = 0; i < sCodes.length; ++i) {
        if (sCodes[i].sessionCode == sCode) {
            sessionName = sCodes[i].sessionDesc;
            break;
        }
    }

    return sessionName;
}   // GetSessionName()

adminModule.factory('GetSessionName',
    [
        function () {
            return function (sessCode, sessCodes) {
                return GetSessName(sessCode, sessCodes);
            }
        }
    ]
);