// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE(string caSID = default(string), string associatioNNAME = default(string), string cyclENAME = default(string), int? sQNUMBER = default(int?), string collegECODE = default(string), string collegENAME = default(string), string collegENAMEOTHER = default(string), string collegEFIRSTDEGREECODE = default(string), string collegEFIRSTDEGREE = default(string), string collegEFIRSTDEGREEPMAJOR = default(string), string collegEFIRSTDEGREESMAJOR = default(string), string collegESECONDDEGREECODE = default(string), string collegESECONDDEGREE = default(string), string collegESECONDDEGREEPMAJOR = default(string), string collegESECONDDEGREESMAJOR = default(string), string collegEATTENDEDFROM = default(string), string collegEATTENDEDTO = default(string), string collegEPRIMARYATTENDED = default(string), string ceeBCODE = default(string), string ficECODE = default(string), string ipedSID = default(string), System.DateTime? crtDINCNCLTS = default(System.DateTime?), string crtDBYSRCSYS = default(string), string crtDBYSRCOPER = default(string), System.DateTime? lasTUPDTTS = default(System.DateTime?), string lasTUPDTBYSRCSYS = default(string), string lasTUPDTBYSRCOPER = default(string), System.DateTime? invaliDTS = default(System.DateTime?), string invaliDBYOPER = default(string), string collegEATTENDEDIDINTERNAL = default(string), string collegEFIRSTDEGREESTATUS = default(string), string collegEFIRSTDEGREEDATE = default(string), string collegESECONDDEGREESTATUS = default(string), string collegESECONDDEGREEDATE = default(string), USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOAD applicatioNLOAD = default(USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOAD), USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONLOAD vAPPLICATIONLOAD = default(USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONLOAD), USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION vFULLAPPLICATION = default(USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION))
        {
            CaSID = caSID;
            AssociatioNNAME = associatioNNAME;
            CyclENAME = cyclENAME;
            SQNUMBER = sQNUMBER;
            CollegECODE = collegECODE;
            CollegENAME = collegENAME;
            CollegENAMEOTHER = collegENAMEOTHER;
            CollegEFIRSTDEGREECODE = collegEFIRSTDEGREECODE;
            CollegEFIRSTDEGREE = collegEFIRSTDEGREE;
            CollegEFIRSTDEGREEPMAJOR = collegEFIRSTDEGREEPMAJOR;
            CollegEFIRSTDEGREESMAJOR = collegEFIRSTDEGREESMAJOR;
            CollegESECONDDEGREECODE = collegESECONDDEGREECODE;
            CollegESECONDDEGREE = collegESECONDDEGREE;
            CollegESECONDDEGREEPMAJOR = collegESECONDDEGREEPMAJOR;
            CollegESECONDDEGREESMAJOR = collegESECONDDEGREESMAJOR;
            CollegEATTENDEDFROM = collegEATTENDEDFROM;
            CollegEATTENDEDTO = collegEATTENDEDTO;
            CollegEPRIMARYATTENDED = collegEPRIMARYATTENDED;
            CeeBCODE = ceeBCODE;
            FicECODE = ficECODE;
            IpedSID = ipedSID;
            CrtDINCNCLTS = crtDINCNCLTS;
            CrtDBYSRCSYS = crtDBYSRCSYS;
            CrtDBYSRCOPER = crtDBYSRCOPER;
            LasTUPDTTS = lasTUPDTTS;
            LasTUPDTBYSRCSYS = lasTUPDTBYSRCSYS;
            LasTUPDTBYSRCOPER = lasTUPDTBYSRCOPER;
            InvaliDTS = invaliDTS;
            InvaliDBYOPER = invaliDBYOPER;
            CollegEATTENDEDIDINTERNAL = collegEATTENDEDIDINTERNAL;
            CollegEFIRSTDEGREESTATUS = collegEFIRSTDEGREESTATUS;
            CollegEFIRSTDEGREEDATE = collegEFIRSTDEGREEDATE;
            CollegESECONDDEGREESTATUS = collegESECONDDEGREESTATUS;
            CollegESECONDDEGREEDATE = collegESECONDDEGREEDATE;
            ApplicatioNLOAD = applicatioNLOAD;
            VAPPLICATIONLOAD = vAPPLICATIONLOAD;
            VFULLAPPLICATION = vFULLAPPLICATION;
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
        [JsonProperty(PropertyName = "sQ_NUMBER")]
        public int? SQNUMBER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_CODE")]
        public string CollegECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_NAME")]
        public string CollegENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_NAME_OTHER")]
        public string CollegENAMEOTHER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE_CODE")]
        public string CollegEFIRSTDEGREECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE")]
        public string CollegEFIRSTDEGREE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE_P_MAJOR")]
        public string CollegEFIRSTDEGREEPMAJOR { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE_S_MAJOR")]
        public string CollegEFIRSTDEGREESMAJOR { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE_CODE")]
        public string CollegESECONDDEGREECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE")]
        public string CollegESECONDDEGREE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE_P_MAJOR")]
        public string CollegESECONDDEGREEPMAJOR { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE_S_MAJOR")]
        public string CollegESECONDDEGREESMAJOR { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_ATTENDED_FROM")]
        public string CollegEATTENDEDFROM { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_ATTENDED_TO")]
        public string CollegEATTENDEDTO { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_PRIMARY_ATTENDED")]
        public string CollegEPRIMARYATTENDED { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ceeB_CODE")]
        public string CeeBCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ficE_CODE")]
        public string FicECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ipedS_ID")]
        public string IpedSID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "crtD_IN_CNCL_TS")]
        public System.DateTime? CrtDINCNCLTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "crtD_BY_SRC_SYS")]
        public string CrtDBYSRCSYS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "crtD_BY_SRC_OPER")]
        public string CrtDBYSRCOPER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lasT_UPDT_TS")]
        public System.DateTime? LasTUPDTTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lasT_UPDT_BY_SRC_SYS")]
        public string LasTUPDTBYSRCSYS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lasT_UPDT_BY_SRC_OPER")]
        public string LasTUPDTBYSRCOPER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "invaliD_TS")]
        public System.DateTime? InvaliDTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "invaliD_BY_OPER")]
        public string InvaliDBYOPER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_ATTENDED_ID_INTERNAL")]
        public string CollegEATTENDEDIDINTERNAL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE_STATUS")]
        public string CollegEFIRSTDEGREESTATUS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_FIRST_DEGREE_DATE")]
        public string CollegEFIRSTDEGREEDATE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE_STATUS")]
        public string CollegESECONDDEGREESTATUS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "collegE_SECOND_DEGREE_DATE")]
        public string CollegESECONDDEGREEDATE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_LOAD")]
        public USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLOAD ApplicatioNLOAD { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "v_APPLICATION_LOAD")]
        public USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONLOAD VAPPLICATIONLOAD { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "v_FULL_APPLICATION")]
        public USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION VFULLAPPLICATION { get; set; }

    }
}
