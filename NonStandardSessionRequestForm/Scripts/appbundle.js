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

sessionModule.factory('Get001Dates', ['$resource', function ($resource) {

    return $resource(
        'api/sessions/:semester/001', { semester: '@id' }
        );
    }
])
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
        sStart: semStart,
        sChoices: semChoices
    };
}])
'use strict';

sessionModule.factory('Sessions', ['$resource', function ($resource) {

    return $resource(
        'api/sessionrequests/:requestId', { requestId: '@id' }
        );
    }
])
'use strict';

sessionModule.factory('SessionCodes', ['$resource', function ($resource) {

    var sessCodes = [
            "001  MAIN ON-CAMPUS SESSION",
            "002  LAW",
            "003  KECK - MD PROGRAM",
            "004  PHAR",
            "005  PHAR - PSCI & MPTX",
            "006  DENT - First Year",
            "007  DENT - Dental Hygiene First Year",
            "008  DENT - International First Year",
            "009  DENT - First Year Advanced",
            "010  DENT - Second Year Advanced",
            "011  DENT - Pediatric Dentistry Second Year",
            "012  DENT - OT",
            "013  PHAR - Continuing Student Program",
            "014  ENGR - DEN Program",
            "015  ENGR - DEN Program",
            "016  PHYS - Special Credit Exams for Subject Credit",
            "017  KECK - PM",
            "018  MAIN - Session with no tuition or fees",
            "019  KECK - PM",
            "020  KECK - PM",
            "021  PPD - Washington Semester",
            "022  PPD - Sacramento Semester",
            "023  DENT - Oral Surgery Program",
            "024  DENT - Incoming Advanced",
            "025  DENT - Oral Surgery (final trimester)",
            "026  DENT - Extended Enrollment",
            "027  DENT - First Year Pediatric Dentistry",
            "028  DENT - Incoming Oral Surgery",
            "029  DENT - Extended Enrollment",
            "030  DENT - Third Year Advanced",
            "031  MAIN - Credit Exams, Subject, and Units",
            "032  DENT",
            "033  MARSHALL - GSBA",
            "034  ENGR - DEN Program",
            "035  PHAR - Practicum",
            "036  MARSHALL - GSBA",
            "037  CINEMATIC ARTS - GRADUATE PROGRAMS",
            "038  PPD - MRED Program",
            "039  DENT - Second Year",
            "040  DENT - Third Year",
            "041  DENT - Fourth Year",
            "042  DENT - International Second Year",
            "043  DENT - Dental Hygiene Program Second Year",
            "044  CINEMATIC ARTS - GRADUATE PROGRAMS",
            "045  SOWK",
            "046  MAIN HSC-CAMPUS SESSION",
            "047  KECK - MD PROGRAM",
            "048  ENGR - Graduate Programs",
            "049  KECK - MD PROGRAM",
            "050  MAIN - UPC SUMMER SESSION - 6 WEEKS MAY TO JUNE",
            "051  MAIN - UPC SUMMER SESSION - 6 WEEKS JULY TO AUGUST",
            "052  MAIN - UPC SUMMER SESSION - 4 WEEKS",
            "053  MAIN - UPC SUMMER SESSION - 5 WEEKS",
            "054  MAIN - UPC SUMMER SESSION - 7 WEEKS",
            "055  MAIN - UPC SUMMER SESSION - 8 WEEKS",
            "056  MAIN - UPC SUMMER SESSION - 9 WEEKS",
            "057  MAIN - UPC SUMMER SESSION - 10 WEEKS",
            "058  MAIN - UPC SUMMER SESSION - 11 WEEKS",
            "059  MAIN - UPC SUMMER SESSION - 12 WEEKS",
            "060  REGISTRAR SESSION",
            "061  GENERAL 16-WEEK SESSION WITHOUT FINALS WEEK",
            "062  KECK - PCPA - MEDICINE",
            "063  PPD - GLOBAL MPP PROGRAM",
            "064  PPD - GLOBAL MPP PROGRAM",
            "065  DORNSIFE - WRITING FELLOWS PRACTICUM",
            "066  AVAILABLE",
            "067  REGISTRAR SESSION",
            "068  AVAILABLE",
            "069  AVAILABLE",
            "070  AVAILABLE",
            "071  AVAILABLE",
            "072  AVAILABLE",
            "073  AVAILABLE",
            "074  REGISTRAR - PostDoctoral Fellow Program",
            "075  AVAILABLE",
            "076  Summer Session",
            "077  AVAILABLE",
            "078  AVAILABLE",
            "079  AVAILABLE",
            "080  KECK - MD PROGRAM",
            "081  AVAILABLE",
            "082  AVAILABLE",
            "083  AVAILABLE",
            "084  AVAILABLE",
            "085  AVAILABLE",
            "086  FINANCIAL AID CONSORTIUM",
            "087  AVAILABLE",
            "088  DORNSIFE - MAYMESTER",
            "089  OVERSEAS - BRAZIL",
            "090  OVERSEAS - UK",
            "091  OVERSEAS - MEXICO",
            "092  OVERSEAS - SCOTLAND",
            "093  OVERSEAS - SO. KOREA",
            "094  AVAILABLE",
            "095  DORNSIFE - MDA",
            "096  DORNSIFE - PSYC",
            "097  DORNSIFE - PSYC",
            "098  KECK - PM",
            "099  MAIN - INTERNATIONAL COURSES ONLY",
            "100  DENT - CERTIFICATE GDEN",
            "1000  SSM Fort Knox",
            "101  OVERSEAS - KENYA",
            "102  OVERSEAS - UK",
            "103  USC - UCLA Cross Registration",
            "104  OVERSEAS - GERMANY",
            "105  OVERSEAS - UK",
            "106  ANNENBERG X (1ST SESSION)",
            "107  KECK - PM",
            "108  MARSHALL",
            "109  DORNSIFE - SPAN/PORT",
            "110  DORNSIFE - CHEMISTRY",
            "111  OVERSEAS - FUDAN",
            "112  OVERSEAS - UK",
            "113  MARSHALL - GSBA",
            "114  OVERSEAS - BELGIUM",
            "115  KECK- DENMARK",
            "116  EDUC",
            "117  KECK- PANAMA",
            "118  EDUC",
            "119  DORNSIFE - CHEMISTRY",
            "120  FINANCIAL AID CONSORTIUM",
            "121  KECK - GLOBAL MEDICINE",
            "122  LAW - SEMESTER ABROAD",
            "123  OVERSEAS - MARSHALL- SPAIN",
            "124  OVERSEAS - JORDAN",
            "125  OVERSEAS - MARSHALL - MADRID",
            "126  OVERSEAS - HUNGARY",
            "127  OVERSEAS - LAW - ITALY",
            "128  OVERSEAS - ISRAEL",
            "129  OVERSEAS - MEXICO",
            "130  OVERSEAS - UK",
            "131  DORNSIFE - BISC",
            "132  OVERSEAS - UK",
            "133  MARSHALL - GSBA",
            "134  KECK - GLOBAL MEDICINE",
            "135  OVERSEAS - MARSHAL - KOREA",
            "136  KECK - GLOBAL MEDICINE",
            "137  GERO - MAYMESTER",
            "138  ANNENBERG - JOUR",
            "139  OVERSEAS - MARSHALL - FINLAND",
            "140  OVERSEAS - MARSHALL - FRANCE",
            "141  OVERSEAS - THAILAND",
            "142  OVERSEAS - THAILAND",
            "143  SOWK",
            "144  THE GRADUATE SCHOOL",
            "145  PHAR",
            "146  OVERSEAS - MARSHALL - CHINA",
            "147  PHAR",
            "148  ROSKI - FA",
            "149  OVERSEAS - JAPAN",
            "150  OVERSEAS - UK",
            "151  OVERSEAS - JAPAN",
            "152  OVERSEAS - GERMANY",
            "153  MARSHALL - GSBA",
            "154  ENGR - ITP",
            "155  DORNSIFE - AMST",
            "156  MARSHALL - GSBA",
            "157  OVERSEAS - JAPAN",
            "158  OVERSEAS - MARSHALL - SINGAPORE",
            "159  OVERSEAS - PORTUGAL",
            "160  DENT - OT",
            "161  OVERSEAS - MARSHALL - AUSTRIA",
            "162  ENGR",
            "163  DORNSIFE - ENGL",
            "164  OVERSEAS - MARSHALL - FINLAND",
            "165  OVERSEAS - MARSHALL - FRANCE",
            "166  ANNENBERG - JOUR",
            "167  OVERSEAS - FINLAND - SIBELIUS ACADEMY",
            "168  OVERSEAS - MARSHALL - HONG KONG",
            "169  ANNENBERG - JOUR",
            "170  LAW",
            "171  PHAR",
            "172  OVERSEAS - AMSTERDAM",
            "173  OVERSEAS - UK",
            "174  DORNSIFE - IR",
            "175  MARSHALL - GSBA",
            "176  DORNSIFE - HISTORY",
            "177  MUSIC",
            "178  DORNSIFE - GEOL",
            "179  ENGR",
            "180  KECK- NEPAL",
            "181  DORNSIFE - CHEM",
            "182  DORNSIFE - AMST",
            "183  THE GRADUATE SCHOOL",
            "184  ENGR",
            "185  DORNSIFE - MAYMESTER",
            "186  SOWK",
            "187  OVERSEAS - UK",
            "188  OVERSEAS - DORNSIFE - WASHINGTON DC",
            "189  KECK - PCPA",
            "190  ENGR",
            "191  CINEMATIC ARTS",
            "192  OVERSEAS - LAW - UK",
            "193  DORNSIFE - LBST",
            "194  CINEMATIC ARTS",
            "195  DORNSIFE - BISC - OXFORD, ENGLAND",
            "196  DENT - PEDO",
            "197  MARSHALL - GSBA",
            "198  MARSHALL - GSBA",
            "199  PROVOST - INTERNATIONAL ACADEMY",
            "200  OVERSEAS - ARGENTINA",
            "201  HONG KONG - CHINA - CUHK SEMESTER",
            "202  OVERSEAS - EGYPT",
            "203  OVERSEAS - ITALY",
            "204  LAW",
            "205  KECK- INDIA",
            "206  DENT - OT",
            "207  ANNENBERG - JOUR",
            "208  OVERSEAS - GHANA",
            "209  OVERSEAS - JAPAN",
            "210  OVERSEAS - SINGAPORE",
            "211  ARCH - ONLINE",
            "212  DENT - ADVANCED CERTIFICATE PROGRAM",
            "213  MUSIC",
            "214  OVERSEAS - LAW - AUSTRALIA",
            "215  DENT - OT",
            "216  OVERSEAS - NEW ZEALAND",
            "217  OVERSEAS - NEW ZEALAND",
            "218  OVERSEAS - AUSTRALIA",
            "219  OVERSEAS - AUSTRALIA",
            "220  MARSHALL - GSBA",
            "221  PHAR",
            "222  OVERSEAS - CZECH PRAGUE",
            "223  DORNSIFE - ENGL",
            "224  KECK - PM",
            "225  KECK - PM",
            "226  ANNENBERG - JOUR",
            "227  OVERSEAS - ISRAEL",
            "228  OVERSEAS - ISRAEL",
            "229  OVERSEAS - JAPAN",
            "230  OVERSEAS - EALC",
            "231  LAW",
            "232  OVERSEAS - MADRID",
            "233  PHAR",
            "234  DORNSIFE - EASC",
            "235  OVERSEAS - JAPAN",
            "236  DORNSIFE - IR",
            "237  ENGR - CE",
            "238  DORNSIFE - SLL",
            "239  DORNSIFE - MPW",
            "240  DORNSIFE - MPW",
            "241  OVERSEAS - NEW ZEALAND",
            "242  DORNSIFE - MPW",
            "243  OVERSEAS - CHINA",
            "244  OVERSEAS - MARSHALL - KOREA",
            "245  OVERSEAS - MARSHALL - BARCELONA",
            "246  OVERSEAS - MARSHALL - FRANCE",
            "247  OVERSEAS - NETHERLAND - ROTTERDAM",
            "248  MARSHALL - GSBA",
            "249  OVERSEAS - AUSTRALIA",
            "250  OVERSEAS - AUSTRALIA",
            "251  OVERSEAS- CHINA",
            "252  OVERSEAS - MARSHALL - ISRAEL",
            "253  ENGR- DEN",
            "254  DORNSIFE - RELIGION",
            "255  ARCH",
            "256  OVERSEAS - GERMANY - WHU OTTO BEISHEIM",
            "257  OVERSEAS - UK - LONDON",
            "258  ARCH",
            "259  DENT - OT",
            "260  OVERSEAS - UK - BADA SEMESTER",
            "261  CONTINUING EDUCATION SUMMER SEMINAR",
            "262  DORNSIFE - SWMS - MAYMESTER",
            "263  ARCH",
            "264  DORNSIFE - ALI",
            "265  DORNSIFE - ALI",
            "266  DORNSIFE - ALI",
            "267  DORNSIFE - BISC - CATALINA ISLAND",
            "268  DORNSIFE - BISC - CATALINA ISLAND",
            "269  DORNSIFE - ANTH",
            "270  ENGR - EE - 11 WEEK SESSION",
            "271  LAW",
            "272  DORNSIFE - MAYMESTER",
            "273  DENT - OT",
            "274  SOWK",
            "275  LAW",
            "276  KECK - PREVENTIVE MEDICINE",
            "277  MARSHALL - GSBA",
            "278  OVERSEAS - SINGAPORE",
            "279  ANNENBERG - CMGT / LSE PROGRAM",
            "280  ENGR - DEN",
            "281  LAW",
            "282  MARSHALL - EMBA",
            "283  LAW",
            "284  MARSHALL - SOCIAL ENTREPRENEURSHIP PROGRAM",
            "285  CINEMATIC ARTS - CTPR",
            "286  CINEMATIC ARTS - CTPR",
            "287  CINEMATIC ARTS - CTPR",
            "288  CINEMATIC ARTS - CTPR",
            "289  MARSHALL - EMBA",
            "290  MARSHALL - GSBA",
            "291  MARSHALL - GSBA",
            "292  ENGR - ITP",
            "293  CINEMATIC ARTS - CTPR",
            "294  MARSHALL - OVERSEAS - CHILE",
            "295  OVERSEAS - JAPAN",
            "296  MARSHALL - BUAD",
            "297  MARSHALL - BUAD - LOS ANGELES",
            "298  DORNSIFE - IR",
            "299  ENGR",
            "300  EDUC - ORANGE COUNTY",
            "301  EDUC - ORANGE COUNTY",
            "302  OVERSEAS - CZECH - PRAGUE",
            "303  LAW",
            "304  THTR - ACTING SUMMER INSTITUTE",
            "305  EDUC - FRESNO",
            "306  EDUC - GRADUATE CENTERS PROGRAM",
            "307  LAW",
            "308  EDUC - HICKAM",
            "309  EDUC",
            "310  DENT - GDEN",
            "311  DORNSIFE - IR",
            "312  MARSHALL - GSBA",
            "313  MARSHALL - GSBA",
            "314  OVERSEAS - SHANGHAI",
            "315  DENT - GDEN",
            "316  OVERSEAS - IRELAND - GALWAY NUY SCIENCE",
            "317  EDUC - HAWAII",
            "318  DENT - 2ND YEAR OPERATIVE DENT",
            "319  EDUC - ORANGE COUNTY",
            "320  EDUC - HAWAII",
            "321  EDUC - HICKAM",
            "322  EDUC - HICKAM",
            "323  EDUC - HICKAM",
            "324  DENT - 3RD YEAR OPERATIVE DENTISTRY",
            "325  EDUC",
            "326  OVERSEAS - JAPAN - NANZAN SEMESTER",
            "327  OVERSEAS - SPAIN - BOSTON UNIVERSITY OF MADRID YEAR",
            "328  EDUC",
            "329  EDUC",
            "330  MARSHALL - GSBA",
            "331  LAW",
            "332  DORNSIFE - EALC - BEIJING SUMMER PROGRAM",
            "333  EDUC",
            "334  EDUC",
            "335  OVERSEAS - ARGENTINA - UNIVERSITY OF SAN ANDRES",
            "336  OVERSEAS - GERMANY - BERLIN IES YEAR",
            "337  OVERSEAS - GERMANY - DRESDEN BU YEAR",
            "338  EDUC - ORANGE COUNTY",
            "339  ANNENBERG - PD",
            "340  EDUC",
            "341  DENT- 1ST YEAR - OROFACIAL PAIN",
            "342  EDUC",
            "343  EDUC",
            "344  KECK - PM",
            "345  EDUC",
            "346  EDUC",
            "347  EDUC",
            "348  EDUC",
            "349  DORNSIFE - ANTH",
            "350  MARSHALL - GSBA",
            "351  LAW",
            "352  EDUC - HONG KONG",
            "353  SOWK - ONLINE",
            "354  DORNSIFE - SSCI",
            "355  EDUC",
            "356  OVERSEAS - ITALY - FLORENCE, SYRACUSE UNIVERSITY",
            "357  OVERSEAS - AUSTRALIA",
            "358  EDUC",
            "359  EDUC - LA CENTER",
            "360  EDUC - LA CENTER",
            "361  EDUC - LA CENTER",
            "362  DORNSIFE - MPW",
            "363  EDUC",
            "364  EDUC",
            "365  EDUC - ORANGE COUNTY",
            "366  DENT - INCOMING OROFACIAL PAIN",
            "367  DENT - 2ND YEAR OROFACIAL PAIN",
            "368  DENT - INCOMING ORAL MEDICINE",
            "369  DENT - 1ST YEAR ORAL MEDICINE",
            "370  DENT - 2ND YEAR ORAL MEDICINE",
            "371  DORNSIFE - COLT",
            "372  MARSHALL - GSBA - ONLINE PROGRAM",
            "373  MUSIC",
            "374  SOWK",
            "375  ENGR - ISE",
            "376  DENT - OT",
            "377  CINEMATIC ARTS - CTINI",
            "378  MARSHALL - ONLINE",
            "379  EDUC - ORANGE COUNTY",
            "380  MUSIC",
            "381  CINEMATIC ARTS - CTIN",
            "382  EDUC",
            "383  EDUC",
            "384  EDUC",
            "385  KECK - ACMD",
            "386  EDUC - EDPT",
            "387  ENGR",
            "388  DENT - INCOMING OPERATIVE DENTISTRY",
            "389  OVERSEAS - SOUTH KOREA",
            "390  MARSHALL - MLIS",
            "391  PHAR",
            "392  OVERSEAS - NEW ZEALAND - AUCKLAND",
            "393  DORNSIFE - PSYC - ONLINE PROGRAM",
            "394  DENT - MASTERS DEGREE IN DENTAL HYGIENE",
            "395  DORNSIFE - SSCI",
            "396  EDUC",
            "397  DORNSIFE - WRIT",
            "398  DENT - OFPM",
            "399  OVERSEAS - JAPAN - SEMESTER IN TOKYO",
            "400  DORNSIFE - SOCI",
            "401  THE GRADUATE SCHOOL",
            "402  DORNSIFE - MATH",
            "403  KECK - SCRM",
            "404  DENT - OT",
            "405  DORNSIFE - AHIS",
            "406  MARSHALL - MASTER OF BUSINESS FOR VETERANS",
            "407  KECK - PREVENTIVE MEDICINE",
            "408  KECK - PREVENTIVE MEDICINE",
            "409  OVERSEAS - JAPAN - NANZAN SEMESTER",
            "410  OVERSEAS - UK - ENGLAND UNIVERSITY EAST ANG",
            "411  MARSHALL - GSBA",
            "412  OVERSEAS - AUSTRIA - VIENNA",
            "413  MARSHALL- GSBA",
            "414  PHAR - MPTX",
            "415  MARSHALL - GSBA",
            "416  DORNSIFE - PHIL",
            "417  CINEMATIC ARTS - SUMMER PROGRAM",
            "418  MARSHALL - GSBA",
            "419  MARSHALL - GSBA",
            "420  ANSC - JOUR",
            "421  DORNSIFE - EALC - KOREAN PROGRAM",
            "422  DORNSIFE - EALC - BEIJING PROGRAM",
            "423  LAW - FRANCE",
            "424  DORNSIFE - AMST - MAYMESTER",
            "425  OVERSEAS - AUSTRIA - VIENNA Wirtschafts Universitat",
            "426  LAW",
            "427  MARSHALL - GSBA",
            "428  KECK - PM",
            "429  DORNSIFE - POSC - WASHINGTON DC",
            "430  ARCH",
            "431  MARSHALL - GSBA",
            "432  DENT - CERTIFICATE GDEN FINAL",
            "433  DORNSIFE - SPANISH - ONLINE PROGRAM",
            "434  KECK - ANST",
            "435  CINEMATIC ARTS",
            "436  PHAR",
            "437  PHAR",
            "438  OVERSEAS - SPAIN - CIEE ALICANTE",
            "439  OVERSEAS  - SPAIN UNIVERSITY OF M.Y.P.",
            "440  DENT - PT",
            "441  MARSHALL - GSBA",
            "442  MARSHALL - GSBA",
            "443  OVERSEAS - CZECH - PRAGUE",
            "444  OVERSEAS - CHILE - SANTIAGO",
            "445  LAW",
            "446  OVERSEAS - AUSTRALIA - BRISBANE UQ",
            "447  DORNSIFE - IR",
            "448  MUSIC",
            "449  MARSHALL - GSBA",
            "450  ENGR",
            "451  OVERSEAS - SPAIN - MADRID - IES",
            "452  DENT - OT",
            "453  OVERSEAS - AUSTRALIA - UNIVERSITY OF MELBOURNE",
            "454  OVERSEAS - FRANCE - PARIS - GROUPE HEC-ISA",
            "455  MARSHALL - GERMANY - BUAD",
            "456  OVERSEAS - HONG KONG - UNIVERSITY OF SCIENCE AND TECH",
            "457  DORNSIFE - MDA",
            "458  OVERSEAS - PHILIPPINES - ASIAN INSTITUTE OF MANAGEMENT",
            "459  MARSHALL - SINGAPORE - UNIVERSITY OF SINGAPORE",
            "460  MARSHALL - TAIWAN - BUSINESS ADMINISTRATION",
            "461  MARSHALL - THAILAND - BUSINESS ADMINISTRATION",
            "462  MARSHALL - UK - MANCHESTER  - BUSINESS ADMINISTRATION",
            "463  MARSHALL - GSBA - JAPANESE EXECUTIVES",
            "464  OVERSEAS - GERMANY - BERLIN - IIE",
            "465  KECK - PM",
            "466  KECK - PM",
            "467  DORNSIFE - FREN",
            "468  DENT - OT",
            "469  DENT - OT",
            "470  GERONTOLOGY",
            "471  THE GRADUATE SCHOOL",
            "472  OVERSEAS - TAIWAN - CIEE",
            "473  KECK - GLOBAL MEDICINE",
            "474  DORNSIFE - IR",
            "475  OVERSEAS - CAMBRIDGE SUMMER PROGRAM",
            "476  MARSHALL - MOR",
            "477  FINANCIAL AID CONSORTIUM",
            "478  MARSHALL - SWITZERLAND PROGRAM",
            "479  OVERSEAS - BRAZIL - FUNDACAO GETULIO VARGAS",
            "480  PHAR",
            "481  OVERSEAS - FUDAN - CHINA P.R.C",
            "482  OVERSEAS - COSTA RICO",
            "483  OVERSEAS - COPENHAGEN - DENMARK",
            "484  DENT - OT",
            "485  DORNSIFE - ENGL",
            "486  OVERSEAS - SEOUL - KOREA",
            "487  CINEMATIC ARTS",
            "488  MARSHALL - OVERSEAS - INSTITUTO PANAMERICANO",
            "489  MARSHALL - OVERSEAS - ESCUELA SUPERIOR SPAIN",
            "490  OVERSEAS - SCOTLAND - EDINBURGH",
            "491  OVERSEAS - UNIVERSITY OF SEVILLE",
            "492  OVERSEAS - ISRAEL - TEL AVIV YEAR",
            "493  OVERSEAS - PEKING",
            "494  OVERSEAS - SPAIN - BOSTON YEAR",
            "495  OVERSEAS - SPAIN - CIEE U. OF SEV YEAR",
            "496  OVERSEAS - CHINA - NANJING",
            "497  DORNSIFE - WRIT",
            "498  DENT - OT",
            "499  KECK - ACMD",
            "500  PHAR",
            "501  PPD - WASHINGTON DC",
            "502  LAW",
            "503  LAW",
            "504  LAW",
            "505  LAW",
            "506  LAW",
            "507  LAW",
            "508  ROSKI - ACAD",
            "509  ENGR",
            "510  ENGR",
            "511  PPD - SACRAMENTO",
            "512  PPD - SACRAMENTO",
            "513  PPD - SACRAMENTO",
            "514  DORNSIFE - POIR",
            "515  PHAR",
            "516  PHAR",
            "517  PHAR",
            "518  PHAR",
            "519  PHAR",
            "520  PPD - HERTIE EXCHANGE PROGRAM",
            "521  PPD - PUAD AFFAIRS CTR WASHINGTON DC",
            "522  PHAR",
            "523  PPD",
            "524  PPD - DCI",
            "525  PPD - DCI",
            "526  PPD - DCI",
            "527  ENGR",
            "528  PPD - INTENSIVE SEMINAR",
            "529  LAW",
            "530  PPD - INTENSIVE SEMINAR",
            "531  PPD - MRED Program",
            "532  PPD",
            "533  PPD - INTENSIVE SEMINAR",
            "534  DORNSIFE - FREN",
            "535  PPD - INTENSIVE SEMINAR",
            "536  PPD - INTENSIVE SEMINAR",
            "537  PPD - INTENSIVE SEMINAR",
            "538  PPD - INTENSIVE SEMINAR",
            "539  EDUC - ONLINE",
            "540  PPD - INTENSIVE SEMINAR",
            "541  PPD - INTENSIVE SEMINAR",
            "542  PPD - INTENSIVE SEMINAR",
            "543  PPD - INTENSIVE SEMINAR",
            "544  PPD",
            "545  PPD - INTENSIVE SEMINAR",
            "546  PPD - INTENSIVE SEMINAR",
            "547  PPD - INTENSIVE SEMINAR",
            "548  PPD - MRED Program",
            "549  AVAILABLE",
            "550  PPD - INTENSIVE SEMINAR",
            "551  DORNSIFE - ITAL",
            "552  DORNSIFE - EASC",
            "553  DORNSIFE - CHEMISTRY",
            "554  ENGR - DEN Program",
            "555  LAW",
            "556  DORNSIFE - FREN",
            "557  KECK - PM",
            "558  ENGR",
            "559  GERONTOLOGY",
            "560  MARSHALL - GSBA",
            "561  ENGR - DEN",
            "562  DENT - 1ST YEAR GENERAL PRACTICE RESIDENCY",
            "563  PPD - SACRAMENTO",
            "564  PPD - SACRAMENTO",
            "565  PPD",
            "566  PHAR - PSCI",
            "567  CINEMATIC ARTS - CTPR",
            "568  PPD - OVERSEAS - RIO DE JANEIRO CIEE",
            "569  MARSHALL - BUAD",
            "570  OVERSEAS - MARSHALL",
            "571  MARSHALL- EUROPEAN BUSINESS SCHOOL",
            "572  PHAR",
            "573  LAW",
            "574  MARSHALL - GSBA",
            "575  OVERSEAS - IRELAND - DUBLIN EXCH SEMESTER",
            "576  OVERSEAS - YONSEI - U YEAR",
            "577  PHAR - PHRD",
            "578  OVERSEAS - NANZAN - JAPAN YEAR",
            "579  DENT - OT",
            "580  MARSHALL - GSBA",
            "581  MARSHALL - GSBA",
            "582  MARSHALL - GSBA",
            "583  CINEMATIC ARTS - ONLINE",
            "584  DORNSIFE - PHYS",
            "585  MARSHALL - GSBA",
            "586  ENGR",
            "587  OVERSEAS - MOROCCO - RABAT SEMESTER",
            "588  PPD",
            "589  ANNENBERG - OVERSEAS - RIO DE JANEIRO CIEE",
            "590  OVERSEAS - ISRAEL - JERUSALEM",
            "591  PPD - OVERSEAS - KOREA - YONSEI U. YEAR",
            "592  WASHINGTON - SEMESTER",
            "593  PPD",
            "594  EDUC",
            "595  PPD - INTENSIVE SEMINAR",
            "596  PPD - INTENSIVE SEMINAR",
            "597  PPD - INTENSIVE SEMINAR",
            "598  PPD - INTENSIVE SEMINAR",
            "599  ENGR - SUMMER PROGRAM IN EUROPE",
            "600  OVERSEAS - FRANCE",
            "601  OVERSEAS - ENGLAND",
            "602  OVERSEAS - GERMANY",
            "603  OVERSEAS - JAPAN",
            "604  MARSHALL - GSBA",
            "605  MARSHALL - GSBA",
            "606  MARSHALL - GSBA",
            "607  GERONTOLOGY - ONLINE",
            "608  KECK - PM",
            "609  GERONTOLOGY - MAYMESTER",
            "610  GERONTOLOGY",
            "611  UNIVERSITY OF ARTS LONDON",
            "612  OVERSEAS - MADRID - SPAIN",
            "613  OVERSEAS - PARIS - FRANCE",
            "614  OVERSEAS - TEL AVIV - ISRAEL",
            "615  OVERSEAS - FUDAN - CHINA",
            "616  OVERSEAS - WASEDA - JAPAN",
            "617  PROVOST - INTERNATIONAL ACADEMY",
            "618  ANSC - COMM - JOUR- MAYMESTER",
            "619  OVERSEAS - CHINA - BEIJING",
            "620  OVERSEAS - IRELAND - TRINITY COLLEGE",
            "621  GERONTOLOGY - MAYMESTER",
            "622  MUSIC",
            "623  ARCH",
            "624  PHAR",
            "625  SOWK",
            "626  PHAR - MPTX",
            "627  ANSC - NY - MAYMESTER",
            "628  MARSHALL - GSBA - EMBA",
            "629  MARSHALL - EMBA",
            "630  MARSHALL - GSBA",
            "631  MARSHALL - GSBA",
            "632  OVERSEAS - NANZAN UNIVERSITY - JAPAN",
            "633  OVERSEAS - ENGLAND - UNIVERSITY OF SUSSEX",
            "634  ENGR",
            "635  GERONTOLOGY",
            "636  ENGR - CSCI",
            "637  DENT - OFPM",
            "638  ROSKI - FA",
            "639  DORNSIFE - MDA",
            "640  MARSHALL - GSBA",
            "641  MARSHALL - GSBA",
            "642  DORNSIFE - NSCI",
            "643  DORNSIFE - NSCI",
            "644  ACAD",
            "645  OVERSEAS - FRANCE - SWEET BRIAR COLLEGE",
            "646  MARSHALL- GSBA",
            "647  HUC",
            "648  ACAD",
            "649  KECK - PM",
            "650  OVERSEAS - GERMANY - UNIVERSITY OF FREIBURG",
            "651  KECK - GLOBAL MEDICINE",
            "652  OVERSEAS - ENGLAND - UNIVERSITY OF KENT",
            "653  OVERSEAS - JAPAN - UNIVERSITY OF WASEDA",
            "654  Howard University - Washington D.C. (Exchange Program)",
            "655  OVERSEAS - ISRAEL - HEBREW UNIVERSITY",
            "656  OVERSEAS YEAR - SPAIN",
            "657  OVERSEAS - AUSTRALIA - NATIONAL UNIVERSITY - CANBERRA",
            "658  OVERSEAS - AFRICA - KENYA COASTAL",
            "659  OVERSEAS - AFRICA - ZIMBABWE",
            "660  DORNSIFE - HISTORY",
            "661  ARCH",
            "662  Semester in Africa - Kenya (Inland)",
            "663  EDUC",
            "664  DORNSIFE - PHIL",
            "665  DORNSIFE - PHIL",
            "666  ENGR",
            "667  MARSHALL - GSBA",
            "668  MARSHALL - GSBA",
            "669  MARSHALL - GSBA",
            "670  ANSC - COMM - JOUR - MAYMESTER",
            "671  Semester in USSR - Leningrad State U.",
            "672  Semester in Florence - Italy",
            "673  MARSHALL - SYDNEY - AUSTRALIA",
            "674  ENGR - CSCI",
            "675  SOWK",
            "676  International Summer Session",
            "677  International Summer Session",
            "678  PROVOST - INTERNATIONAL ACADEMY",
            "679  PHAR - MPTX",
            "680  ENGR",
            "681  DORNSIFE - THEMATIC OPTION",
            "682  Fudan Semester, China",
            "683  CORE- Thematic Option",
            "684  DORNSIFE - SOCI",
            "685  CINEMATIC ARTS - SUMMER",
            "686  MARSHALL - GSBA",
            "687  CINEMATIC ARTS - SUMMER",
            "688  CINEMATIC ARTS - SUMMER",
            "689  CINEMATIC ARTS - SUMMER",
            "690  ENGR",
            "691  ENGR",
            "692  PHAR- MPTX",
            "693  MARSHALL - MEDICAL MANAGEMENT (MMM)",
            "694  MARSHALL - MEDICAL MANAGEMENT (MMM)",
            "695  PHAR - MPTX",
            "696  MARSHALL - MEDICAL MANAGEMENT (MMM)",
            "697  MARSHALL - MEDICAL MANAGEMENT (MMM)",
            "698  Semester in Europe",
            "699  Hebrew University - Israel",
            "700  DENT - OT",
            "701  MARSHALL - GSBA",
            "702  China: Shanghai Semester",
            "703  GERO",
            "704  DORNSIFE - SPAN",
            "705  DORNSIFE - SSCI",
            "706  MARSHALL - WASADA UNIVERSITY",
            "707  BUAD OVERSEAS HONG KONG",
            "708  DORNSIFE - FSEM",
            "709  DORNSIFE - CLAS - ITALY",
            "710  OVERSEAS - UK - WALES",
            "711  MARSHALL - GSBA",
            "712  National University of Singapore",
            "713  DORNSIFE - SPAN",
            "714  ANSC - JOUR",
            "715  DENT - First Year Operative Dentistry",
            "716  DORNSIFE - FREN",
            "717  ENGR - OVERSEAS",
            "718  Brazil: S. Paulo Year",
            "719  India: Delhi IES Sem",
            "720  Italy: Florence SACI Sem",
            "721  Jordan: Amman CIEE Sem",
            "722  ARCH",
            "723  UK: King's Sciences Semester",
            "724  UK: UCL Arts Semester",
            "725  Outbound Brazil/ FGV/ Law",
            "726  Queens' College Cambridge",
            "727  ARCH",
            "728  LAW",
            "729  ENGR - Exchange Program",
            "730  UK: King's Pre-Med Semester",
            "731  ARCH",
            "732  ARCH",
            "733  Pembroke College Program",
            "734  MUSIC",
            "735  SOWK",
            "736  MARSHALL - GSBA",
            "737  MARSHALL - OVERSEAS - BUDAPEST",
            "738  Netherlands: Maastricht U. semester",
            "739  DENT - GENERAL PRACTICE RESIDENCY",
            "740  MARSHALL - IBEAR",
            "741  DORNSIFE - GEOG",
            "742  MARSHALL - GSBA",
            "743  MARSHALL - GSBA",
            "744  MARSHALL - GSBA",
            "745  MARSHALL - GSBA",
            "746  GERO",
            "747  MARSHALL - GSBA",
            "748  ANSC - PUBD",
            "749  UK: King's Arts & Sci Combo Semester",
            "750  DORNSIFE - IR",
            "751  MARSHALL - GSBA",
            "752  MARSHALL - GSBA",
            "754  MARSHALL - GSBA",
            "755  MARSHALL - GSBA",
            "756  DENT - PT",
            "757  ANSC - JOUR",
            "758  DORNSIFE - IR",
            "759  Fudan University, School of Management",
            "760  DORNSIFE - MDA",
            "761  DORNSIFE - ANTH",
            "762  GERO",
            "763  DENT",
            "764  DORNSIFE - WRITING PROGRAM - HAITI",
            "765  DORNSIFE - ECON",
            "766  DORNSIFE - EALC",
            "767  PHAR",
            "768  DENT - OT",
            "769  DENT - AEGD First Year",
            "770  ANSC - JOUR",
            "771  DORNSIFE - SLL",
            "772  New Zealand: U. of Auckland Semester",
            "773  ANSC - JOUR",
            "774  PHAR",
            "775  CINEMATIC ARTS - GRADUATE PROGRAMS",
            "776  EDUC",
            "777  DORNSIFE - ANTH",
            "778  MARSHALL - GSBA",
            "779  SFFS: SoCaicos Island BWI",
            "780  MARSHALL - GSBA",
            "781  MARSHALL - GSBA",
            "782  MARSHALL - GSBA",
            "783  DENT - OFPM",
            "784  University of Amsterdam (Netherlands)",
            "785  PPD",
            "786  PPD",
            "787  Fundacao Getulio Vargas Law School",
            "788  MARSHALL - COPENHAGEN",
            "789  MARSHALL - AUSTRALIA",
            "790  PPD",
            "791  PPD",
            "792  DORNSIFE - MPW",
            "793  Brazil: CIEE Bahia",
            "794  DENT - PT",
            "795  DENT - PT",
            "796  France: Sciences Po",
            "797  Japan: Wasada (3 Months)",
            "798  UK: Ireland-Galway Arts",
            "799  PHAR",
            "800  KECK - GLOBAL MEDICINE",
            "801  Botswana: Gaborone, CIEE sem",
            "802  DORNSIFE - PHED",
            "803  DORNSIFE - GEOL",
            "804  Germany: Dresden, BU semester",
            "805  MARSHALL - HKUST",
            "806  EDUC",
            "807  ENGR",
            "808  PROVOST - INTERNATIONAL ACADEMY",
            "809  So. Africa, Durban, SIT sem",
            "810  PROVOST - INTERNATIONAL ACADEMY",
            "811  SWMS - MAYMESTER",
            "812  WHU Koblenz",
            "813  MARSHALL - GSBA",
            "814  Brazil: Bahia Year",
            "815  UCLA - USC Cross Enrollment",
            "816  DORNSIFE - PSYC",
            "817  China: Nanjing Year",
            "818  PHAR - MPTX",
            "819  MARSHALL - BOCCONI",
            "820  PPD - HEALTH PROGRAMS",
            "821  So. Africa: CIEE",
            "822  Taiwan: CIEE Year",
            "823  UK: England London Queen Mary",
            "824  UK: Engl. Sem.London Queen Mary",
            "825  PHAR - MPTX",
            "826  PPD - HEALTH PROGRAMS",
            "827  Germany: Berlin IES year",
            "828  MARSHALL WBB PROGRAM HONG KONG UNIVERSITY",
            "829  DORNSIFE - ENST",
            "830  DORNSIFE - EALC",
            "831  Netherlands: CIEE Amsterdam Year-Long",
            "832  DORNSIFE - SPAN",
            "833  MARSHALL - GSBA",
            "834  MARSHALL - GSBA",
            "835  SOWK",
            "836  DORNSIFE - PHIL",
            "837  DORNSIFE - ENST",
            "838  Austia: Vienna, IES",
            "839  EDUC Honolulu",
            "840  PHAR - MPTX",
            "841  ENST",
            "842  SOWK",
            "843  DORNSIFE - BISC - CATALINA",
            "844  Ireland; Dublin Semester",
            "845  Turkey: Bogazici",
            "846  ENST",
            "847  Overseas Studies: E. Asia",
            "848  DENT - Incoming AEGD & OFPM",
            "849  St. Mary's College, England",
            "850  ARCH",
            "851  DORNSIFE - FREN",
            "852  PHAR - MPTX",
            "853  DENT - (ASPID)",
            "854  CINEMATIC ARTS",
            "855  UK: Edin Arts Intership",
            "856  DORNSIFE - ANTH",
            "857  BKN/PT",
            "858  LAW: Consortium Agreement",
            "859  DORNSIFE - PHED",
            "860  ARCH",
            "861  ARCH",
            "862  DENT - Orofacial Pain and Oral Medicine",
            "863  CINEMA - TV",
            "864  MARSHALL - GSBA",
            "865  MARSHALL - GSBA",
            "866  PHAR - MPTX",
            "867  ALI- HSC Program",
            "868  MARSHALL - GSBA",
            "869  MARSHALL - GSBA",
            "870  DORNSIFE - MDA",
            "871  KECK - GLOBAL MEDICINE",
            "872  KECK - GLOBAL MEDICINE",
            "873  UK: LONDON",
            "874  Egypt: Cairo",
            "875  Taiwan: CIEE Year",
            "876  Scotland: Edinburgh Science",
            "877  Taiwan: CIEE Year",
            "878  Scotland: Eidenburg Sem Sci",
            "879  SFFS: Caicos Is.",
            "880  SFFS: Canada",
            "881  SFFS: Costa Rica",
            "882  SFFS: Kenya",
            "883  CINEMATIC ARTS",
            "884  KECK - PM",
            "885  KECK - PM",
            "886  MARSHALL - GSBA",
            "887  OVERSEAS - GREECE - ATHENS",
            "888  SFFS: Australia Queensland",
            "889  OVERSEAS - HONG KONG",
            "890  OVERSEAS - MARSHALL - SINGAPORE",
            "891  PHAR",
            "892  PHAR",
            "893  PHAR",
            "894  MARSHALL - BUAD",
            "895  Italy: Milan",
            "896  New Zealand: Univ. of Otago",
            "897  ENGR",
            "898  Italy: Cortona",
            "899  Ireland: Galway",
            "900  ENGR",
            "901  ENGR",
            "902  ENGR",
            "903  ENGR",
            "904  ENGR",
            "905  ENGR",
            "906  ENGR",
            "907  ENGR",
            "908  ENGR",
            "909  ENGR",
            "910  ENGR",
            "911  ENGR",
            "912  ENGR",
            "913  ENGR",
            "914  COMM",
            "915  ARCH",
            "916  ENGR",
            "917  ENGR",
            "918  MARSHALL - GSBA",
            "919  PPD",
            "920  ENGR - ISE",
            "921  CINEMATIC - ARTS",
            "922  CINEMATIC - ARTS",
            "923  BISC - CATALINA ISLAND",
            "924  BISC - CATALINA ISLAND",
            "925  ENGR",
            "926  LAW",
            "927  University of Kent Semester- England",
            "928  BUAD- High School Academy of Finance",
            "929  Italy: Florence Year",
            "930  MUSIC",
            "931  Australia: Brisbane Queen",
            "932  EDUC- ONLINE",
            "933  Spain: Bilbao",
            "934  MARHSHALL - GSBA",
            "935  HONG KONG - CHINA",
            "936  University of Manchester",
            "937  BISC- Catalina Island",
            "938  PHAR",
            "939  BUAD OVERSEAS ITALY",
            "940  MARSHALL - OVERSEAS",
            "941  LAW: Upper Division Session",
            "942  ENGR",
            "943  MARSHALL - GSBA",
            "944  UK: London School of Econ",
            "945  Australia: Brisbane Year",
            "946  Spain: Bilbao Year",
            "947  CINEMA - TV",
            "948  PHAR",
            "949  PHAR",
            "950  AnnenbergX (First Session)",
            "951  London School of Economics",
            "952  ENGR - DEN Program",
            "953  KECK - MED - DSR",
            "954  INTERNATIONAL ACADEMY",
            "955  JOUR",
            "956  PHIL",
            "957  BKN/PT",
            "958  UK; London Year",
            "959  DENT - OT",
            "960  LAW",
            "961  DORNSIFE - PHYS",
            "962  ENGR",
            "963  DENT - BKN - PT",
            "964  DENT - BKN - PT",
            "965  ENGR",
            "966  ENGR",
            "967  London",
            "968  LAW: LLM Program",
            "969  BKN/PT",
            "970  UK: England London- Kings College",
            "971  UK: England Univ of London Semester",
            "972  EDUC- ONLINE",
            "973  DORNSIFE - MDA",
            "974  DORNSIFE - AHIS",
            "975  DENT - AEGD Second Year",
            "976  SO.KOREA: SEOUL",
            "977  New Zealand: Otago Year",
            "978  Germany: Freigburg Year",
            "979  Italy: Milan Year",
            "980  OVERSEAS - Nicaragua",
            "981  BOVARD COLLEGE - HRM",
            "982  Hong Kong University- Law",
            "983  DENT - OT",
            "984  DENT - OT",
            "985  DENT - BKN - PT",
            "986  BKN/PT",
            "987  DENT - BKN - PT",
            "988  BOVARD COLLEGE - HRM",
            "989  DENT - Second Year OFPM & AEGD",
            "990  DENT - Advanced Final Year",
            "991  LAW: First Year Session",
            "992  LAW",
            "993  CIEE St.Peters Year",
            "994  So. Korea-Yonsei Year",
            "995  So. Africa, Cape Town CIEE Sem",
            "996  LAW: Master of Comparative Program",
            "997  PHAR",
            "998  PHAR",
            "999  DENT- OT"
    ];

    return sessCodes;

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

function GetCampusName(cCode, cLocations) {

    var campusName = "";

    for (var i = 0; i < cLocations.length; ++i) {
        if (cLocations[i].campusCode == cCode) {
            campusName = cLocations[i].campusName;
            break;
        }
    }
    return campusName;
}

adminModule.factory('GetCampusName',
    [
        "CampusLocations", function(CampusLocations){

            return function (campusCode) {
                return GetCampusName(campusCode, CampusLocations)
            }
        }
    ]
);

sessionModule.factory('GetCampusName',
    [
        "CampusLocations", function (CampusLocations) {

            return function (campusCode) {
                return GetCampusName(campusCode, CampusLocations)
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
"use strict";
sessionModule.controller("indexCtrl", ["$scope", "$q", function ($scope, $q) {
    var init = function () {
        $scope.notifyOptions = {
            autoHideAfter: 7000,
            templates: [{
                type: "error",
                template: $("#errorTemplate").html()
            },
            {
                type: "info",
                template: $("#infoTemplate").html()
            },
            {
                type: "warning",
                template: $("#warningTemplate").html()
            },
            {
                type: "success",
                template: $("#successTemplate").html()
            }
            ]
        };


        $scope.showNotification = function(type, message) {
            $scope.winNotification.show({
                    title: type.charAt(0).toUpperCase() + type.slice(1),
                    message: message
                },
                type);
        };

    };

    init();
}]);
"use strict";

sessionModule.controller("sessionRequestCtrl",

        ["RateTable", "Sessions", "Get001Dates", "SessionCodes", "CampusLocations", "SemStartDates", "$scope", "$http", "$location", "$rootScope",

    function (RateTable, Sessions, Get001Dates, SessionCodes, CampusLocations, SemStartDates, $scope, $http, $location, $rootScope) {

        $scope.AddSemesterBreaks = function () {                    // Add Semester Break functionality

            var semBreak = { startDate: "", endDate: "" };

            if ($scope.session.sessionBreaks.length == 2){
                alert("A maximum of 2 semester breaks are allowed per session.");
            } else {
                $scope.session.sessionBreaks.push(semBreak);
            }
            return;
        }   // AddSemesterBreaks()

        Date.dateDiff = function (datepart, fromdate, todate) {     // datepart: 'y', 'm', 'w', 'd', 'h', 'm', 's'
            datepart = datepart.toLowerCase();
            var diff = todate - fromdate;
            var divideBy = {
                w: 604800000,                                       // weeks
                d: 86400000,                                        // days
                h: 3600000,                                         // hours
                m: 60000,                                           // minutes
                s: 1000                                             // seconds
            };

            return Math.floor(diff / divideBy[datepart]);
        }   // Date.dateDiff


        function AdjustDate(newDate)                                // Computes a new date incrementing the day if it falls on a weekend or a holiday.
        {
            var newDtmonthDay = '';

            do {
                switch (newDate.getDay()) {
                    case 0:                                         // if the computed day falls on a Sunday
                        newDate.setDate(newDate.getDate() + 1);     // add a day to make it a Monday
                        break;
                    case 6:                                         // Saturday
                        newDate.setDate(newDate.getDate() + 2);     // add 2 days to make it a Monday
                        break;
                    default:
                        break;
                }   // switch()

                newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();

                if (holidays.indexOf(newDtmonthDay) > -1) {         // if the new date falls on a holiday, add a day
                    newDate.setDate(newDate.getDate() + 1);
                    newDtmonthDay = newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
                }
            }                                                       // keep checking until the computed day is not a weekend nor a holiday
            while ((newDate.getDay() == 0) || (newDate.getDay() == 6) || (holidays.indexOf(newDtmonthDay) > -1));
            return newDate;
        }       // AdjustDate()


        function ComputeDate(startDate, endDate, percentAdd) {      //  1) Calculates computed dates given the:
                                                                    //      a) start date
                                                                    //      b) end date
                                                                    //      c) percentage number of days to be added to the start date
                                                                    //  2) If the new date falls on a weekend, or a holiday:
                                                                    //      - move it to the next school day      
            var totalDays = Date.dateDiff('d', startDate, endDate) + 1;
            var daysToAdd = Math.round(totalDays * (percentAdd/100));   // days to add based on the percentage (percentAdd) provided
            var initialDate = new Date(startDate);

            initialDate.setDate(startDate.getDate() + daysToAdd - 1);
            var adjustedDate =  AdjustDate(initialDate);

            if (adjustedDate > endDate) {                           // if computed new date is beyond the Last Day of classes,
                adjustedDate = endDate;                             //  make it equal to the last day of classes.
            }
            
            return ((adjustedDate.getMonth() + 1) + '/' + adjustedDate.getDate() + '/' + adjustedDate.getFullYear());
        }   // ComputeDate()


        function convDateToString(givenDate) {

            var dateString = "";

            if (givenDate) {
                var newDate = new Date(givenDate.trim());
                dateString = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            }
            return dateString;
        }   // convDateToString()


        $scope.ClassDatesChanged = function () {                    // Validate the Class Start and End dates

            $scope.classStartDt = new Date($scope.session.firstDayOfClass);

            if ($scope.session.firstDayOfClass > '') {
                $scope.classEndOptions = { min: $scope.classStartDt };
            }

            $scope.classEndDt = new Date($scope.session.lastDayOfClass);

            if ($scope.session.lastDayOfClass > '') {
                $scope.finalsStartOptions = { min: $scope.classEndDt };
            }

            if (($scope.session.firstDayOfClass > '') && ($scope.session.lastDayOfClass > '')) {    // First Day and Last Day of Class entered?

                if (($scope.sess001Dates.firstDayOfClass > '') && ($scope.sess001Dates.lastDayOfClass > '')){        // Session 001 dates exists for semester
                
                    var stdStartDate = new Date($scope.sess001Dates.firstDayOfClass);
                    var stdEndDate = new Date($scope.sess001Dates.lastDayOfClass);
                                                                                                    // if class start and end dates match Session 001 dates
                    if (($scope.classStartDt.toDateString() == stdStartDate.toDateString()) && ($scope.classEndDt.toDateString() == stdEndDate.toDateString())) {

                        $scope.session.lastDayForAddDrop = $scope.sess001Dates.lastDayForAddDrop;
                        $scope.session.lastDayForEnrollmentOptionChange = $scope.sess001Dates.lastDayForEnrollmentOptionChange;
                        $scope.session.lastDayForWithdrawal = $scope.sess001Dates.lastDayForWithdrawal;
                        $scope.session.firstDayOfFinals = $scope.sess001Dates.firstDayOfFinals;
                        $scope.session.lastDayOfFinals = $scope.sess001Dates.lastDayOfFinals;
                        $scope.FinalsDatesChanged();

                    } else {                                                                        // if the Class start and end dates don't match, compute the dates.
                        ComputeDates($scope.classStartDt, $scope.classEndDt);
                    }
                } else {                                                                            // If there are no 001 dates, compute the dates
                    ComputeDates($scope.classStartDt, $scope.classEndDt);
                }
            }   // if (($scope...
            return null;
        }       // ClassDateChanged()


        function ComputeDates(beginDate, endDate) {

            $scope.session.lastDayForAddDrop = ComputeDate(beginDate, endDate, 20);                 // Last day to Add/Drop (20%)
            $scope.session.lastDayForEnrollmentOptionChange = ComputeDate(beginDate, endDate, 40);  // Last day to Change Enrollment Options (40%)
            $scope.session.lastDayForWithdrawal = ComputeDate(beginDate, endDate, 80);              // Last Day to Withdraw (80%)
            return;
        }   // ComputeDates()


        $scope.FinalsDatesChanged = function (){

            $scope.finalsStartDt = new Date($scope.session.firstDayOfFinals);

            if ($scope.session.firstDayOfFinals > '') {
                $scope.finalsEndOptions = { min: $scope.finalsStartDt };
            }

            $scope.finalsEndDt = new Date($scope.session.lastDayOfFinals);

            if (($scope.session.firstDayOfFinals > '') && ($scope.session.lastDayOfFinals > '')) {

                                                            // Compute Final Grading Period
                                                            // First Day of Grading = First Day of Finals
                $scope.session.firstDayForFinalGrading = ($scope.finalsStartDt.getMonth() + 1) + '/' + $scope.finalsStartDt.getDate() + '/' + $scope.finalsStartDt.getFullYear();

                var initialLastDay = new Date($scope.finalsEndDt);
                var notaSchoolDay = false, newDateStr = "";

                for (var i = 0; i < 4; ++i) {

                    notaSchoolDay = false;

                    do {                                    // keep incrementing the date by a day until a school day is found.

                        initialLastDay.setDate(initialLastDay.getDate() + 1);
                        newDateStr = initialLastDay.getMonth() + 1 + '/' + initialLastDay.getDate() + '/' + initialLastDay.getFullYear();

                        if ((initialLastDay.getDay() == 0) || (initialLastDay.getDay() == 6) || (holidays.indexOf(newDateStr) > -1))
                            notaSchoolDay = true;
                        else
                            notaSchoolDay = false;

                    } while(notaSchoolDay) 

                }   // for(var i...)

                var lastDayGradingDt = initialLastDay;
                $scope.session.lastDayForFinalGrading = (lastDayGradingDt.getMonth() + 1) + '/' + lastDayGradingDt.getDate() + '/' + lastDayGradingDt.getFullYear();
            }   // if (($scope...
        }   // FinalsDatesChanged()

            // Add a Section functionality
        $scope.AddSection = function () {

            var section = {
                sectionNumber:  "",
                prefix:         "",
                title:          "",
                courseNumber:   "",
                unitValue:      0,
                instructorName: "",
                estimatedEnrollment: 0,
                incomeAccountNumber: "",
                comments:       "",
                schedules:      []
            };

            $scope.session.sections.push(section);
            return;
        }

        $scope.AddSchedule = function (thisSection) {           // Adding a Class Schedule functionality

            var sched = { classDayOfWeek: "", classStartTime: "", classEndTime: "" };

            thisSection.schedules.push(sched);
            return;
        }

        $scope.GetDatesAndRates = function () {

            Get001Dates.get(
                { semester: $scope.session.academicTerm },
                function (data) {

                    if (data.classBeginDate == undefined) {

                        alert("No Session 001 dates found for semester " + $scope.session.academicTerm);

                    } else {

                        $scope.sess001Dates.firstDayOfClass     = convDateToString(data.classBeginDate);
                        $scope.sess001Dates.lastDayOfClass      = convDateToString(data.classEndDate);
                        $scope.sess001Dates.lastDayForAddDrop   = convDateToString(data.lastAddDropDate);
                        $scope.sess001Dates.lastDayForWithdrawal= convDateToString(data.withdrawWithWDate);
                        $scope.sess001Dates.lastDayForEnrollmentOptionChange = convDateToString(data.lastEnrollmentOptionDate);
                        $scope.sess001Dates.sessBreak1Begin     = convDateToString(data.break1BeginDate);
                        $scope.sess001Dates.sessBreak1End       = convDateToString(data.break1EndDate);
                        $scope.sess001Dates.sessBreak2Begin     = convDateToString(data.break2BeginDate);
                        $scope.sess001Dates.sessBreak2End       = convDateToString(data.break2EndDate);
                        $scope.sess001Dates.firstDayOfFinals    = convDateToString(data.finalExamBeginDate);
                        $scope.sess001Dates.lastDayOfFinals     = convDateToString(data.finalExamEndDate);
                    }
                },
                function () {
                    console.log("No Session 001 dates found for semester " + $scope.session.academicTerm);
                    $scope.sess001Dates.firstDayOfClass         = "";
                    $scope.sess001Dates.lastDayOfClass          = "";
                    $scope.sess001Dates.lastDayForAddDrop       = "";
                    $scope.sess001Dates.lastDayForWithdrawal    = "";
                    $scope.sess001Dates.lastDayForEnrollmentOptionChange = "";
                    $scope.sess001Dates.firstDayForFinalGrading = "";
                    $scope.sess001Dates.lastDayForFinalGrading  = "";
                    $scope.sess001Dates.sessBreak1Begin         = "";
                    $scope.sess001Dates.sessBreak1End           = "";
                    $scope.sess001Dates.sessBreak2Begin         = "";
                    $scope.sess001Dates.sessBreak2End           = "";
                    $scope.sess001Dates.firstDayOfFinals        = "";
                    $scope.sess001Dates.lastDayOfFinals         = "";
                }
            );

            function selectTermRateType(rates, term) {
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

            $scope.rateTypes = selectTermRateType($scope.rates, $scope.session.academicTerm);

            $scope.rateTypes.push({
                rateCode: "OTH",
                rateName: "Other"
                });

            if ($scope.session.rateType > '')
                $scope.SetRates();

            return;
        }   // GetDatesAndRates()

        $scope.SetRates = function () {                     // setting the value of the Tuition per Unit and Flat Rate fields
            $scope.session.flatRateAmount = '';
            $scope.session.ratePerUnitAmount = '';

            if ($scope.session.academicTerm > '') {
                angular.forEach($scope.rates, function (value) {
                    if (value.term == $scope.session.academicTerm) {
                        angular.forEach(value.rateTypes, function (value) {
                            if (value.rateTypeCode == $scope.session.rateType) {
                                $scope.session.flatRateAmount = value.rateTypeFlatRate;
                                $scope.session.ratePerUnitAmount = value.rateTypeUnitRate;
                            }
                        })
                    }
                });
            }
            return;
        }   // SetRates()

        var holidays =[];

        function IsFormValid() {

            var formValid = true;

            var reqdFields = [
                $scope.session.academicTerm,            // Semester field
                $scope.sessCode.value(),                // Session code
                $scope.session.firstDayOfClass,         // First day of Classes
                $scope.session.lastDayOfClass,          // Last day of Classes
                $scope.session.firstDayOfFinals,        // First day of Finals
                $scope.session.lastDayOfFinals          // Last day of Finals
            ];

            for (var i = 0; i < reqdFields.length; ++i){
                if (reqdFields[i].length == 0) {
                    formValid = false; // test
                    break;
                }
            };

            if (formValid) {                            // Check Campus Location

                switch ($scope.session.isClassHeldAtUpc) {

                    case 'true':                        // Class held on campus.  Will not require the other Location fields.
                        break;

                    case 'false':                       // Would require at least one of the two other location fields.

                        $scope.requireUSCLoc = false;
                        $scope.requireOtherLoc = false;

                        if ($scope.session.uscCampusLocation == '') {

                            formValid = false;
                            $scope.requireUSCLoc = true;

                        } else {
                                                        // if "Other" campus location and Other campus location is blank
                            if (($scope.session.uscCampusLocation == 'OTH') && ($scope.session.otherCampusLocation == "")) {

                                formValid = false;
                                $scope.requireOtherLoc = true;
                            }
                        }
                        break;

                    default:                            // radio button unselected
                        formValid = false;
                        break;
                }   // switch()
            }   // if (formValid)

                // Check the rate fields
            if (formValid && ($scope.session.flatRateAmount > '')) {

                if (($scope.session.flatRateUnitsMin == '') || ($scope.session.flatRateUnitsMax == '')) {

                    $scope.requireUnitRange = true;
                    formValid = false;

                } else { // Range is specified but validate the values

                    if ($scope.session.flatRateUnitsMax <= $scope.session.flatRateUnitsMin) {

                        alert("The flat rate maximum units should be more than the minimum units.");
                        $scope.requireUnitRange = true;
                        formValid = false;
                    }
                }
            } // if (formValid...)
                                                        // check Session Breaks
            if (formValid && !$scope.noBreaks) {        // if "No Breaks" checkbox checked, no need to check Session Breaks

                if ($scope.session.sessionBreaks.length == 0) {
                    formValid = false;
                    alert("Either check the No Breaks checkbox or enter Session Breaks");

                } else {                                // if the "No Breaks" checkbox is unchecked 
                                                        // and no Session Breaks were entered: error out
                    for (var i = 0; i < $scope.session.sessionBreaks.length; ++i){ 
                        if (($scope.session.sessionBreaks[i].startDate == "") || ($scope.session.sessionBreaks[i].endDate == "")) {
                            formValid = false;
                            alert("Either enter Session Breaks or check the No Breaks checkbox.");
                        }
                    }
                }
            }   // if (formValid)

            return formValid;
        }   // IsFormValid()


        $scope.checkSessBreak = function (i){

            var sessBeginDate = $scope.session.sessionBreaks[i].startDate;
            if (sessBeginDate > ''){
                $scope.beginDate = new Date(sessBeginDate);
            }

            var sessEndDate = $scope.session.sessionBreaks[i].endDate;
            if (sessEndDate > ''){
                $scope.endDate = new Date(sessEndDate);
            }

            if ((sessBeginDate > '') && (sessEndDate > '')){

                switch (true) {

                    case (endDate < beginDate):
                        alert("The session end date is earlier than the session begin date.");
                        break;

                    default:
                        break;
                }
            }
        }

        $scope.deleteBreaks = function () {

            if ($scope.noBreaks){
                $scope.session.sessionBreaks = [];  // delete existing breaks
            }
            return;
        }   // deleteBreaks()


        $scope.BlankOtherLocation = function () {

            if (($scope.session.uscCampusLocation != "OTH") && ($scope.session.otherCampusLocation > "")) {
                $scope.session.otherCampusLocation = "";
            }
            return;
        }


        $scope.SubmitForm = function () {

            if (!IsFormValid()) {
                alert("Please provide required fields.");
                return;
            };

            var today = new Date();
            $scope.session.submitDate = today.getMonth() + 1 + '/' +today.getDate() + '/' +today.getFullYear();

            var sessionValue = $scope.sessCode.value().trim();
            $scope.session.sessionCode = sessionValue.substring(0, 3);

            $scope.session.sessionName = sessionValue.substring(3);
            $scope.session.sessionName = $scope.session.sessionName.trim();

            $rootScope.rateName = '';
            for (var i = 0; i < $scope.rateTypes.length; ++i) {
                if ($scope.rateTypes[i].rateCode == $scope.session.rateType) {
                    $rootScope.rateName = $scope.rateTypes[i].rateName;
                    break;
                };
            }   // for (var...)

            $rootScope.savedSession = new Sessions($scope.session);

            $rootScope.savedSession.$save(null,

                    function () {
                        alert("Submission successful");
                        $location.url("/Result");
                    },

                    function () {
                        alert("Error in submitting the form.");
                    }
                );
            return;
        }   // SubmitForm()

        $scope.rates = [];

        function GetRateTable() {
            $scope.rates = RateTable.query();
            return;
        }   // GetRateTable()

        $scope.CheckRateAmount = function (rateAmount, rateName) {

            if ($scope.session.rateType == "OTH") {
                if (rateAmount < 1) {
                    alert("Please enter a " + rateName + " that is greater than 0.");
                }
            }
        }   // CheckRateAmount


    $(document).ready(function () {

        $scope.sessionCodes = SessionCodes;             // get the Session Codes for the Autocomplete feature on the Session field.

        $scope.semesters = SemStartDates.sChoices;    // populates the semester dropdown for the user

        $scope.semStart = SemStartDates.sStart;      // Ultimate start date.  Do not accept any date before this date.

        GetRateTable();                                 // Reads the rate table from the database

        $scope.campusLocs = CampusLocations;
/*
                                2017 	                2018 	                2019 	                2020
        New Year’s Day 	        Mon 1/2 	            Mon 1/1 	            Tue 1/1 	            Wed 1/1
        Martin Luther King Day 	Mon 1/16 	            Mon 1/15 	            Mon 1/21 	            Mon 1/20
        Presidents’ Day 	    Mon 2/20 	            Mon 2/19 	            Mon 2/18 	            Mon 2/17
        Memorial Day 	        Mon 5/29 	            Mon 5/28 	            Mon 5/27 	            Mon 5/25
        Independence Day 	    Mon 7/3-Tue 7/4         Wed 7/4 	            Thu 7/4-Fri 7/5         Fri 7/3
        Labor Day 	            Mon 9/4 	            Mon 9/3 	            Mon 9/2 	            Mon 9/7
        Thanksgiving 	        Thu 11/23–Fri 11/24     Thu 11/22–Fri 11/23     Thu 11/28–Fri 11/29 	Thu 11/26–Fri 11/27
        Christmas 	            Mon 12/25 	            Mon 12/24–Tue 12/25     Wed 12/25 	            Fri 12/25
        Winter Recess 	        Tue 12/26–Fri 12/29     Wed 12/26–Mon 12/31     Thu 12/26–Tue 12/31 	Mon 12/28–Thu 12/31
*/
        holidays = [
            "1/2/2017", "1/16/2017", "2/20/2017", "5/29/2017", "7/3/2017", "7/4/2017", "9/14/2017", "11/23/2017", "11/24/2017", "11/24/2017", "12/25/2017", "12/26/2017", "12/27/2017", "12/28/2017", "12/29/2017",
            "1/1/2018", "1/15/2018", "2/19/2018", "5/28/2018", "7/4/2018", "9/3/2018", "11/22/2018","11/23/2018", "12/24/2018", "12/25/2018", "12/25/2018", "12/26/2018", "12/27/2018", "12/28/2018", "12/29/2018", "12/30/2017", "12/31/2018",
            "1/1/2019", "1/21/2019", "2/18/2019", "5/27/2019", "7/4/2019", "7/5/2019", "9/2/2019",  "11/28/2019", "11/29/2019", "12/25/2019", "12/26/2019", "12/27/2019", "12/28/2019", "12/29/2019", "12/30/2019", "12/31/2019",
            "1/1/2020", "1/20/2020", "2/17/2020", "5/25/2020", "7/3/2020", "9/7/2020", "11/26/2020","11/27/2020", "12/25/2020", "12/28/2020", "12/29/2020", "12/30/2020", "12/31/2020"
        ];

        $scope.session = {

            academicTerm:       "",
            sessionCode:        "",
            sessionName:        "",
            owningSchool:       "",         // from Shib
            owningDepartment:   "",         // from Shib
            userContact:        "",         // from Shib
            userEmail:          "",         // from Shib
            userPhone:          "",         // from Shib
            firstDayOfClass:    "",
            lastDayOfClass:     "",
            lastDayForAddDrop:  "",
            lastDayForEnrollmentOptionChange: "",
            lastDayForWithdrawal: "",
            firstDayOfFinals:   "",
            firstDayForFinalGrading: "",
            lastDayForFinalGrading: "",
            isClassHeldAtUpc:   null,
            uscCampusLocation:  "",
            otherCampusLocation:"",
            rateType:           "",
            ratePerUnitAmount:  "",
            flatRateAmount:     "",
            flatRateUnitsMin:   "",
            flatRateUnitsMax:   "",
            comments:           "",
            sessionBreaks:      [],
            sections:           [],
            submitDate:         "",
        };

        $scope.sess001Dates = {

            firstDayOfClass     : "",
            lastDayOfClass      : "",
            lastDayForAddDrop   : "",
            lastDayForWithdrawal: "",
            lastDayForEnrollmentOptionChange: "",
            firstDayForFinalGrading: "",
            lastDayForFinalGrading: "",
            sessBreak1Begin     : "",
            sessBreak1End       : "",
            sessBreak2Begin     : "",
            sessBreak2End       : ""
        }

        $scope.requireUSCLoc = false;        // field validation flags
        $scope.requireOtherLoc  = false;
        $scope.requireUnitRange = false;

    }); // document.ready()
}]);    // sessionModule()
"use strict";
sessionModule.controller("sessionResultCtrl",

        ["Sessions", "GetCampusName", "$scope", "$location", "$rootScope",

    function (Sessions, GetCampusName, $scope, $location, $rootScope) {

        $scope.session = $rootScope.savedSession;
        $scope.rateName = $rootScope.rateName;

        var sessBreaks = $scope.session.sessionBreaks;

        switch (sessBreaks.length) {

            case 2:
                $scope.session.sessionBreakStart_2 = sessBreaks[1].startDate;
                $scope.session.sessionBreakEnd_2 = sessBreaks[1].endDate;

            case 1:
                $scope.session.sessionBreakStart_1 = sessBreaks[0].startDate;
                $scope.session.sessionBreakEnd_1 = sessBreaks[0].endDate;
                break;

            default:
                $scope.session.sessionBreakStart_2 = "";
                $scope.session.sessionBreakEnd_2 = "";
                break;

        }; // switch()

        $scope.campusDescription = GetCampusName($scope.session.uscCampusLocation);

        return;
    }
]);