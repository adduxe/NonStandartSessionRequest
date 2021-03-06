// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace DataApi.Models
{
    using Microsoft.Rest;
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public partial class Session
    {
        /// <summary>
        /// Initializes a new instance of the Session class.
        /// </summary>
        public Session()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the Session class.
        /// </summary>
        public Session(string academicTerm, string sessionCode, string owningSchool, string userContact, string userEmail, string userPhone, int? requestId = default(int?), System.DateTime? lastUpdateTimeStamp = default(System.DateTime?), string owningDepartment = default(string), System.DateTime? firstDayOfClass = default(System.DateTime?), System.DateTime? lastDayOfClass = default(System.DateTime?), System.DateTime? lastDayForAddDrop = default(System.DateTime?), System.DateTime? lastDayForWithdrawal = default(System.DateTime?), System.DateTime? firstDayOfFinals = default(System.DateTime?), System.DateTime? lastDayOfFinals = default(System.DateTime?), System.DateTime? firstDayForFinalGrading = default(System.DateTime?), System.DateTime? lastDayForFinalGrading = default(System.DateTime?), System.DateTime? lastDayForEnrollmentOptionChange = default(System.DateTime?), bool? isClassHeldAtUpc = default(bool?), string uscCampusLocation = default(string), string otherCampusLocation = default(string), string rateType = default(string), double? ratePerUnitAmount = default(double?), double? flatRateAmount = default(double?), int? flatRateUnitsMin = default(int?), int? flatRateUnitsMax = default(int?), int? gradFlatRateUnitsMin = default(int?), int? gradFlatRateUnitsMax = default(int?), System.DateTime? requestDate = default(System.DateTime?), string comments = default(string), IList<Section> sections = default(IList<Section>), IList<SessionBreak> sessionBreaks = default(IList<SessionBreak>), IList<Submission> submissions = default(IList<Submission>), IList<SpecialFee> specialFees = default(IList<SpecialFee>))
        {
            RequestId = requestId;
            LastUpdateTimeStamp = lastUpdateTimeStamp;
            AcademicTerm = academicTerm;
            SessionCode = sessionCode;
            OwningSchool = owningSchool;
            OwningDepartment = owningDepartment;
            UserContact = userContact;
            UserEmail = userEmail;
            UserPhone = userPhone;
            FirstDayOfClass = firstDayOfClass;
            LastDayOfClass = lastDayOfClass;
            LastDayForAddDrop = lastDayForAddDrop;
            LastDayForWithdrawal = lastDayForWithdrawal;
            FirstDayOfFinals = firstDayOfFinals;
            LastDayOfFinals = lastDayOfFinals;
            FirstDayForFinalGrading = firstDayForFinalGrading;
            LastDayForFinalGrading = lastDayForFinalGrading;
            LastDayForEnrollmentOptionChange = lastDayForEnrollmentOptionChange;
            IsClassHeldAtUpc = isClassHeldAtUpc;
            UscCampusLocation = uscCampusLocation;
            OtherCampusLocation = otherCampusLocation;
            RateType = rateType;
            RatePerUnitAmount = ratePerUnitAmount;
            FlatRateAmount = flatRateAmount;
            FlatRateUnitsMin = flatRateUnitsMin;
            FlatRateUnitsMax = flatRateUnitsMax;
            GradFlatRateUnitsMin = gradFlatRateUnitsMin;
            GradFlatRateUnitsMax = gradFlatRateUnitsMax;
            RequestDate = requestDate;
            Comments = comments;
            Sections = sections;
            SessionBreaks = sessionBreaks;
            Submissions = submissions;
            SpecialFees = specialFees;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "requestId")]
        public int? RequestId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastUpdateTimeStamp")]
        public System.DateTime? LastUpdateTimeStamp { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "academicTerm")]
        public string AcademicTerm { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sessionCode")]
        public string SessionCode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owningSchool")]
        public string OwningSchool { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "owningDepartment")]
        public string OwningDepartment { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "userContact")]
        public string UserContact { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "userEmail")]
        public string UserEmail { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "userPhone")]
        public string UserPhone { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firstDayOfClass")]
        public System.DateTime? FirstDayOfClass { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayOfClass")]
        public System.DateTime? LastDayOfClass { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayForAddDrop")]
        public System.DateTime? LastDayForAddDrop { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayForWithdrawal")]
        public System.DateTime? LastDayForWithdrawal { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firstDayOfFinals")]
        public System.DateTime? FirstDayOfFinals { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayOfFinals")]
        public System.DateTime? LastDayOfFinals { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "firstDayForFinalGrading")]
        public System.DateTime? FirstDayForFinalGrading { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayForFinalGrading")]
        public System.DateTime? LastDayForFinalGrading { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "lastDayForEnrollmentOptionChange")]
        public System.DateTime? LastDayForEnrollmentOptionChange { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "isClassHeldAtUpc")]
        public bool? IsClassHeldAtUpc { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "uscCampusLocation")]
        public string UscCampusLocation { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "otherCampusLocation")]
        public string OtherCampusLocation { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "rateType")]
        public string RateType { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ratePerUnitAmount")]
        public double? RatePerUnitAmount { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "flatRateAmount")]
        public double? FlatRateAmount { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "flatRateUnitsMin")]
        public int? FlatRateUnitsMin { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "flatRateUnitsMax")]
        public int? FlatRateUnitsMax { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gradFlatRateUnitsMin")]
        public int? GradFlatRateUnitsMin { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "gradFlatRateUnitsMax")]
        public int? GradFlatRateUnitsMax { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "requestDate")]
        public System.DateTime? RequestDate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sections")]
        public IList<Section> Sections { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "sessionBreaks")]
        public IList<SessionBreak> SessionBreaks { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "submissions")]
        public IList<Submission> Submissions { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "specialFees")]
        public IList<SpecialFee> SpecialFees { get; set; }

        /// <summary>
        /// Validate the object.
        /// </summary>
        /// <exception cref="ValidationException">
        /// Thrown if validation fails
        /// </exception>
        public virtual void Validate()
        {
            if (AcademicTerm == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "AcademicTerm");
            }
            if (SessionCode == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "SessionCode");
            }
            if (OwningSchool == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "OwningSchool");
            }
            if (UserContact == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "UserContact");
            }
            if (UserEmail == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "UserEmail");
            }
            if (UserPhone == null)
            {
                throw new ValidationException(ValidationRules.CannotBeNull, "UserPhone");
            }
            if (AcademicTerm != null)
            {
                if (AcademicTerm.Length > 50)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "AcademicTerm", 50);
                }
                if (AcademicTerm.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "AcademicTerm", 0);
                }
            }
            if (SessionCode != null)
            {
                if (SessionCode.Length > 50)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "SessionCode", 50);
                }
                if (SessionCode.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "SessionCode", 0);
                }
            }
            if (UserEmail != null)
            {
                if (UserEmail.Length > 100)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "UserEmail", 100);
                }
                if (UserEmail.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "UserEmail", 0);
                }
            }
            if (UserPhone != null)
            {
                if (UserPhone.Length > 50)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "UserPhone", 50);
                }
                if (UserPhone.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "UserPhone", 0);
                }
            }
            if (UscCampusLocation != null)
            {
                if (UscCampusLocation.Length > 200)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "UscCampusLocation", 200);
                }
                if (UscCampusLocation.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "UscCampusLocation", 0);
                }
            }
            if (OtherCampusLocation != null)
            {
                if (OtherCampusLocation.Length > 200)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "OtherCampusLocation", 200);
                }
                if (OtherCampusLocation.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "OtherCampusLocation", 0);
                }
            }
            if (RateType != null)
            {
                if (RateType.Length > 50)
                {
                    throw new ValidationException(ValidationRules.MaxLength, "RateType", 50);
                }
                if (RateType.Length < 0)
                {
                    throw new ValidationException(ValidationRules.MinLength, "RateType", 0);
                }
            }
            if (Sections != null)
            {
                foreach (var element in Sections)
                {
                    if (element != null)
                    {
                        element.Validate();
                    }
                }
            }
            if (SessionBreaks != null)
            {
                foreach (var element1 in SessionBreaks)
                {
                    if (element1 != null)
                    {
                        element1.Validate();
                    }
                }
            }
            if (Submissions != null)
            {
                foreach (var element2 in Submissions)
                {
                    if (element2 != null)
                    {
                        element2.Validate();
                    }
                }
            }
            if (SpecialFees != null)
            {
                foreach (var element3 in SpecialFees)
                {
                    if (element3 != null)
                    {
                        element3.Validate();
                    }
                }
            }
        }
    }
}
