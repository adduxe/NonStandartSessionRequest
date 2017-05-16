// Code generated by Microsoft (R) AutoRest Code Generator 1.0.1.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace SessionRequestApi.Client.Models
{
    using Newtonsoft.Json;
    using SessionRequestApi.Client;
    using System.Linq;
    using System.Xml;
    using System.Xml.Linq;

    public partial class Schedule
    {
        /// <summary>
        /// Initializes a new instance of the Schedule class.
        /// </summary>
        public Schedule()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the Schedule class.
        /// </summary>
        public Schedule(int? scheduleId = default(int?), int? sectionId = default(int?), string classDayOfWeek = default(string), string classStartTime = default(string), string classEndTime = default(string))
        {
            ScheduleId = scheduleId;
            SectionId = sectionId;
            ClassDayOfWeek = classDayOfWeek;
            ClassStartTime = classStartTime;
            ClassEndTime = classEndTime;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "scheduleId")]
        public int? ScheduleId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sectionId")]
        public int? SectionId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "classDayOfWeek")]
        public string ClassDayOfWeek { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "classStartTime")]
        public string ClassStartTime { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "classEndTime")]
        public string ClassEndTime { get; set; }

        /// <summary>
        /// Serializes the object to an XML node
        /// </summary>
        internal XElement XmlSerialize(XElement result)
        {
            if( null != ScheduleId )
            {
                result.Add(new XElement("scheduleId", ScheduleId) );
            }
            if( null != SectionId )
            {
                result.Add(new XElement("sectionId", SectionId) );
            }
            if( null != ClassDayOfWeek )
            {
                result.Add(new XElement("classDayOfWeek", ClassDayOfWeek) );
            }
            if( null != ClassStartTime )
            {
                result.Add(new XElement("classStartTime", ClassStartTime) );
            }
            if( null != ClassEndTime )
            {
                result.Add(new XElement("classEndTime", ClassEndTime) );
            }
            return result;
        }
        /// <summary>
        /// Deserializes an XML node to an instance of Schedule
        /// </summary>
        internal static Schedule XmlDeserialize(string payload)
        {
            // deserialize to xml and use the overload to do the work
            return XmlDeserialize( XElement.Parse( payload ) );
        }
        internal static Schedule XmlDeserialize(XElement payload)
        {
            var result = new Schedule();
            var deserializeScheduleId = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultScheduleId;
            if (deserializeScheduleId(payload, "scheduleId", out resultScheduleId))
            {
                result.ScheduleId = resultScheduleId;
            }
            var deserializeSectionId = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultSectionId;
            if (deserializeSectionId(payload, "sectionId", out resultSectionId))
            {
                result.SectionId = resultSectionId;
            }
            var deserializeClassDayOfWeek = XmlSerialization.ToDeserializer(e => (string)e);
            string resultClassDayOfWeek;
            if (deserializeClassDayOfWeek(payload, "classDayOfWeek", out resultClassDayOfWeek))
            {
                result.ClassDayOfWeek = resultClassDayOfWeek;
            }
            var deserializeClassStartTime = XmlSerialization.ToDeserializer(e => (string)e);
            string resultClassStartTime;
            if (deserializeClassStartTime(payload, "classStartTime", out resultClassStartTime))
            {
                result.ClassStartTime = resultClassStartTime;
            }
            var deserializeClassEndTime = XmlSerialization.ToDeserializer(e => (string)e);
            string resultClassEndTime;
            if (deserializeClassEndTime(payload, "classEndTime", out resultClassEndTime))
            {
                result.ClassEndTime = resultClassEndTime;
            }
            return result;
        }
    }
}