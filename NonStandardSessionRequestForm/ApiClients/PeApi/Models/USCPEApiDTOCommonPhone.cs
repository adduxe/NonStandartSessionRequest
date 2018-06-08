// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiDTOCommonPhone
    {
        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCommonPhone class.
        /// </summary>
        public USCPEApiDTOCommonPhone()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCommonPhone class.
        /// </summary>
        public USCPEApiDTOCommonPhone(string countryIsoCode = default(string), string number = default(string), string type = default(string), bool? isPreferred = default(bool?))
        {
            CountryIsoCode = countryIsoCode;
            Number = number;
            Type = type;
            IsPreferred = isPreferred;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "countryIsoCode")]
        public string CountryIsoCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "number")]
        public string Number { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isPreferred")]
        public bool? IsPreferred { get; set; }

    }
}
