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

    public partial class USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsVFULLAPPLICATION(string caSID = default(string), string associatioNNAME = default(string), string cyclENAME = default(string), string usCID = default(string), string possiblEUSCID = default(string), System.DateTime? insTLASTUPDTTS = default(System.DateTime?), System.DateTime? custoMLASTUPDTTS = default(System.DateTime?), string currenTSTREETADDRESS = default(string), string currenTSTREETADDRESS2 = default(string), string currenTCITY = default(string), string currenTSTATECODE = default(string), string currenTPOSTALCODE = default(string), string currenTCOUNTRY = default(string), string currenTADDRESSVALIDUNTIL = default(string), string permanenTSTREETADDRESS = default(string), string permanenTSTREETADDRESS2 = default(string), string permanenTCITY = default(string), string permanenTSTATECODE = default(string), string permanenTPOSTALCODE = default(string), System.DateTime? saDPINVALIDD = default(System.DateTime?), System.DateTime? saDLINVALIDD = default(System.DateTime?), string permanenTCOUNTRY = default(string), System.DateTime? datafluXTS = default(System.DateTime?), System.DateTime? matcHTS = default(System.DateTime?), System.DateTime? starTPROCESSINGBYSISTS = default(System.DateTime?), System.DateTime? processeDBYSISTS = default(System.DateTime?), string firsTNAME = default(string), string middlENAME = default(string), string lasTNAME = default(string), string nickname = default(string), string suffix = default(string), string materialSUNDERANOTHERNAME = default(string), string alTFIRSTNAME = default(string), string alTMIDDLENAME = default(string), string alTLASTNAME = default(string), string gendeRCODE = default(string), string gender = default(string), string datEOFBIRTH = default(string), string citYOFBIRTH = default(string), string countYOFBIRTHCODE = default(string), string countYOFBIRTH = default(string), string statEOFBIRTHCODE = default(string), string statEOFBIRTH = default(string), string countrYOFBIRTH = default(string), string countrYOFBIRTHNAME = default(string), string citizenship = default(string), string citizenshiPCOUNTRYNAME = default(string), string citizenshiPSTATUSCODE = default(string), string citizenshiPSTATUS = default(string), string duaLCITIZENSHIP = default(string), string secnDCOUNTRYCITIZENSHIPCODE = default(string), string seconDCOUNTRYCITIZENSHIP = default(string), string statEOFRESIDENCECODE = default(string), string statEOFRESIDENCE = default(string), string countYOFRESIDENCECODE = default(string), string countYOFRESIDENCENAME = default(string), string holdSVISA = default(string), string visATYPECODE = default(string), string visATYPE = default(string), string visAVALIDUNTIL = default(string), string preferreDPHONE = default(string), string alternatEPHONE = default(string), string alternatEPHONETYPE = default(string), string preferreDPHONENUMBERTYPE = default(string), string email = default(string), string emaiLTYPE = default(string), string racEHISPANIC = default(string), string racECUBAN = default(string), string racEMEXICAN = default(string), string racEPUERTORICAN = default(string), string racESOUTHAMERICAN = default(string), string racEOTHERSPANISH = default(string), string racEOTHERSPANISHNAME = default(string), string racEAMERICANINDIAN = default(string), string racEINDIANTRIBENAME = default(string), string racEASIAN = default(string), string racEASIANINDIAN = default(string), string racECAMBODIAN = default(string), string racECHINESE = default(string), string racEFILIPINO = default(string), string racEJAPANESE = default(string), string racEKOREAN = default(string), string racEMALAYSIAN = default(string), string racEPAKISTANI = default(string), string racEVIETNAMESE = default(string), string racEOTHERASIAN = default(string), string racEOTHERASIANNAME = default(string), string racEBLACK = default(string), string racEPACIFICISLANDER = default(string), string racEGUAMANIAN = default(string), string racEHAWAIIAN = default(string), string racESAMOAN = default(string), string racEOTHERPACIFICISLANDER = default(string), string racEOTHERPACISLANDERNAME = default(string), string racEWHITE = default(string), string militarYSTATUS = default(string), string militarYSERVICEBRANCH = default(string), string attenDWITHUSVISATYPE = default(string), string maritaLSTATUS = default(string), string parenTSIBLINGATTENDUSC = default(string), string firsTGENERATIONCOLLEGE = default(string), string parenTSPOUSEEMPLOYUSC = default(string), string duaLDEGREE = default(string), string previouSAPPLIEDATTENDEDUSC = default(string), string selFREPORTEDUSCID = default(string), string f1VISAOPT = default(string), string f1OPTEXPIRATIONDATE = default(string), string dependenTF2J2 = default(string), string spousEF2J2 = default(string), string childreNF2J2 = default(string), string childreNF2J2COUNT = default(string), string noNUSCFELLOWSHIPAWARD = default(string), string q41 = default(string), string q42 = default(string), string feEWAIVER = default(string), string intLACADEMYMASTERPOST = default(string), string secondarYSCHOOL = default(string), string secondarYCITY = default(string), string secondarYGRADUATIONYEAR = default(string), string gaPSIXMONTHS = default(string), string gaPSIXMONTHSREASON = default(string), string gaPSIXMONTHSEXPLAIN = default(string), string noNUSCFELLOWSHIPAPPLY = default(string), string employeRSPONSORAPPLY = default(string), string employeRSPONSORAPPLYCHOICE = default(string), string employeRSPONSORAPPLYNAME = default(string), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE> applicatioNCOLLEGE = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT> applicatioNEMPLOYMENT = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGMAT> applicatioNGMAT = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGMAT>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGRE> applicatioNGRE = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGRE>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLANGUAGE> applicatioNLANGUAGE = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLANGUAGE>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONPROGRAM> applicatioNPROGRAM = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONPROGRAM>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONTOEFL> applicatioNTOEFL = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONTOEFL>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT> applicatioNUNOFFGMAT = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE> applicatioNUNOFFGRE = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS> applicatioNUNOFFIELTS = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS>), IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL> applicatioNUNOFFTOEFL = default(IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL>), USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONPROGRAM vAPPLICATIONPROGRAM = default(USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONPROGRAM))
        {
            CaSID = caSID;
            AssociatioNNAME = associatioNNAME;
            CyclENAME = cyclENAME;
            UsCID = usCID;
            PossiblEUSCID = possiblEUSCID;
            InsTLASTUPDTTS = insTLASTUPDTTS;
            CustoMLASTUPDTTS = custoMLASTUPDTTS;
            CurrenTSTREETADDRESS = currenTSTREETADDRESS;
            CurrenTSTREETADDRESS2 = currenTSTREETADDRESS2;
            CurrenTCITY = currenTCITY;
            CurrenTSTATECODE = currenTSTATECODE;
            CurrenTPOSTALCODE = currenTPOSTALCODE;
            CurrenTCOUNTRY = currenTCOUNTRY;
            CurrenTADDRESSVALIDUNTIL = currenTADDRESSVALIDUNTIL;
            PermanenTSTREETADDRESS = permanenTSTREETADDRESS;
            PermanenTSTREETADDRESS2 = permanenTSTREETADDRESS2;
            PermanenTCITY = permanenTCITY;
            PermanenTSTATECODE = permanenTSTATECODE;
            PermanenTPOSTALCODE = permanenTPOSTALCODE;
            SaDPINVALIDD = saDPINVALIDD;
            SaDLINVALIDD = saDLINVALIDD;
            PermanenTCOUNTRY = permanenTCOUNTRY;
            DatafluXTS = datafluXTS;
            MatcHTS = matcHTS;
            StarTPROCESSINGBYSISTS = starTPROCESSINGBYSISTS;
            ProcesseDBYSISTS = processeDBYSISTS;
            FirsTNAME = firsTNAME;
            MiddlENAME = middlENAME;
            LasTNAME = lasTNAME;
            Nickname = nickname;
            Suffix = suffix;
            MaterialSUNDERANOTHERNAME = materialSUNDERANOTHERNAME;
            AlTFIRSTNAME = alTFIRSTNAME;
            AlTMIDDLENAME = alTMIDDLENAME;
            AlTLASTNAME = alTLASTNAME;
            GendeRCODE = gendeRCODE;
            Gender = gender;
            DatEOFBIRTH = datEOFBIRTH;
            CitYOFBIRTH = citYOFBIRTH;
            CountYOFBIRTHCODE = countYOFBIRTHCODE;
            CountYOFBIRTH = countYOFBIRTH;
            StatEOFBIRTHCODE = statEOFBIRTHCODE;
            StatEOFBIRTH = statEOFBIRTH;
            CountrYOFBIRTH = countrYOFBIRTH;
            CountrYOFBIRTHNAME = countrYOFBIRTHNAME;
            Citizenship = citizenship;
            CitizenshiPCOUNTRYNAME = citizenshiPCOUNTRYNAME;
            CitizenshiPSTATUSCODE = citizenshiPSTATUSCODE;
            CitizenshiPSTATUS = citizenshiPSTATUS;
            DuaLCITIZENSHIP = duaLCITIZENSHIP;
            SecnDCOUNTRYCITIZENSHIPCODE = secnDCOUNTRYCITIZENSHIPCODE;
            SeconDCOUNTRYCITIZENSHIP = seconDCOUNTRYCITIZENSHIP;
            StatEOFRESIDENCECODE = statEOFRESIDENCECODE;
            StatEOFRESIDENCE = statEOFRESIDENCE;
            CountYOFRESIDENCECODE = countYOFRESIDENCECODE;
            CountYOFRESIDENCENAME = countYOFRESIDENCENAME;
            HoldSVISA = holdSVISA;
            VisATYPECODE = visATYPECODE;
            VisATYPE = visATYPE;
            VisAVALIDUNTIL = visAVALIDUNTIL;
            PreferreDPHONE = preferreDPHONE;
            AlternatEPHONE = alternatEPHONE;
            AlternatEPHONETYPE = alternatEPHONETYPE;
            PreferreDPHONENUMBERTYPE = preferreDPHONENUMBERTYPE;
            Email = email;
            EmaiLTYPE = emaiLTYPE;
            RacEHISPANIC = racEHISPANIC;
            RacECUBAN = racECUBAN;
            RacEMEXICAN = racEMEXICAN;
            RacEPUERTORICAN = racEPUERTORICAN;
            RacESOUTHAMERICAN = racESOUTHAMERICAN;
            RacEOTHERSPANISH = racEOTHERSPANISH;
            RacEOTHERSPANISHNAME = racEOTHERSPANISHNAME;
            RacEAMERICANINDIAN = racEAMERICANINDIAN;
            RacEINDIANTRIBENAME = racEINDIANTRIBENAME;
            RacEASIAN = racEASIAN;
            RacEASIANINDIAN = racEASIANINDIAN;
            RacECAMBODIAN = racECAMBODIAN;
            RacECHINESE = racECHINESE;
            RacEFILIPINO = racEFILIPINO;
            RacEJAPANESE = racEJAPANESE;
            RacEKOREAN = racEKOREAN;
            RacEMALAYSIAN = racEMALAYSIAN;
            RacEPAKISTANI = racEPAKISTANI;
            RacEVIETNAMESE = racEVIETNAMESE;
            RacEOTHERASIAN = racEOTHERASIAN;
            RacEOTHERASIANNAME = racEOTHERASIANNAME;
            RacEBLACK = racEBLACK;
            RacEPACIFICISLANDER = racEPACIFICISLANDER;
            RacEGUAMANIAN = racEGUAMANIAN;
            RacEHAWAIIAN = racEHAWAIIAN;
            RacESAMOAN = racESAMOAN;
            RacEOTHERPACIFICISLANDER = racEOTHERPACIFICISLANDER;
            RacEOTHERPACISLANDERNAME = racEOTHERPACISLANDERNAME;
            RacEWHITE = racEWHITE;
            MilitarYSTATUS = militarYSTATUS;
            MilitarYSERVICEBRANCH = militarYSERVICEBRANCH;
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
            SecondarYSCHOOL = secondarYSCHOOL;
            SecondarYCITY = secondarYCITY;
            SecondarYGRADUATIONYEAR = secondarYGRADUATIONYEAR;
            GaPSIXMONTHS = gaPSIXMONTHS;
            GaPSIXMONTHSREASON = gaPSIXMONTHSREASON;
            GaPSIXMONTHSEXPLAIN = gaPSIXMONTHSEXPLAIN;
            NoNUSCFELLOWSHIPAPPLY = noNUSCFELLOWSHIPAPPLY;
            EmployeRSPONSORAPPLY = employeRSPONSORAPPLY;
            EmployeRSPONSORAPPLYCHOICE = employeRSPONSORAPPLYCHOICE;
            EmployeRSPONSORAPPLYNAME = employeRSPONSORAPPLYNAME;
            ApplicatioNCOLLEGE = applicatioNCOLLEGE;
            ApplicatioNEMPLOYMENT = applicatioNEMPLOYMENT;
            ApplicatioNGMAT = applicatioNGMAT;
            ApplicatioNGRE = applicatioNGRE;
            ApplicatioNLANGUAGE = applicatioNLANGUAGE;
            ApplicatioNPROGRAM = applicatioNPROGRAM;
            ApplicatioNTOEFL = applicatioNTOEFL;
            ApplicatioNUNOFFGMAT = applicatioNUNOFFGMAT;
            ApplicatioNUNOFFGRE = applicatioNUNOFFGRE;
            ApplicatioNUNOFFIELTS = applicatioNUNOFFIELTS;
            ApplicatioNUNOFFTOEFL = applicatioNUNOFFTOEFL;
            VAPPLICATIONPROGRAM = vAPPLICATIONPROGRAM;
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
        [JsonProperty(PropertyName = "usC_ID")]
        public string UsCID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "possiblE_USC_ID")]
        public string PossiblEUSCID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "insT_LAST_UPDT_TS")]
        public System.DateTime? InsTLASTUPDTTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "custoM_LAST_UPDT_TS")]
        public System.DateTime? CustoMLASTUPDTTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_STREET_ADDRESS")]
        public string CurrenTSTREETADDRESS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_STREET_ADDRESS_2")]
        public string CurrenTSTREETADDRESS2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_CITY")]
        public string CurrenTCITY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_STATE_CODE")]
        public string CurrenTSTATECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_POSTAL_CODE")]
        public string CurrenTPOSTALCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_COUNTRY")]
        public string CurrenTCOUNTRY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "currenT_ADDRESS_VALID_UNTIL")]
        public string CurrenTADDRESSVALIDUNTIL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_STREET_ADDRESS")]
        public string PermanenTSTREETADDRESS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_STREET_ADDRESS_2")]
        public string PermanenTSTREETADDRESS2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_CITY")]
        public string PermanenTCITY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_STATE_CODE")]
        public string PermanenTSTATECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_POSTAL_CODE")]
        public string PermanenTPOSTALCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "saD_P_INVALID_D")]
        public System.DateTime? SaDPINVALIDD { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "saD_L_INVALID_D")]
        public System.DateTime? SaDLINVALIDD { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanenT_COUNTRY")]
        public string PermanenTCOUNTRY { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "datafluX_TS")]
        public System.DateTime? DatafluXTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "matcH_TS")]
        public System.DateTime? MatcHTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "starT_PROCESSING_BY_SIS_TS")]
        public System.DateTime? StarTPROCESSINGBYSISTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "processeD_BY_SIS_TS")]
        public System.DateTime? ProcesseDBYSISTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firsT_NAME")]
        public string FirsTNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "middlE_NAME")]
        public string MiddlENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lasT_NAME")]
        public string LasTNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "nickname")]
        public string Nickname { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "suffix")]
        public string Suffix { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "materialS_UNDER_ANOTHER_NAME")]
        public string MaterialSUNDERANOTHERNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alT_FIRST_NAME")]
        public string AlTFIRSTNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alT_MIDDLE_NAME")]
        public string AlTMIDDLENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alT_LAST_NAME")]
        public string AlTLASTNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gendeR_CODE")]
        public string GendeRCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gender")]
        public string Gender { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "datE_OF_BIRTH")]
        public string DatEOFBIRTH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "citY_OF_BIRTH")]
        public string CitYOFBIRTH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countY_OF_BIRTH_CODE")]
        public string CountYOFBIRTHCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countY_OF_BIRTH")]
        public string CountYOFBIRTH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statE_OF_BIRTH_CODE")]
        public string StatEOFBIRTHCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statE_OF_BIRTH")]
        public string StatEOFBIRTH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countrY_OF_BIRTH")]
        public string CountrYOFBIRTH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countrY_OF_BIRTH_NAME")]
        public string CountrYOFBIRTHNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "citizenship")]
        public string Citizenship { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "citizenshiP_COUNTRY_NAME")]
        public string CitizenshiPCOUNTRYNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "citizenshiP_STATUS_CODE")]
        public string CitizenshiPSTATUSCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "citizenshiP_STATUS")]
        public string CitizenshiPSTATUS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "duaL_CITIZENSHIP")]
        public string DuaLCITIZENSHIP { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "secnD_COUNTRY_CITIZENSHIP_CODE")]
        public string SecnDCOUNTRYCITIZENSHIPCODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "seconD_COUNTRY_CITIZENSHIP")]
        public string SeconDCOUNTRYCITIZENSHIP { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statE_OF_RESIDENCE_CODE")]
        public string StatEOFRESIDENCECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "statE_OF_RESIDENCE")]
        public string StatEOFRESIDENCE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countY_OF_RESIDENCE_CODE")]
        public string CountYOFRESIDENCECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countY_OF_RESIDENCE_NAME")]
        public string CountYOFRESIDENCENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "holdS_VISA")]
        public string HoldSVISA { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "visA_TYPE_CODE")]
        public string VisATYPECODE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "visA_TYPE")]
        public string VisATYPE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "visA_VALID_UNTIL")]
        public string VisAVALIDUNTIL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "preferreD_PHONE")]
        public string PreferreDPHONE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alternatE_PHONE")]
        public string AlternatEPHONE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alternatE_PHONE_TYPE")]
        public string AlternatEPHONETYPE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "preferreD_PHONE_NUMBER_TYPE")]
        public string PreferreDPHONENUMBERTYPE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "emaiL_TYPE")]
        public string EmaiLTYPE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_HISPANIC")]
        public string RacEHISPANIC { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_CUBAN")]
        public string RacECUBAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_MEXICAN")]
        public string RacEMEXICAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_PUERTO_RICAN")]
        public string RacEPUERTORICAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_SOUTH_AMERICAN")]
        public string RacESOUTHAMERICAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_SPANISH")]
        public string RacEOTHERSPANISH { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_SPANISH_NAME")]
        public string RacEOTHERSPANISHNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_AMERICAN_INDIAN")]
        public string RacEAMERICANINDIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_INDIAN_TRIBE_NAME")]
        public string RacEINDIANTRIBENAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_ASIAN")]
        public string RacEASIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_ASIAN_INDIAN")]
        public string RacEASIANINDIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_CAMBODIAN")]
        public string RacECAMBODIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_CHINESE")]
        public string RacECHINESE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_FILIPINO")]
        public string RacEFILIPINO { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_JAPANESE")]
        public string RacEJAPANESE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_KOREAN")]
        public string RacEKOREAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_MALAYSIAN")]
        public string RacEMALAYSIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_PAKISTANI")]
        public string RacEPAKISTANI { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_VIETNAMESE")]
        public string RacEVIETNAMESE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_ASIAN")]
        public string RacEOTHERASIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_ASIAN_NAME")]
        public string RacEOTHERASIANNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_BLACK")]
        public string RacEBLACK { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_PACIFIC_ISLANDER")]
        public string RacEPACIFICISLANDER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_GUAMANIAN")]
        public string RacEGUAMANIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_HAWAIIAN")]
        public string RacEHAWAIIAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_SAMOAN")]
        public string RacESAMOAN { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_PACIFIC_ISLANDER")]
        public string RacEOTHERPACIFICISLANDER { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_OTHER_PAC_ISLANDER_NAME")]
        public string RacEOTHERPACISLANDERNAME { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "racE_WHITE")]
        public string RacEWHITE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "militarY_STATUS")]
        public string MilitarYSTATUS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "militarY_SERVICE_BRANCH")]
        public string MilitarYSERVICEBRANCH { get; set; }

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
        [JsonProperty(PropertyName = "applicatioN_COLLEGE")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONCOLLEGE> ApplicatioNCOLLEGE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_EMPLOYMENT")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONEMPLOYMENT> ApplicatioNEMPLOYMENT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_GMAT")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGMAT> ApplicatioNGMAT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_GRE")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONGRE> ApplicatioNGRE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_LANGUAGE")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONLANGUAGE> ApplicatioNLANGUAGE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_PROGRAM")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONPROGRAM> ApplicatioNPROGRAM { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_TOEFL")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONTOEFL> ApplicatioNTOEFL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_GMAT")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGMAT> ApplicatioNUNOFFGMAT { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_GRE")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFGRE> ApplicatioNUNOFFGRE { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_IELTS")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFIELTS> ApplicatioNUNOFFIELTS { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "applicatioN_UNOFF_TOEFL")]
        public IList<USCPEApiWebApiAreasWebAdmitModelsAPPLICATIONUNOFFTOEFL> ApplicatioNUNOFFTOEFL { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "v_APPLICATION_PROGRAM")]
        public USCPEApiWebApiAreasWebAdmitModelsVAPPLICATIONPROGRAM VAPPLICATIONPROGRAM { get; set; }

    }
}