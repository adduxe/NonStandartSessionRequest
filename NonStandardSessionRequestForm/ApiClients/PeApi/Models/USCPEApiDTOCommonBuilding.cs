// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiDTOCommonBuilding
    {
        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCommonBuilding class.
        /// </summary>
        public USCPEApiDTOCommonBuilding()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCommonBuilding class.
        /// </summary>
        public USCPEApiDTOCommonBuilding(int? id = default(int?), string code = default(string), string description = default(string), string type = default(string), bool? isUscOwned = default(bool?))
        {
            Id = id;
            Code = code;
            Description = description;
            Type = type;
            IsUscOwned = isUscOwned;
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
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isUscOwned")]
        public bool? IsUscOwned { get; set; }

    }
}
