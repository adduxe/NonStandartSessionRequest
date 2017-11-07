'use strict';

sessionModule.factory('SemStartDates', ['$resource', function ($resource) {
    
    var currDate = new Date();
    var currYear = currDate.getFullYear();
    var nextYear = parseInt(currYear) + 1;

    var semStartDates = {
        spring : new Date("01/01/" + currYear),
        summer : new Date("05/01/" + currYear),
        fall   : new Date("08/01/" + currYear)
    };

    var springDate = semStartDates.spring;
    var summerDate = semStartDates.summer;
    var fallDate = semStartDates.fall;

    var semChoices = [];
    var semStart = null;

    if ((currDate >= springDate) && (currDate < summerDate)) {      // Display Spring Current Year to Spring Next Year

        semStart = springDate;
        semChoices = [
            { semName: currYear + " Spring", semCode: currYear + "1" },
            { semName: currYear + " Summer", semCode: currYear + "2" },
            { semName: currYear + " Fall", semCode: currYear + "3" },
            { semName: nextYear + " Spring", semCode: nextYear + "1" }
        ];

    } else if ((currDate >= summerDate) && (currDate < fallDate)) {  // Display Summer Current Year to Summer Next Year

        semStart = summerDate;
        semChoices = [
            { semName: currYear + " Summer", semCode: currYear + "2" },
            { semName: currYear + " Fall", semCode: currYear + "3" },
            { semName: nextYear + " Spring", semCode: nextYear + "1" },
            { semName: nextYear + " Summer", semCode: nextYear + "2" }
        ];

    } else {                                                        // Display Current Fall to Next Year Fall

        semStart = fallDate;
        semChoices = [
            { semName: currYear + " Fall", semCode: currYear + "3" },
            { semName: nextYear + " Spring", semCode: nextYear + "1" },
            { semName: nextYear + " Summer", semCode: nextYear + "2" },
            { semName: nextYear + " Fall", semCode: nextYear + "3" }
        ];
    }

    return {
        sStart: semStart.getFullYear() + '-' + parseInt(semStart.getMonth() + 1) + '-' + semStart.getDate(),
        sChoices: semChoices
    };
}])