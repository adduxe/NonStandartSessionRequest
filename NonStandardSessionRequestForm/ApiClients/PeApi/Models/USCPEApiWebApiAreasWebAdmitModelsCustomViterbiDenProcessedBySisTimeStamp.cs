// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiWebApiAreasWebAdmitModelsCustomViterbiDenProcessedBySisTimeStamp
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsCustomViterbiDenProcessedBySisTimeStamp
        /// class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsCustomViterbiDenProcessedBySisTimeStamp()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiWebApiAreasWebAdmitModelsCustomViterbiDenProcessedBySisTimeStamp
        /// class.
        /// </summary>
        public USCPEApiWebApiAreasWebAdmitModelsCustomViterbiDenProcessedBySisTimeStamp(string casId = default(string), string associationName = default(string), string cycleName = default(string), string postCode = default(string), string termCode = default(string), System.DateTime? processedBySisTimeStamp = default(System.DateTime?))
        {
            CasId = casId;
            AssociationName = associationName;
            CycleName = cycleName;
            PostCode = postCode;
            TermCode = termCode;
            ProcessedBySisTimeStamp = processedBySisTimeStamp;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "casId")]
        public string CasId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "associationName")]
        public string AssociationName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "cycleName")]
        public string CycleName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "postCode")]
        public string PostCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "termCode")]
        public string TermCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "processedBySisTimeStamp")]
        public System.DateTime? ProcessedBySisTimeStamp { get; set; }

    }
}
