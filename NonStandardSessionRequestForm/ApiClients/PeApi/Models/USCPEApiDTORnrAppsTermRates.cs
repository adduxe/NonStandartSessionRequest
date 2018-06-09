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

    public partial class USCPEApiDTORnrAppsTermRates
    {
        /// <summary>
        /// Initializes a new instance of the USCPEApiDTORnrAppsTermRates
        /// class.
        /// </summary>
        public USCPEApiDTORnrAppsTermRates()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the USCPEApiDTORnrAppsTermRates
        /// class.
        /// </summary>
        public USCPEApiDTORnrAppsTermRates(string term = default(string), IList<USCPEApiDTORnrAppsTuitionRate> termRates = default(IList<USCPEApiDTORnrAppsTuitionRate>))
        {
            Term = term;
            TermRates = termRates;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "term")]
        public string Term { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "termRates")]
        public IList<USCPEApiDTORnrAppsTuitionRate> TermRates { get; set; }

    }
}