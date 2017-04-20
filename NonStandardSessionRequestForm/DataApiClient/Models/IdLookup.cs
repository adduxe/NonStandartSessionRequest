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

    public partial class IdLookup
    {
        /// <summary>
        /// Initializes a new instance of the IdLookup class.
        /// </summary>
        public IdLookup() { }

        /// <summary>
        /// Initializes a new instance of the IdLookup class.
        /// </summary>
        public IdLookup(string casID = default(string), string uscID = default(string), string pid = default(string))
        {
            CasID = casID;
            UscID = uscID;
            Pid = pid;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "casID")]
        public string CasID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscID")]
        public string UscID { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "pid")]
        public string Pid { get; set; }

    }
}