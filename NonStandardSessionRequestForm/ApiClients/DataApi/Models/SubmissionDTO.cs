// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace DataApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class SubmissionDTO
    {
        /// <summary>
        /// Initializes a new instance of the SubmissionDTO class.
        /// </summary>
        public SubmissionDTO()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the SubmissionDTO class.
        /// </summary>
        public SubmissionDTO(int? submissionId = default(int?), int? requestId = default(int?), string faoAction = default(string), System.DateTime? faoActionDate = default(System.DateTime?), string faoActionReason = default(string), string rnrAction = default(string), System.DateTime? rnrActionDate = default(System.DateTime?), string rnrActionReason = default(string), string burAction = default(string), System.DateTime? burActionDate = default(System.DateTime?), string burActionReason = default(string))
        {
            SubmissionId = submissionId;
            RequestId = requestId;
            FaoAction = faoAction;
            FaoActionDate = faoActionDate;
            FaoActionReason = faoActionReason;
            RnrAction = rnrAction;
            RnrActionDate = rnrActionDate;
            RnrActionReason = rnrActionReason;
            BurAction = burAction;
            BurActionDate = burActionDate;
            BurActionReason = burActionReason;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "submissionId")]
        public int? SubmissionId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "requestId")]
        public int? RequestId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "faoAction")]
        public string FaoAction { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "faoActionDate")]
        public System.DateTime? FaoActionDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "faoActionReason")]
        public string FaoActionReason { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rnrAction")]
        public string RnrAction { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rnrActionDate")]
        public System.DateTime? RnrActionDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rnrActionReason")]
        public string RnrActionReason { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "burAction")]
        public string BurAction { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "burActionDate")]
        public System.DateTime? BurActionDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "burActionReason")]
        public string BurActionReason { get; set; }

    }
}
