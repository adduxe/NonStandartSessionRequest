using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(USC.RNR.NonStandardSessionRequestForm.Startup))]
namespace USC.RNR.NonStandardSessionRequestForm
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseWebApi(WebApiConfig.Register());
        }
    }
}