// Code generated by Microsoft (R) AutoRest Code Generator 0.16.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace DataApiClient.Models
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Microsoft.Rest;
    using Microsoft.Rest.Serialization;

    public partial class CeebLookup
    {
        /// <summary>
        /// Initializes a new instance of the CeebLookup class.
        /// </summary>
        public CeebLookup() { }

        /// <summary>
        /// Initializes a new instance of the CeebLookup class.
        /// </summary>
        public CeebLookup(string liaisonCeeb = default(string), string uscCeeb = default(string))
        {
            LiaisonCeeb = liaisonCeeb;
            UscCeeb = uscCeeb;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "liaisonCeeb")]
        public string LiaisonCeeb { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscCeeb")]
        public string UscCeeb { get; set; }

    }
}