"use strict";
sessionModule.controller("sessionResultCtrl",

    ["Sessions", "$scope", "$location",

    function (Sessions, $scope, $location) {
        
        var reqID = $location.search()["requestId"];        // request ID

        $scope.session = Sessions.get(

            { requestId: reqID },

            function () {       // on-success
                
                var sessBreaks = $scope.session.sessionBreaks;

                switch (sessBreaks.$values.length) {

                    case 2:
                        $scope.session.sessionBreakStart_2  = sessBreaks.$values[1].startDate;
                        $scope.session.sessionBreakEnd_2    = sessBreaks.$values[1].endDate;

                    case 1:
                        $scope.session.sessionBreakStart_1  = sessBreaks.$values[0].startDate;
                        $scope.session.sessionBreakEnd_1    = sessBreaks.$values[0].endDate;
                        break;

                    default:
                        break;
                }
            },

            function () {
                alert("Error in retrieving request no. " + reqID);
                return;
            }
        );
        return;
    }
]);