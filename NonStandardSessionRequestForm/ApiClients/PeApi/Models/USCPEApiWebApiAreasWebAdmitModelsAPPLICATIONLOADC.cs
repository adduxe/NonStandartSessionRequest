// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public partial class USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOADC
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOADC class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOADC()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOADC class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOADC(string caSID = default(string), string associatioNNAME = default(string), string cyclENAME = default(string), string attenDWITHUSVISATYPE = default(string), string maritaLSTATUS = default(string), string parenTSIBLINGATTENDUSC = default(string), string firsTGENERATIONCOLLEGE = default(string), string parenTSPOUSEEMPLOYUSC = default(string), string duaLDEGREE = default(string), string previouSAPPLIEDATTENDEDUSC = default(string), string selFREPORTEDUSCID = default(string), string f1VISAOPT = default(string), string f1OPTEXPIRATIONDATE = default(string), string dependenTF2J2 = default(string), string spousEF2J2 = default(string), string childreNF2J2 = default(string), string childreNF2J2COUNT = default(string), string noNUSCFELLOWSHIPAWARD = default(string), string q41 = default(string), string q42 = default(string), string feEWAIVER = default(string), string intLACADEMYMASTERPOST = default(string), string datAHASH = default(string), string gaPSIXMONTHS = default(string), string gaPSIXMONTHSREASON = default(string), string gaPSIXMONTHSEXPLAIN = default(string), string noNUSCFELLOWSHIPAPPLY = default(string), string employeRSPONSORAPPLY = default(string), string employeRSPONSORAPPLYCHOICE = default(string), string employeRSPONSORAPPLYNAME = default(string), string secondarYSCHOOL = default(string), string secondarYCITY = default(string), string secondarYGRADUATIONYEAR = default(string), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT> applicatioNEMPLOYMENT = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE> applicatioNUNOFFGRE = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT> applicatioNUNOFFGMAT = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS> applicatioNUNOFFIELTS = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL> applicatioNUNOFFTOEFL = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL>))
        {
            CaSID = caSID;
            AssociatioNNAME = associatioNNAME;
            CyclENAME = cyclENAME;
            AttenDWITHUSVISATYPE = attenDWITHUSVISATYPE;
            MaritaLSTATUS = maritaLSTATUS;
            ParenTSIBLINGATTENDUSC = parenTSIBLINGATTENDUSC;
            FirsTGENERATIONCOLLEGE = firsTGENERATIONCOLLEGE;
            ParenTSPOUSEEMPLOYUSC = parenTSPOUSEEMPLOYUSC;
            DuaLDEGREE = duaLDEGREE;
            PreviouSAPPLIEDATTENDEDUSC = previouSAPPLIEDATTENDEDUSC;
            SelFREPORTEDUSCID = selFREPORTEDUSCID;
            F1VISAOPT = f1VISAOPT;
            F1OPTEXPIRATIONDATE = f1OPTEXPIRATIONDATE;
            DependenTF2J2 = dependenTF2J2;
            SpousEF2J2 = spousEF2J2;
            ChildreNF2J2 = childreNF2J2;
            ChildreNF2J2COUNT = childreNF2J2COUNT;
            NoNUSCFELLOWSHIPAWARD = noNUSCFELLOWSHIPAWARD;
            Q41 = q41;
            Q42 = q42;
            FeEWAIVER = feEWAIVER;
            IntLACADEMYMASTERPOST = intLACADEMYMASTERPOST;
            DatAHASH = datAHASH;
            GaPSIXMONTHS = gaPSIXMONTHS;
            GaPSIXMONTHSREASON = gaPSIXMONTHSREASON;
            GaPSIXMONTHSEXPLAIN = gaPSIXMONTHSEXPLAIN;
            NoNUSCFELLOWSHIPAPPLY = noNUSCFELLOWSHIPAPPLY;
            EmployeRSPONSORAPPLY = employeRSPONSORAPPLY;
            EmployeRSPONSORAPPLYCHOICE = employeRSPONSORAPPLYCHOICE;
            EmployeRSPONSORAPPLYNAME = employeRSPONSORAPPLYNAME;
            SecondarYSCHOOL = secondarYSCHOOL;
            SecondarYCITY = secondarYCITY;
            SecondarYGRADUATIONYEAR = secondarYGRADUATIONYEAR;
            ApplicatioNEMPLOYMENT = applicatioNEMPLOYMENT;
            ApplicatioNUNOFFGRE = applicatioNUNOFFGRE;
            ApplicatioNUNOFFGMAT = applicatioNUNOFFGMAT;
            ApplicatioNUNOFFIELTS = applicatioNUNOFFIELTS;
            ApplicatioNUNOFFTOEFL = applicatioNUNOFFTOEFL;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "caS_ID")]
        public string CaSID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "associatioN_NAME")]
        public string AssociatioNNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "cyclE_NAME")]
        public string CyclENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "attenD_WITH_US_VISA_TYPE")]
        public string AttenDWITHUSVISATYPE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "maritaL_STATUS")]
        public string MaritaLSTATUS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "parenT_SIBLING_ATTEND_USC")]
        public string ParenTSIBLINGATTENDUSC { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firsT_GENERATION_COLLEGE")]
        public string FirsTGENERATIONCOLLEGE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "parenT_SPOUSE_EMPLOY_USC")]
        public string ParenTSPOUSEEMPLOYUSC { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "duaL_DEGREE")]
        public string DuaLDEGREE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "previouS_APPLIED_ATTENDED_USC")]
        public string PreviouSAPPLIEDATTENDEDUSC { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "selF_REPORTED_USC_ID")]
        public string SelFREPORTEDUSCID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "f1_VISA_OPT")]
        public string F1VISAOPT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "f1_OPT_EXPIRATION_DATE")]
        public string F1OPTEXPIRATIONDATE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "dependenT_F2_J2")]
        public string DependenTF2J2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "spousE_F2_J2")]
        public string SpousEF2J2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "childreN_F2_J2")]
        public string ChildreNF2J2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "childreN_F2_J2_COUNT")]
        public string ChildreNF2J2COUNT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "noN_USC_FELLOWSHIP_AWARD")]
        public string NoNUSCFELLOWSHIPAWARD { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "q4_1")]
        public string Q41 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "q4_2")]
        public string Q42 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "feE_WAIVER")]
        public string FeEWAIVER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "intL_ACADEMY_MASTER_POST")]
        public string IntLACADEMYMASTERPOST { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "datA_HASH")]
        public string DatAHASH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gaP_SIX_MONTHS")]
        public string GaPSIXMONTHS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gaP_SIX_MONTHS_REASON")]
        public string GaPSIXMONTHSREASON { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gaP_SIX_MONTHS_EXPLAIN")]
        public string GaPSIXMONTHSEXPLAIN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "noN_USC_FELLOWSHIP_APPLY")]
        public string NoNUSCFELLOWSHIPAPPLY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "employeR_SPONSOR_APPLY")]
        public string EmployeRSPONSORAPPLY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "employeR_SPONSOR_APPLY_CHOICE")]
        public string EmployeRSPONSORAPPLYCHOICE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "employeR_SPONSOR_APPLY_NAME")]
        public string EmployeRSPONSORAPPLYNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "secondarY_SCHOOL")]
        public string SecondarYSCHOOL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "secondarY_CITY")]
        public string SecondarYCITY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "secondarY_GRADUATION_YEAR")]
        public string SecondarYGRADUATIONYEAR { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_EMPLOYMENT")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT> ApplicatioNEMPLOYMENT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_GRE")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE> ApplicatioNUNOFFGRE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_GMAT")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT> ApplicatioNUNOFFGMAT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_IELTS")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS> ApplicatioNUNOFFIELTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_TOEFL")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL> ApplicatioNUNOFFTOEFL { get; set; }

    }
}