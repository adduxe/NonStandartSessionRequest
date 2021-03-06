// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace DataApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class IdLookup
    {
        /// <summary>
        /// Initializes a new instance of the IdLookup class.
        /// </summary>
        public IdLookup()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the IdLookup class.
        /// </summary>
        public IdLookup(string casID = default(string), string uscID = default(string), string pid = default(string))
        {
            CasID = casID;
            UscID = uscID;
            Pid = pid;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

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
