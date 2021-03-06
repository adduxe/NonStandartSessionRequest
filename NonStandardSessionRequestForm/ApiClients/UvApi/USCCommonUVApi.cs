// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace UvApi
{
    using Microsoft.Rest;
    using Microsoft.Rest.Serialization;
    using Models;
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;

    public partial class USCCommonUVApi : ServiceClient<USCCommonUVApi>, IUSCCommonUVApi
    {
        /// <summary>
        /// The base URI of the service.
        /// </summary>
        public System.Uri BaseUri { get; set; }

        /// <summary>
        /// Gets or sets json serialization settings.
        /// </summary>
        public JsonSerializerSettings SerializationSettings { get; private set; }

        /// <summary>
        /// Gets or sets json deserialization settings.
        /// </summary>
        public JsonSerializerSettings DeserializationSettings { get; private set; }

        /// <summary>
        /// Gets the IAdmSAddCont.
        /// </summary>
        public virtual IAdmSAddCont AdmSAddCont { get; private set; }

        /// <summary>
        /// Gets the IAdmSCasDenLoad.
        /// </summary>
        public virtual IAdmSCasDenLoad AdmSCasDenLoad { get; private set; }

        /// <summary>
        /// Gets the IAdmSCasImport.
        /// </summary>
        public virtual IAdmSCasImport AdmSCasImport { get; private set; }

        /// <summary>
        /// Gets the IAdmSWriteContactCode.
        /// </summary>
        public virtual IAdmSWriteContactCode AdmSWriteContactCode { get; private set; }

        /// <summary>
        /// Gets the IFaoPWAidItems.
        /// </summary>
        public virtual IFaoPWAidItems FaoPWAidItems { get; private set; }

        /// <summary>
        /// Gets the IFaoPWARPlusLoans.
        /// </summary>
        public virtual IFaoPWARPlusLoans FaoPWARPlusLoans { get; private set; }

        /// <summary>
        /// Gets the IFaoPWARPpStatus.
        /// </summary>
        public virtual IFaoPWARPpStatus FaoPWARPpStatus { get; private set; }

        /// <summary>
        /// Gets the IFaoPWChargesNCredits.
        /// </summary>
        public virtual IFaoPWChargesNCredits FaoPWChargesNCredits { get; private set; }

        /// <summary>
        /// Gets the IFaoPWLoanOrigFee.
        /// </summary>
        public virtual IFaoPWLoanOrigFee FaoPWLoanOrigFee { get; private set; }

        /// <summary>
        /// Gets the IFaoPWTerm.
        /// </summary>
        public virtual IFaoPWTerm FaoPWTerm { get; private set; }

        /// <summary>
        /// Gets the IRnrSWebSess.
        /// </summary>
        public virtual IRnrSWebSess RnrSWebSess { get; private set; }

        /// <summary>
        /// Gets the ISisSStuObj.
        /// </summary>
        public virtual ISisSStuObj SisSStuObj { get; private set; }

        /// <summary>
        /// Gets the ITrxSEOrderOperations.
        /// </summary>
        public virtual ITrxSEOrderOperations TrxSEOrder { get; private set; }

        /// <summary>
        /// Initializes a new instance of the USCCommonUVApi class.
        /// </summary>
        /// <param name='handlers'>
        /// Optional. The delegating handlers to add to the http client pipeline.
        /// </param>
        public USCCommonUVApi(params DelegatingHandler[] handlers) : base(handlers)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the USCCommonUVApi class.
        /// </summary>
        /// <param name='rootHandler'>
        /// Optional. The http client handler used to handle http transport.
        /// </param>
        /// <param name='handlers'>
        /// Optional. The delegating handlers to add to the http client pipeline.
        /// </param>
        public USCCommonUVApi(HttpClientHandler rootHandler, params DelegatingHandler[] handlers) : base(rootHandler, handlers)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the USCCommonUVApi class.
        /// </summary>
        /// <param name='baseUri'>
        /// Optional. The base URI of the service.
        /// </param>
        /// <param name='handlers'>
        /// Optional. The delegating handlers to add to the http client pipeline.
        /// </param>
        /// <exception cref="System.ArgumentNullException">
        /// Thrown when a required parameter is null
        /// </exception>
        public USCCommonUVApi(System.Uri baseUri, params DelegatingHandler[] handlers) : this(handlers)
        {
            if (baseUri == null)
            {
                throw new System.ArgumentNullException("baseUri");
            }
            BaseUri = baseUri;
        }

        /// <summary>
        /// Initializes a new instance of the USCCommonUVApi class.
        /// </summary>
        /// <param name='baseUri'>
        /// Optional. The base URI of the service.
        /// </param>
        /// <param name='rootHandler'>
        /// Optional. The http client handler used to handle http transport.
        /// </param>
        /// <param name='handlers'>
        /// Optional. The delegating handlers to add to the http client pipeline.
        /// </param>
        /// <exception cref="System.ArgumentNullException">
        /// Thrown when a required parameter is null
        /// </exception>
        public USCCommonUVApi(System.Uri baseUri, HttpClientHandler rootHandler, params DelegatingHandler[] handlers) : this(rootHandler, handlers)
        {
            if (baseUri == null)
            {
                throw new System.ArgumentNullException("baseUri");
            }
            BaseUri = baseUri;
        }

        /// <summary>
        /// An optional partial-method to perform custom initialization.
        ///</summary>
        partial void CustomInitialize();
        /// <summary>
        /// Initializes client properties.
        /// </summary>
        private void Initialize()
        {
            AdmSAddCont = new AdmSAddCont(this);
            AdmSCasDenLoad = new AdmSCasDenLoad(this);
            AdmSCasImport = new AdmSCasImport(this);
            AdmSWriteContactCode = new AdmSWriteContactCode(this);
            FaoPWAidItems = new FaoPWAidItems(this);
            FaoPWARPlusLoans = new FaoPWARPlusLoans(this);
            FaoPWARPpStatus = new FaoPWARPpStatus(this);
            FaoPWChargesNCredits = new FaoPWChargesNCredits(this);
            FaoPWLoanOrigFee = new FaoPWLoanOrigFee(this);
            FaoPWTerm = new FaoPWTerm(this);
            RnrSWebSess = new RnrSWebSess(this);
            SisSStuObj = new SisSStuObj(this);
            TrxSEOrder = new TrxSEOrderOperations(this);
            BaseUri = new System.Uri("http://omw-vm1.usc.edu/UvApi");
            SerializationSettings = new JsonSerializerSettings
            {
                Formatting = Newtonsoft.Json.Formatting.Indented,
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize,
                ContractResolver = new ReadOnlyJsonContractResolver(),
                Converters = new  List<JsonConverter>
                    {
                        new Iso8601TimeSpanConverter()
                    }
            };
            DeserializationSettings = new JsonSerializerSettings
            {
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize,
                ContractResolver = new ReadOnlyJsonContractResolver(),
                Converters = new List<JsonConverter>
                    {
                        new Iso8601TimeSpanConverter()
                    }
            };
            CustomInitialize();
        }
    }
}
