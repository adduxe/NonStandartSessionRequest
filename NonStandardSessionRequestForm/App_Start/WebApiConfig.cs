using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using USC.RNR.NonStandardSessionRequestForm.Filters;

namespace USC.RNR.NonStandardSessionRequestForm
{
    public static class WebApiConfig
    {
        public static HttpConfiguration Register()
        {
            var config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

            var jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            jsonSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());

            config.Formatters.JsonFormatter.SerializerSettings = jsonSettings;

            config.Services.Add(typeof(IExceptionLogger), new GlobalErrorLogger());

            return config;

        }
    }
}