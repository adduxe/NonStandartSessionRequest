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

    public partial class USCPEApiDTOCaoAppsTest
    {
        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCaoAppsTest class.
        /// </summary>
        public USCPEApiDTOCaoAppsTest()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the USCPEApiDTOCaoAppsTest class.
        /// </summary>
        public USCPEApiDTOCaoAppsTest(int? id = default(int?), string name = default(string), string type = default(string), System.DateTime? futureDate1 = default(System.DateTime?), System.DateTime? futureDate2 = default(System.DateTime?), System.DateTime? futureDate3 = default(System.DateTime?), int? futrueSittings = default(int?), bool? hasTakenEssay = default(bool?), IList<USCPEApiDTOCaoAppsSubjectTest> subjectTests = default(IList<USCPEApiDTOCaoAppsSubjectTest>))
        {
            Id = id;
            Name = name;
            Type = type;
            FutureDate1 = futureDate1;
            FutureDate2 = futureDate2;
            FutureDate3 = futureDate3;
            FutrueSittings = futrueSittings;
            HasTakenEssay = hasTakenEssay;
            SubjectTests = subjectTests;
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
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "futureDate1")]
        public System.DateTime? FutureDate1 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "futureDate2")]
        public System.DateTime? FutureDate2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "futureDate3")]
        public System.DateTime? FutureDate3 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "futrueSittings")]
        public int? FutrueSittings { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "hasTakenEssay")]
        public bool? HasTakenEssay { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "subjectTests")]
        public IList<USCPEApiDTOCaoAppsSubjectTest> SubjectTests { get; set; }

    }
}
