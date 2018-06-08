// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace PeApi.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    public partial class USCPEApiDTOAdvisementOrientationReservation
    {
        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiDTOAdvisementOrientationReservation class.
        /// </summary>
        public USCPEApiDTOAdvisementOrientationReservation()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// USCPEApiDTOAdvisementOrientationReservation class.
        /// </summary>
        public USCPEApiDTOAdvisementOrientationReservation(string uscId = default(string), string eventTitle = default(string), System.DateTime? eventStartDate = default(System.DateTime?), string registrationId = default(string), string productId = default(string), string productCode = default(string), string status = default(string), string participant = default(string), System.DateTime? lastModifedDate = default(System.DateTime?), System.DateTime? loadedDate = default(System.DateTime?))
        {
            UscId = uscId;
            EventTitle = eventTitle;
            EventStartDate = eventStartDate;
            RegistrationId = registrationId;
            ProductId = productId;
            ProductCode = productCode;
            Status = status;
            Participant = participant;
            LastModifedDate = lastModifedDate;
            LoadedDate = loadedDate;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscId")]
        public string UscId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "eventTitle")]
        public string EventTitle { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "eventStartDate")]
        public System.DateTime? EventStartDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "registrationId")]
        public string RegistrationId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "productId")]
        public string ProductId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "productCode")]
        public string ProductCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "participant")]
        public string Participant { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastModifedDate")]
        public System.DateTime? LastModifedDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "loadedDate")]
        public System.DateTime? LoadedDate { get; set; }

    }
}
