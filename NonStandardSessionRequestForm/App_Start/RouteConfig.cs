using System.Web.Mvc;
using System.Web.Routing;

namespace USC.RNR.NonStandardSessionRequestForm
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("Shibboleth.sso/{*pathInfo}");

            routes.IgnoreRoute("api/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{*.}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}