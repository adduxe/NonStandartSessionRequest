// Code generated by Microsoft (R) AutoRest Code Generator 1.0.1.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace SessionRequestApi.Client.Models
{
    using Newtonsoft.Json;
    using SessionRequestApi.Client;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Xml;
    using System.Xml.Linq;

    public partial class Section
    {
        /// <summary>
        /// Initializes a new instance of the Section class.
        /// </summary>
        public Section()
        {
          CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the Section class.
        /// </summary>
        public Section(int? sectionId = default(int?), string sectionNumber = default(string), int? requestId = default(int?), string prefix = default(string), string title = default(string), string courseNumber = default(string), double? unitValue = default(double?), string instructorName = default(string), int? estimatedEnrollment = default(int?), string comments = default(string), int? incomeAccountNumber = default(int?), IList<Schedule> schedules = default(IList<Schedule>))
        {
            SectionId = sectionId;
            SectionNumber = sectionNumber;
            RequestId = requestId;
            Prefix = prefix;
            Title = title;
            CourseNumber = courseNumber;
            UnitValue = unitValue;
            InstructorName = instructorName;
            EstimatedEnrollment = estimatedEnrollment;
            Comments = comments;
            IncomeAccountNumber = incomeAccountNumber;
            Schedules = schedules;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sectionId")]
        public int? SectionId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sectionNumber")]
        public string SectionNumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "requestId")]
        public int? RequestId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "prefix")]
        public string Prefix { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "courseNumber")]
        public string CourseNumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "unitValue")]
        public double? UnitValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "instructorName")]
        public string InstructorName { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "estimatedEnrollment")]
        public int? EstimatedEnrollment { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "incomeAccountNumber")]
        public int? IncomeAccountNumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "schedules")]
        public IList<Schedule> Schedules { get; set; }

        /// <summary>
        /// Serializes the object to an XML node
        /// </summary>
        internal XElement XmlSerialize(XElement result)
        {
            if( null != SectionId )
            {
                result.Add(new XElement("sectionId", SectionId) );
            }
            if( null != SectionNumber )
            {
                result.Add(new XElement("sectionNumber", SectionNumber) );
            }
            if( null != RequestId )
            {
                result.Add(new XElement("requestId", RequestId) );
            }
            if( null != Prefix )
            {
                result.Add(new XElement("prefix", Prefix) );
            }
            if( null != Title )
            {
                result.Add(new XElement("title", Title) );
            }
            if( null != CourseNumber )
            {
                result.Add(new XElement("courseNumber", CourseNumber) );
            }
            if( null != UnitValue )
            {
                result.Add(new XElement("unitValue", UnitValue) );
            }
            if( null != InstructorName )
            {
                result.Add(new XElement("instructorName", InstructorName) );
            }
            if( null != EstimatedEnrollment )
            {
                result.Add(new XElement("estimatedEnrollment", EstimatedEnrollment) );
            }
            if( null != Comments )
            {
                result.Add(new XElement("comments", Comments) );
            }
            if( null != IncomeAccountNumber )
            {
                result.Add(new XElement("incomeAccountNumber", IncomeAccountNumber) );
            }
            if( null != Schedules )
            {
                foreach( var value in Schedules ){
                    result.Add(value.XmlSerialize( new XElement( "schedules") ) );
                }
            }
            return result;
        }
        /// <summary>
        /// Deserializes an XML node to an instance of Section
        /// </summary>
        internal static Section XmlDeserialize(string payload)
        {
            // deserialize to xml and use the overload to do the work
            return XmlDeserialize( XElement.Parse( payload ) );
        }
        internal static Section XmlDeserialize(XElement payload)
        {
            var result = new Section();
            var deserializeSectionId = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultSectionId;
            if (deserializeSectionId(payload, "sectionId", out resultSectionId))
            {
                result.SectionId = resultSectionId;
            }
            var deserializeSectionNumber = XmlSerialization.ToDeserializer(e => (string)e);
            string resultSectionNumber;
            if (deserializeSectionNumber(payload, "sectionNumber", out resultSectionNumber))
            {
                result.SectionNumber = resultSectionNumber;
            }
            var deserializeRequestId = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultRequestId;
            if (deserializeRequestId(payload, "requestId", out resultRequestId))
            {
                result.RequestId = resultRequestId;
            }
            var deserializePrefix = XmlSerialization.ToDeserializer(e => (string)e);
            string resultPrefix;
            if (deserializePrefix(payload, "prefix", out resultPrefix))
            {
                result.Prefix = resultPrefix;
            }
            var deserializeTitle = XmlSerialization.ToDeserializer(e => (string)e);
            string resultTitle;
            if (deserializeTitle(payload, "title", out resultTitle))
            {
                result.Title = resultTitle;
            }
            var deserializeCourseNumber = XmlSerialization.ToDeserializer(e => (string)e);
            string resultCourseNumber;
            if (deserializeCourseNumber(payload, "courseNumber", out resultCourseNumber))
            {
                result.CourseNumber = resultCourseNumber;
            }
            var deserializeUnitValue = XmlSerialization.ToDeserializer(e => (double?)e);
            double? resultUnitValue;
            if (deserializeUnitValue(payload, "unitValue", out resultUnitValue))
            {
                result.UnitValue = resultUnitValue;
            }
            var deserializeInstructorName = XmlSerialization.ToDeserializer(e => (string)e);
            string resultInstructorName;
            if (deserializeInstructorName(payload, "instructorName", out resultInstructorName))
            {
                result.InstructorName = resultInstructorName;
            }
            var deserializeEstimatedEnrollment = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultEstimatedEnrollment;
            if (deserializeEstimatedEnrollment(payload, "estimatedEnrollment", out resultEstimatedEnrollment))
            {
                result.EstimatedEnrollment = resultEstimatedEnrollment;
            }
            var deserializeComments = XmlSerialization.ToDeserializer(e => (string)e);
            string resultComments;
            if (deserializeComments(payload, "comments", out resultComments))
            {
                result.Comments = resultComments;
            }
            var deserializeIncomeAccountNumber = XmlSerialization.ToDeserializer(e => (int?)e);
            int? resultIncomeAccountNumber;
            if (deserializeIncomeAccountNumber(payload, "incomeAccountNumber", out resultIncomeAccountNumber))
            {
                result.IncomeAccountNumber = resultIncomeAccountNumber;
            }
            var deserializeSchedules = XmlSerialization.CreateListXmlDeserializer(XmlSerialization.ToDeserializer(e => Schedule.XmlDeserialize(e)), null);
            IList<Schedule> resultSchedules;
            if (deserializeSchedules(payload, "schedules", out resultSchedules))
            {
                result.Schedules = resultSchedules;
            }
            return result;
        }
    }
}
