// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace DataApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class Application
    {
        /// <summary>
        /// Initializes a new instance of the Application class.
        /// </summary>
        public Application()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the Application class.
        /// </summary>
        public Application(int? id = default(int?), int? appNumber = default(int?), string term = default(string), string major = default(string), string classProperty = default(string), string owningUnit = default(string), string decisionCode = default(string), System.DateTime? decisionDate = default(System.DateTime?), Certification certification = default(Certification), bool? isCertifiable = default(bool?), bool? isWithdrawable = default(bool?), bool? hasAppeal = default(bool?), bool? isFreshmanTransfer = default(bool?), System.DateTime? removeDate = default(System.DateTime?), System.DateTime? withdrawDate = default(System.DateTime?))
        {
            Id = id;
            AppNumber = appNumber;
            Term = term;
            Major = major;
            ClassProperty = classProperty;
            OwningUnit = owningUnit;
            DecisionCode = decisionCode;
            DecisionDate = decisionDate;
            Certification = certification;
            IsCertifiable = isCertifiable;
            IsWithdrawable = isWithdrawable;
            HasAppeal = hasAppeal;
            IsFreshmanTransfer = isFreshmanTransfer;
            RemoveDate = removeDate;
            WithdrawDate = withdrawDate;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public int? Id { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "appNumber")]
        public int? AppNumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "term")]
        public string Term { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "major")]
        public string Major { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "class")]
        public string ClassProperty { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owningUnit")]
        public string OwningUnit { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "decisionCode")]
        public string DecisionCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "decisionDate")]
        public System.DateTime? DecisionDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "certification")]
        public Certification Certification { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isCertifiable")]
        public bool? IsCertifiable { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isWithdrawable")]
        public bool? IsWithdrawable { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "hasAppeal")]
        public bool? HasAppeal { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isFreshmanTransfer")]
        public bool? IsFreshmanTransfer { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "removeDate")]
        public System.DateTime? RemoveDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "withdrawDate")]
        public System.DateTime? WithdrawDate { get; set; }

    }
}