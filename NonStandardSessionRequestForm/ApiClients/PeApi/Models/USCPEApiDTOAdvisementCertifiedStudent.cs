// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiDTOAdvisementCertifiedStudent
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiDTOAdvisementCertifiedStudent class.
        /// </summary>
        public USCPEApiDTOAdvisementCertifiedStudent()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiDTOAdvisementCertifiedStudent class.
        /// </summary>
        public USCPEApiDTOAdvisementCertifiedStudent(string uscId = default(string), string firstName = default(string), string middleName = default(string), string lastName = default(string), string admEmail = default(string), string uscEmail = default(string), string termCode = default(string), string permanentResident = default(string), bool? adM60Flag = default(bool?), bool? alI01Flag = default(bool?), bool? naiFlag = default(bool?), bool? rhpFlag = default(bool?), string rotc = default(string), string sportCode = default(string), bool? compPlaceExamFlag = default(bool?), string classLevelCode = default(string), string activePostCode = default(string), string activeMajor = default(string), string acitveOwn = default(string), string preProfessionalEmphasisCode = default(string), System.DateTime? withdrawDate = default(System.DateTime?), System.DateTime? lastModifedDate = default(System.DateTime?), System.DateTime? loadedDate = default(System.DateTime?))
        {
            UscId = uscId;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            AdmEmail = admEmail;
            UscEmail = uscEmail;
            TermCode = termCode;
            PermanentResident = permanentResident;
            AdM60Flag = adM60Flag;
            AlI01Flag = alI01Flag;
            NaiFlag = naiFlag;
            RhpFlag = rhpFlag;
            Rotc = rotc;
            SportCode = sportCode;
            CompPlaceExamFlag = compPlaceExamFlag;
            ClassLevelCode = classLevelCode;
            ActivePostCode = activePostCode;
            ActiveMajor = activeMajor;
            AcitveOwn = acitveOwn;
            PreProfessionalEmphasisCode = preProfessionalEmphasisCode;
            WithdrawDate = withdrawDate;
            LastModifedDate = lastModifedDate;
            LoadedDate = loadedDate;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscId")]
        public string UscId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "middleName")]
        public string MiddleName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "admEmail")]
        public string AdmEmail { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscEmail")]
        public string UscEmail { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "termCode")]
        public string TermCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "permanentResident")]
        public string PermanentResident { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "adM60Flag")]
        public bool? AdM60Flag { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "alI01Flag")]
        public bool? AlI01Flag { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "naiFlag")]
        public bool? NaiFlag { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rhpFlag")]
        public bool? RhpFlag { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rotc")]
        public string Rotc { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sportCode")]
        public string SportCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "compPlaceExamFlag")]
        public bool? CompPlaceExamFlag { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "classLevelCode")]
        public string ClassLevelCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "activePostCode")]
        public string ActivePostCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "activeMajor")]
        public string ActiveMajor { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "acitveOwn")]
        public string AcitveOwn { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "preProfessionalEmphasisCode")]
        public string PreProfessionalEmphasisCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "withdrawDate")]
        public System.DateTime? WithdrawDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastModifedDate")]
        public System.DateTime? LastModifedDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "loadedDate")]
        public System.DateTime? LoadedDate { get; set; }

    }
}
