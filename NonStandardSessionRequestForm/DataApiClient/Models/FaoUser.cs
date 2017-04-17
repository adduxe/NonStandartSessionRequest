// Code generated by Microsoft (R) AutoRest Code Generator 0.16.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace DataApi.Models
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Microsoft.Rest;
    using Microsoft.Rest.Serialization;

    public partial class FaoUser
    {
        /// <summary>
        /// Initializes a new instance of the FaoUser class.
        /// </summary>
        public FaoUser() { }

        /// <summary>
        /// Initializes a new instance of the FaoUser class.
        /// </summary>
        public FaoUser(IList<FaoGroup> groups = default(IList<FaoGroup>), string uscId = default(string), string uscNetId = default(string), string firstName = default(string), string lastName = default(string), string sisOperCode = default(string), FaoApp defaultApp = default(FaoApp))
        {
            Groups = groups;
            UscId = uscId;
            UscNetId = uscNetId;
            FirstName = firstName;
            LastName = lastName;
            SisOperCode = sisOperCode;
            DefaultApp = defaultApp;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "groups")]
        public IList<FaoGroup> Groups { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscId")]
        public string UscId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscNetId")]
        public string UscNetId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sisOperCode")]
        public string SisOperCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "defaultApp")]
        public FaoApp DefaultApp { get; set; }

    }
}
