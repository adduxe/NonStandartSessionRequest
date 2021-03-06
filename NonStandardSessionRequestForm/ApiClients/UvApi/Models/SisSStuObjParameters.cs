// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace UvApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class SisSStuObjParameters
    {
        /// <summary>
        /// Initializes a new instance of the SisSStuObjParameters class.
        /// </summary>
        public SisSStuObjParameters()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the SisSStuObjParameters class.
        /// </summary>
        /// <param name="method">Possible values include: 'GetSsnItin',
        /// 'CreateSsn', 'CreateItin', 'GetDegreeCheck',
        /// 'SetDegreeCheck'</param>
        public SisSStuObjParameters(string studentId = default(string), string method = default(string), string data = default(string), string options = default(string))
        {
            StudentId = studentId;
            Method = method;
            Data = data;
            Options = options;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "studentId")]
        public string StudentId { get; set; }

        /// <summary>
        /// Gets or sets possible values include: 'GetSsnItin', 'CreateSsn',
        /// 'CreateItin', 'GetDegreeCheck', 'SetDegreeCheck'
        /// </summary>
        [JsonProperty(PropertyName = "method")]
        public string Method { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "data")]
        public string Data { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "options")]
        public string Options { get; set; }

    }
}
