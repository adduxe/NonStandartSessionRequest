"use strict";

// FAO, RNR, and BUR Admin pages
var adminModule = angular.module("adminModule", ["ngResource", "kendo.directives"]);


// Session Request and Session Result pages
var sessionModule = angular.module("sessionModule", ["ngResource", "ngRoute", "kendo.directives"]);

sessionModule.config([

    "$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/",
            {
                templateUrl: "scripts/app/views/SessionRequest.html",
                controller: "sessionRequestCtrl"
            })
            .when("/Result",
            {
                templateUrl: "scripts/app/views/SessionResult.html",
                controller: "sessionResultCtrl"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    }
]);
'use strict';

adminModule.factory('EmailResult', ['$resource', function ($resource) {

    return $resource(
        "api/email/:requestId", { requestId: '@id' }
    );
}])
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
'use strict';

adminModule.factory('Submissions', ['$resource', function ($resource) {

    return $resource(
        "api/submissions/:submissionId", { submissionId: '@id' },
        { 'update': { method: 'PUT' } }
    );
}])
'use strict';

adminModule.factory('WriteToSis', ['$resource', function ($resource) {

    return $resource(
        "api/rnrswebsess", null, null
    );
}])
'use strict';

function GetCampusLocations(){

    var campusLocations = [ // Populate the Campus Location dropdown.

            { campusCode: "HSC", campusName: "Health Science Campus" },
            { campusCode: "OCC", campusName: "Orange County Campus" },
            { campusCode: "OVS", campusName: "Overseas" },
            { campusCode: "DC", campusName: "Washington D.C." },
            { campusCode: "SAC", campusName: "Sacramento" },
            { campusCode: "USA", campusName: "Off-campus in U.S." },
            { campusCode: "VIR", campusName: "Virtual(DEN/Online)" },
            { campusCode: "CAT", campusName: "Catalina" },
            { campusCode: "LAC", campusName: "L.A. Center" },
            { campusCode: "SD", campusName: "San Diego" },
            { campusCode: "ATT", campusName: "AT&T Center" },
            { campusCode: "SKB", campusName: "No Tuition or Fees" },
            { campusCode: "OTH", campusName: "Others" }
    ];

    return campusLocations;
}   // GetCampusLocations()


adminModule.factory('CampusLocations', ['$resource', function ($resource) {

    return GetCampusLocations();

}]);

sessionModule.factory('CampusLocations', ['$resource', function ($resource) {

    return GetCampusLocations();

}]);
'use strict';

function getCampusLocation(cCode, cLocations) {

    var campusLocation = "";

    for (var i = 0; i < cLocations.length; ++i) {
        if (cLocations[i].campusCode == cCode) {
            campusLocation = cLocations[i].campusName;
            break;
        }
    }
    return campusLocation;
}

adminModule.factory('GetCampusName',
    [
        "CampusLocations", function(CampusLocations){

            return function (campusCode) {
                var campusName = getCampusLocation(campusCode, CampusLocations);
                return campusName;
            }
        }
    ]
);

sessionModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations) {

            return function (campusCode) {
                var campusName = getCampusLocation(campusCode, CampusLocations);
                return campusName;
            }
        }
    ]
);
'use strict';

adminModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes");

}]);

sessionModule.factory('GetSpecialFeeCodes', ['$resource', function ($resource) {

    return $resource("api/specialfeecodes");

}]);

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
'use strict';

adminModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}]);

sessionModule.factory('RateTable', ['$resource', function ($resource) {

    return $resource(
        "api/ratetable"
    );

}])
adminModule.controller("burQueueCtrl",

    ["$scope", "$filter", "Submissions", "RateTable", "RateDescription", "GetCampusName",

    function ($scope, $filter, Submissions, RateTable, RateDescription, GetCampusName) {
        
        $scope.dataSource = new kendo.data.DataSource({

            transport: {

                    read: function (e) {

                        Submissions.query(function (data) {

                            $scope.submissions = data;

                            e.success(

                                data.map(
                                    function (subm) {
                                        return {

                                            requestId           : subm.requestId,
                                            submissionId        : subm.submissionId,
                                            academicTerm        : subm.session.academicTerm,
                                            sessionCode         : subm.session.sessionCode,
                                            sessionName         : subm.session.sessionName,
                                            userEmail           : subm.session.userEmail,
                                            userPhone           : subm.session.userPhone,
                                            isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                            uscCampusLocation   : GetCampusName(subm.session.uscCampusLocation),
                                            otherCampusLocation : subm.session.otherCampusLocation,
                                            lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                            lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                            lastDayForEnrollmentOptionChange:
                                                                $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                            firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                            lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                            firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                            lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                            firstDayForFinalGrading:
                                                                $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                            lastDayForFinalGrading:
                                                                $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                            rateType            : RateDescription(subm.session.rateType, subm.session.academicTerm, $scope.rates),
                                            ratePerUnitAmount   : subm.session.ratePerUnitAmount,
                                            flatRateAmount      : subm.session.flatRateAmount,
                                            flatRateUnitsMin    : subm.session.flatRateUnitsMin,
                                            flatRateUnitsMax    : subm.session.flatRateUnitsMax,
                                            gradFlatRateUnitsMin: subm.session.gradFlatRateUnitsMin,
                                            gradFlatRateUnitsMax: subm.session.gradFlatRateUnitsMax,
                                            owningSchool        : subm.session.owningSchool,
                                            owningDepartment    : subm.session.owningDepartment,
                                            userContact         : subm.session.userContact,
                                            requestDate         : $filter('date')(subm.session.requestDate, "mediumDate"),
                                            sections            : subm.session.sections,
                                            sessionBreaks       : subm.session.sessionBreaks,
                                            specialFees         : subm.session.specialFees,
                                            comments            : subm.session.comments,
                                            faoAction           : subm.faoAction,
                                            faoActionDate       : $filter('date')(subm.faoActionDate, "mediumDate"),
                                            faoActionReason     : subm.faoActionReason,
                                            rnrAction           : subm.rnrAction,
                                            rnrActionDate       : $filter('date')(subm.rnrActionDate, "mediumDate"),
                                            rnrActionReason     : subm.rnrActionReason,
                                            burAction           : subm.burAction,
                                            burActionDate       : $filter('date')(subm.burActionDate, "mediumDate"),
                                            burActionReason     : (subm.burAction == null) ? "1. Review" : subm.burActionReason
                                        };
                                    }));
                                    $scope.spinningWheel.center().close();

                        }, function (error) {
                            alert("Cannot load submissions. " + error.data.message);
                            $scope.spinningWheel.center().close();
                        });
                    }   // read: function()
                },      // transport {
                schema: {
                    model: {
                        fields: {
                            sessionCode: { type: "string" },
                            sessionName: { type: "string" },
                            owningSchool:{ type: "string" },
                            userContact: { type: "string" },
                            requestDate: { type: "string" }
                        }
                    }
                },
                pageSize: 10
        });

        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            sortable: true,
            pageable: true,

            columns: [
                { field: "burActionReason", title: "Status",        width: "12.5%"  },
                { field: "requestId",       title: "Request",       width: "7.5%"   },
                { field: "academicTerm",    title: "Term",          width: "7.5%"   },
                { field: "sessionCode",     title: "Session",       width: "7.5%"   },
                { field: "sessionName",     title: "Session Name",  width: "15%"    },
                { field: "owningSchool",    title: "School",        width: "20%"    },
                { field: "owningDepartment",title: "Department",    width: "15%"    },
                { field: "requestDate",     title: "Date",          width: "10%"    },
            ],
            editable: "popup"
        };

    $scope.sectionGridOptions = function (dataItem) {

        return {
            dataSource: {
                data: dataItem.sections,
                pageSize: 5
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "sectionNumber",       title: "Section",       width: "10%" },
                { field: "prefix",              title: "Prefix",        width: "10%" },
                { field: "title",               title: "Section Title", width: "15%" },
                { field: "courseNumber",        title: "Course #",      width: "10%" },
                { field: "unitValue",           title: "Units",         width: "10%" },
                { field: "estimatedEnrollment", title: "Class size",    width: "10%" },
                { field: "instructorName",      title: "Instructor",    width: "15%" },
                { field: "incomeAmountNumber",  title: "Acct. no.",     width: "10%" }
            ]
        };
    };  // sectionGridOptions

    $scope.scheduleGridOptions = function (dataItem) {
        return {
            dataSource: {
                data: dataItem.schedules,
                pageSize: 5,
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "classDayOfWeek",  title: "Class Day",     width: "100px" },
                { field: "classStartTime",  title: "Start Time",    width: "150px" },
                { field: "classEndTime",    title: "End Time",      width: "150px" }
            ]
        };
    };  // scheduleGridOptions


    $scope.specialFeeGridOptions = function (dataItem) {
        return {
            dataSource: {
                data: dataItem.specialFees
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "feeCode", title: "Fee Code", width: "100px" },
                { field: "amount", title: "Amount", width: "100px" },
                { field: "assessedTo", title: "Assessed To", width: "100px" }
            ]
        };
    };  // specialFeeGridOptions

    $scope.sessionBrkGridOptions = function (dataItem) {
        return {
                dataSource: {
                    data: dataItem.sessionBreaks,
                    pageSize: 5,
                    schema: {
                        model: {
                            fields: {
                                startDate: { type: "date" },
                                endDate: { type: "date" }
                            }
                        }
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "startDate",   title: "Start Date",format: "{0:MMM dd, yyyy}" },
                    { field: "endDate",     title: "End Date",  format: "{0:MMM dd, yyyy}" }
                ]
            };
    };  // sessionBrkGridOptions

    $scope.ChangeBurStatus = function (submID, burStatus)
    {
        var selectedSess = $filter('filter')($scope.submissions, { "submissionId": submID }, true)[0];

        if (selectedSess != null) {

            $scope.rejectSess = selectedSess;
            $scope.rejectSess.rnrActionReason = "";

            var todaysDate = new Date();
            var burStatusText = null;

            switch (burStatus) {

                case "":
                    burStatusText = "1. Review";
                    break;

                case "I":
                    burStatusText = "2. Issue";
                    break;
                
                case "C":
                    burStatusText = "3. Complete";
                    break;

                default:
                    burStatusText = "";
                    break;
            }

            var status = {
                submissionId    : submID,
                faoAction       : $scope.rejectSess.faoAction,
                faoActionDate   : $scope.rejectSess.faoActionDate,
                faoActionReason : $scope.rejectSess.faoActionReason,
                rnrAction       : $scope.rejectSess.rnrAction,
                rnrActionDate   : $scope.rejectSess.rnrActionDate,
                rnrActionReason : $scope.rejectSess.rnrActionReason,
                burAction       : burStatus,
                burActionDate   : todaysDate.toDateString(),
                burActionReason : burStatusText
            };

            $scope.spinningWheel.center().open();

            Submissions.update({ submissionId: submID }, status)     // update the request's status
                .$promise.then(function () {

                    // remove the submission from the list
                    for (var i = 0; i < $scope.dataSource._data.length; ++i) {
                        if ($scope.dataSource._data[i].submissionId == submID) {
                            $scope.dataSource._data[i].burActionReason = burStatusText;
                            break;
                        }
                    }   // for (var i...

                    $scope.spinningWheel.center().close();
                }), function () {
                    alert("Failed in updating the Bursar status for Request ID: " + $scope.rejectSess.requestId);
                    $scope.spinningWheel.center().close();
                }; // promise.fail()
        }

        return;
    }   // Submissions.ChangeBurStatus()


    $(document).ready(function () {
        $scope.spinningWheel.center().open();
        $scope.rates = RateTable.query();
    });

}]);
adminModule.controller("faoQueueCtrl",

    ["$scope", "$filter", "Submissions", "RateTable", "RateDescription", "EmailResult", "GetCampusName",

    function ($scope, $filter, Submissions, RateTable, RateDescription, EmailResult, GetCampusName) {

        $scope.dataSource = new kendo.data.DataSource({

            transport: {

                read: function (e) {

                    Submissions.query(function (data) {

                            $scope.submissions = data;

                            e.success(

                                data.map(
                                    function (subm) {
                                        return {
                                            requestId           : subm.requestId,
                                            submissionId        : subm.submissionId,
                                            academicTerm        : subm.session.academicTerm,
                                            sessionCode         : subm.session.sessionCode,
                                            sessionName         : subm.session.sessionName,
                                            userEmail           : subm.session.userEmail,
                                            userPhone           : subm.session.userPhone,
                                            isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                            uscCampusLocation   : GetCampusName(subm.session.uscCampusLocation),
                                            otherCampusLocation : subm.session.otherCampusLocation,
                                            lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                            lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                            lastDayForEnrollmentOptionChange:
                                                                $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                            firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                            lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                            firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                            lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                            firstDayForFinalGrading:
                                                                $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                            lastDayForFinalGrading:
                                                                $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                            rateType            : RateDescription(subm.session.rateType, subm.session.academicTerm, $scope.rates),
                                            ratePerUnitAmount   : subm.session.ratePerUnitAmount,
                                            flatRateAmount      : subm.session.flatRateAmount,
                                            flatRateUnitsMin    : subm.session.flatRateUnitsMin,
                                            flatRateUnitsMax    : subm.session.flatRateUnitsMax,
                                            gradFlatRateUnitsMin: subm.session.gradFlatRateUnitsMin,
                                            gradFlatRateUnitsMax: subm.session.gradFlatRateUnitsMax,
                                            owningSchool        : subm.session.owningSchool,
                                            owningDepartment    : subm.session.owningDepartment,
                                            userContact         : subm.session.userContact,
                                            requestDate         : $filter('date')(subm.session.requestDate, "mediumDate"),
                                            sections            : subm.session.sections,
                                            sessionBreaks       : subm.session.sessionBreaks,
                                            specialFees         : subm.session.specialFees,
                                            comments            : subm.session.comments,
                                            faoAction           : subm.faoAction,
                                            faoActionDate       : $filter('date')(subm.faoActionDate, "mediumDate"),
                                            faoActionReason     : subm.faoActionReason,
                                            rnrAction           : subm.rnrAction,
                                            rnrActionDate       : $filter('date')(subm.rnrActionDate, "mediumDate"),
                                            rnrActionReason     : subm.rnrActionReason,
                                            burAction           : subm.burAction,
                                            burActionDate       : $filter('date')(subm.burActionDate, "mediumDate"),
                                            burActionReason     : subm.burActionReason
                                    };
                                    }));
                                    $scope.spinningWheel.center().close();
                        }, function (error) {
                            alert("Cannot load submissions. " + error.data.message);
                            $scope.spinningWheel.center().close();
                            //                                e.error(new Error("Cannot load users. " + error.data.message));
                        });
                    }   // read: function()
            },      // transport {
            schema: {
                model: {
                    fields: {
                        sessionCode:    { type: "string" },
                        sessionName:    { type: "string" },
                        owningSchool:   { type: "string" },
                        userContact:    { type: "string" },
                        requestDate:    { type: "string" }
                    }
                }
            },
            pageSize: 10
        });

        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            sortable: true,
            pageable: true,
            columns: [

                { field: "requestId",       title: "Request",       width: "7.5%" },
                { field: "academicTerm",    title: "Term",          width: "7.5%" },
                { field: "sessionCode",     title: "Session",       width: "7.5%" },
                { field: "sessionName",     title: "Session Name",  width: "15%" },
                { field: "owningSchool",    title: "School",        width: "15%" },
                { field: "owningDepartment",title: "Department",    width: "15%" },
                { field: "requestDate",     title: "Date",          width: "10%" },
                    // Approve/Reject buttons
                { template: "<button ng-click='approveRequest(#= data.submissionId #)'>Approve</button>" },
                { template: "<button ng-click='openRejectPopup(#= data.submissionId #)'>Reject</button>" }
            ],
            editable: "popup"
        };

        $scope.sectionGridOptions = function (dataItem) {

            return {
                dataSource: {
                    data: dataItem.sections,
                    pageSize: 5
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "sectionNumber",       title: "Section",       width: "10%" },
                    { field: "prefix",              title: "Prefix",        width: "10%" },
                    { field: "title",               title: "Section Title", width: "15%" },
                    { field: "courseNumber",        title: "Course #",      width: "10%" },
                    { field: "unitValue",           title: "Units",         width: "10%" },
                    { field: "estimatedEnrollment", title: "Class size",    width: "10%" },
                    { field: "instructorName",      title: "Instructor",    width: "15%" },
                    { field: "incomeAmountNumber",  title: "Acct. no.",     width: "10%" }
                ]
            };
        };

        $scope.scheduleGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.schedules,
                    pageSize: 5,
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "classDayOfWeek",  title: "Class Day",     width: "100px" },
                    { field: "classStartTime",  title: "Start Time",    width: "150px" },
                    { field: "classEndTime",    title: "End Time",      width: "150px" }
                ]
            };
        };

        $scope.specialFeeGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.specialFees
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "feeCode", title: "Fee Code", width: "100px" },
                    { field: "amount", title: "Amount", width: "100px" },
                    { field: "assessedTo", title: "Assessed To", width: "100px" }
                ]
            };
        };

        $scope.sessionBrkGridOptions = function (dataItem) {
            return {
                    dataSource: {
                        data: dataItem.sessionBreaks,
                        pageSize: 5,
                        schema: {
                            model: {
                                fields: {
                                    startDate: { type: "date" },
                                    endDate: { type: "date" }
                                }
                            }
                        }
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
                        { field: "startDate",   title: "Start Date",    format: "{0: MMM dd, yyyy}" },
                        { field: "endDate",     title: "End Date",      format: "{0: MMM dd, yyyy}" }
                    ]
                };
        };  // $scope.sessionBrkGridOptions

        $scope.rejectSess = {};

        $scope.openRejectPopup = function (submID) {
            $scope.submID = submID;
            $scope.rejectWindow.center().open();
            return;
        }

        $scope.approveRequest = function (submID) {
            $scope.submID = submID;
            $scope.updateRequest('A', 'Approved');
            alert("Session Request Approved!");
            return;
        }

        $scope.EmailUser = function (submID) {
            EmailResult.save({id: submID });                      // Email requestor upon approval or rejection
            alert("Email sent for Submission ID: " + submID);
            return;
        }

        $scope.updateRequest = function (actionCode, rejectReason) {

            if (!rejectReason) {
                alert("Please provide a reason for rejecting the request.");
                return;
            }

            var selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];

            if (selectedSess != null) {
                $scope.rejectSess = selectedSess;
            }

            var todaysDate = new Date();

            var status = {
                submissionId:   $scope.submID,
                faoAction:      actionCode,
                faoActionDate:  todaysDate.toDateString(),
                faoActionReason: rejectReason,
                rnrAction:      $scope.rejectSess.rnrAction,
                rnrActionDate:  $scope.rejectSess.rnrActionDate,
                rnrActionReason: $scope.rejectSess.rnrActionReason,
                burAction       :   $scope.rejectSess.burAction,
                burActionDate   :   todaysDate.toDateString(),
                burActionReason :   $scope.rejectSess.burActionReason
            };

            $scope.spinningWheel.center().open();

            Submissions.update({ submissionId: $scope.submID }, status)                         // update the request's status
                .$promise.then(function () {

                    $scope.spinningWheel.center().close();

                    switch (actionCode) {

                        case "A":
                            // EmailResult.save($scope.rejectSess.requestId);                   // Email requestor upon approval
                            break;

                        case "R":
                            EmailResult.save({ id: $scope.submID });                           // Email requestor upon rejection
                            alert("Rejection email sent.");
                            break;

                        default:
                            break;
                    }       // switch()

                    if (actionCode == 'R')
                        $scope.rejectWindow.close();

                    // remove the submission from the list
                    for (var i = 0; i < $scope.dataSource._data.length; ++i) {
                        if ($scope.dataSource._data[i].submissionId == $scope.submID) {
                            $scope.dataSource._data.splice(i, 1);
                            break;
                        }
                    }   // for (var i...
                }); // promise.then()
        }   // updateRequest()

        $(document).ready(function () {
            $scope.spinningWheel.center().open();
            $scope.rates = RateTable.query();
        })

    }   // function ($scope...
]); // adminController...
adminModule.controller("rnrQueueCtrl",

    ["$scope", "$filter", "Submissions", "WriteToSis", "EmailResult", "RateTable", "RateDescription", "GetCampusName",

    function ($scope, $filter, Submissions, WriteToSis, EmailResult, RateTable, RateDescription, GetCampusName) {

        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    Submissions.query(function (data) {
                        $scope.submissions = data;
                        e.success(
                            data.map(
                                function (subm) {
                                    return {
                                        requestId           : subm.requestId,
                                        submissionId        : subm.submissionId,
                                        academicTerm        : subm.session.academicTerm,
                                        sessionCode         : subm.session.sessionCode,
                                        sessionName         : subm.session.sessionName,
                                        userEmail           : subm.session.userEmail,
                                        userPhone           : subm.session.userPhone,
                                        isClassHeldAtUpc    : subm.session.isClassHeldAtUpc,
                                        uscCampusLocation   : GetCampusName(subm.session.uscCampusLocation),
                                        otherCampusLocation : subm.session.otherCampusLocation,
                                        lastDayForAddDrop   : $filter('date')(subm.session.lastDayForAddDrop, "mediumDate"),
                                        lastDayForWithdrawal: $filter('date')(subm.session.lastDayForWithdrawal, "mediumDate"),
                                        lastDayForEnrollmentOptionChange:
                                                            $filter('date')(subm.session.lastDayForEnrollmentOptionChange, "mediumDate"),
                                        firstDayOfClass     : $filter('date')(subm.session.firstDayOfClass, "mediumDate"),
                                        lastDayOfClass      : $filter('date')(subm.session.lastDayOfClass, "mediumDate"),
                                        firstDayOfFinals    : $filter('date')(subm.session.firstDayOfFinals, "mediumDate"),
                                        lastDayOfFinals     : $filter('date')(subm.session.lastDayOfFinals, "mediumDate"),
                                        firstDayForFinalGrading:
                                                            $filter('date')(subm.session.firstDayForFinalGrading, "mediumDate"),
                                        lastDayForFinalGrading:
                                                            $filter('date')(subm.session.lastDayForFinalGrading, "mediumDate"),
                                        rateType            : RateDescription(subm.session.rateType, subm.session.academicTerm, $scope.rates),
                                        ratePerUnitAmount   : subm.session.ratePerUnitAmount,
                                        flatRateAmount      : subm.session.flatRateAmount,
                                        flatRateUnitsMin    : subm.session.flatRateUnitsMin,
                                        flatRateUnitsMax    : subm.session.flatRateUnitsMax,
                                        gradFlatRateUnitsMin: subm.session.gradFlatRateUnitsMin,
                                        gradFlatRateUnitsMax: subm.session.gradFlatRateUnitsMax,
                                        owningSchool        : subm.session.owningSchool,
                                        owningDepartment    : subm.session.owningDepartment,
                                        userContact         : subm.session.userContact,
                                        requestDate         : $filter('date')(subm.session.requestDate, "mediumDate"),
                                        sections            : subm.session.sections,
                                        sessionBreaks       : subm.session.sessionBreaks,
                                        specialFees         : subm.session.specialFees,
                                        comments            : subm.session.comments,
                                        faoAction           : subm.faoAction,
                                        faoActionDate       : $filter('date')(subm.faoActionDate, "mediumDate"),
                                        faoActionReason     : subm.faoActionReason,
                                        rnrAction           : subm.rnrAction,
                                        rnrActionDate       : $filter('date')(subm.rnrActionDate, "mediumDate"),
                                        rnrActionReason     : subm.rnrActionReason,
                                        burAction           : subm.burAction,
                                        burActionDate       : $filter('date')(subm.burActionDate, "mediumDate"),
                                        burActionReason     : subm.burActionReason
                                    };
                                }));
                                $scope.spinningWheel.center().close();
                        },
                        function (error) {

                            alert("Cannot load submissions. " + error.data.message);
                            $scope.spinningWheel.center().close();

                        });
                    }   // read: function()
                },      // transport {
                schema: {
                model: {
                    fields: {
                        sessionCode: { type: "string" },
                        sessionName: { type: "string" },
                        owningSchool: { type: "string" },
                        userContact: { type: "string" },
                        requestDate: { type: "string" }
                    }
                }
            },
            pageSize: 10
        });


        $scope.mainGridOptions =
            {
                dataSource: $scope.dataSource,
                sortable: true,
                pageable: true,
                columns: [
                        { field: "requestId",       title: "Request",       width: "7.5%" },
                        { field: "academicTerm",    title: "Term",          width: "7.5%" },
                        { field: "sessionCode",     title: "Session",       width: "7.5%" },
                        { field: "sessionName",     title: "Session Name",  width: "15%" },
                        { field: "owningSchool",    title: "School",        width: "15%" },
                        { field: "owningDepartment",title: "Department",    width: "15%" },
                        { field: "requestDate",     title: "Date",          width: "10%" },
                        // Approve/Reject buttons
                        { template: "<button ng-click='approveRequest(#= data.submissionId #)'>Approve</button>" },
                        { template: "<button ng-click='openRejectPopup(#= data.submissionId #)'>Reject</button>" }
                ],
                editable: "popup"
            };

        $scope.sectionGridOptions = function (dataItem) {

            return {
                dataSource: {
                    data: dataItem.sections,
                    pageSize: 5
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "sectionNumber",       title: "Section",       width: "10%" },
                    { field: "prefix",              title: "Prefix",        width: "10%" },
                    { field: "title",               title: "Section Title", width: "15%" },
                    { field: "courseNumber",        title: "Course #",      width: "10%" },
                    { field: "unitValue",           title: "Units",         width: "10%" },
                    { field: "estimatedEnrollment", title: "Class size",    width: "10%" },
                    { field: "instructorName",      title: "Instructor",    width: "15%" },
                    { field: "incomeAmountNumber",  title: "Acct. no.",     width: "10%" }
                ]
            };
        }   // sectionGridOptions()


        $scope.scheduleGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.schedules,
                    pageSize: 5,
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "classDayOfWeek",  title: "Class Day",     width: "100px" },
                    { field: "classStartTime",  title: "Start Time",    width: "150px" },
                    { field: "classEndTime",    title: "End Time",      width: "150px" }
                ]
            };
        };

        $scope.specialFeeGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.specialFees
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "feeCode", title: "Fee Code", width: "100px" },
                    { field: "amount", title: "Amount", width: "100px" },
                    { field: "assessedTo", title: "Assessed To", width: "100px" }
                ]
            };
        };

        $scope.sessionBrkGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: dataItem.sessionBreaks,
                    pageSize: 5,
                    schema: {
                        model: {
                            fields: {
                                startDate: { type: "date" },
                                endDate: { type: "date" }
                            }
                        }
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "startDate",   title: "Start Date",    format: "{0:MMM dd, yyyy}" },
                    { field: "endDate",     title: "End Date",      format: "{0:MMM dd, yyyy}" }
                ]
            };
        };  // $scope.sessionBrkGridOptions

        $scope.rejectSess = {};

        $scope.openRejectPopup = function (submID) {
            $scope.submID = submID;
            $scope.rejectWindow.center().open();
            $scope.selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];
            return;
        }

        function convDateToString(givenDate) {

            var dateString = "";

            if (givenDate) {
                var newDate = new Date(givenDate);
                dateString = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
            return dateString;
        }   // convDateToString()

        $scope.approveRequest = function (submID) {

            $scope.submID = submID;
            $scope.selectedSess = $filter('filter')($scope.submissions, { "submissionId": $scope.submID }, true)[0];

            // Get the Session Breaks
            var session = $scope.selectedSess.session;
            var sessDates = {"Sess1Start": 0, "Sess1End": 1, "Sess2Start": 2, "Sess2End": 3};
            var sessBreaks = ["", "", "", ""];

            switch (session.sessionBreaks.length) {

                case 2:      // if there are two session breaks, it will fall through case 1
                    sessBreaks[sessDates.Sess2Start]    = session.sessionBreaks[1].startDate;
                    sessBreaks[sessDates.Sess2End]      = session.sessionBreaks[1].endDate;

                case 1:     // if there is only one break, it will only get the first one
                    sessBreaks[sessDates.Sess1Start]    = session.sessionBreaks[0].startDate;
                    sessBreaks[sessDates.Sess1End]      = session.sessionBreaks[0].endDate;
                    break;

                default:
                    break;
            }   // end of switch()

            var sisDatesPacket = {
                academicTerm            : session.academicTerm,
                sessionCode             : session.sessionCode,
                firstDayOfClass         : convDateToString(session.firstDayOfClass),
                lastDayOfClass          : convDateToString(session.lastDayOfClass),
                firstDayOfFinals        : convDateToString(session.firstDayOfFinals),
                lastDayOfFinals         : convDateToString(session.lastDayOfFinals),
                lastDayForAddDrop       : convDateToString(session.lastDayForAddDrop),
                lastDayForWithdrawal    : convDateToString(session.lastDayForWithdrawal),
                lastDayForEnrollmentOptionChange: convDateToString(session.lastDayForEnrollmentOptionChange),
                firstDayForFinalGrading : convDateToString(session.firstDayForFinalGrading),
                lastDayForFinalGrading  : convDateToString(session.lastDayForFinalGrading),
                sessionBreak1BeginDate  : convDateToString(sessBreaks[sessDates.Sess1Start]),
                sessionBreak1EndDate    : convDateToString(sessBreaks[sessDates.Sess1End]),
                sessionBreak2BeginDate  : convDateToString(sessBreaks[sessDates.Sess2Start]),
                sessionBreak2EndDate    : convDateToString(sessBreaks[sessDates.Sess2End])
            };

            $scope.spinningWheel.center().open();
            WriteToSis.save(sisDatesPacket,

                function () {       // success
                    $scope.updateRequest('A', 'Approved');
                    alert("Session Request Approved!");
                    $scope.spinningWheel.center().close();
                },
                function () {      // fail
                    alert("Failed to write the approved session " + sisDatesPacket.academicTerm + "-" + sisDatesPacket.sessionCode +" because it already exists in SIS.");
                    $scope.spinningWheel.center().close();
                }
            );

            return;
        }   // approveRequest()


        $scope.updateRequest = function (actionCode, rejectReason) {

            if (!rejectReason) {
                alert("Please provide a reason for rejecting the request.");
                return;
            }

            var todaysDate = new Date();

            var status = {
                submissionId    : $scope.submID,
                faoAction       : $scope.selectedSess.faoAction,
                faoActionDate   : $scope.selectedSess.faoActionDate,
                faoActionReason : $scope.selectedSess.faoActionReason,
                rnrAction       : actionCode,
                rnrActionDate   : todaysDate.toDateString(),
                rnrActionReason: rejectReason,
                burAction       :   $scope.rejectSess.burAction,
                burActionDate   :   todaysDate.toDateString(),
                burActionReason :   $scope.rejectSess.burActionReason
            };

            $scope.spinningWheel.center().open();

            Submissions.update({ submissionId: $scope.submID }, status)                 // update the request's status

                .$promise.then(function () {

                    EmailResultAndUpdateList(actionCode);

                }, function(errMsg) {

                    alert("Update failed: " + errMsg);

                });
        
        }   // $scope.updateRequest()


        function EmailResultAndUpdateList(codeAction) {

            $scope.spinningWheel.center().close();

            switch (codeAction) {

                case "A":
                    EmailResult.save({ id: $scope.submID });                           // Send Request Approval Email
                    alert("Approval email sent");
                    break;

                case "R":
                    EmailResult.save({ id: $scope.submID });                           // Send Rejection Email
                    alert("Rejection email sent");
                    break;

                default:
                    break;
            }   // switch()

            // remove the submission from the list
            for (var i = 0; i < $scope.dataSource._data.length; ++i) {

                if ($scope.dataSource._data[i].submissionId == $scope.submID) {
                    $scope.dataSource._data.splice(i, 1);
                    break;
                }
            }   // for (var i...

            if (actionCode == 'R') {
                $scope.rejectWindow.close();
            }

            return;
        }   // EmailResultAndUpdateList()

        $scope.assessDecode = function (aCode) {

            var assessTo = "";

            switch (aCode) {
                case 'G':
                    assessTo = "Graduate";
                    break;
                case 'U':
                    assessTo = "Undergraduate";
                    break;
                case 'B':
                    assessTo = "All";
                    break;
            }
            return assessTo;
        }

        $(document).ready(function () {
            $scope.spinningWheel.center().open();
            $scope.rates = RateTable.query();
        })

    }]);