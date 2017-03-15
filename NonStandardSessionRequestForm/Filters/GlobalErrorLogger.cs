using System.Web.Http.ExceptionHandling;

namespace USC.RNR.NonStandardSessionRequestForm.Filters
{
    public class GlobalErrorLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            Serilog.Log.Logger.Error(context.Exception, "HTTP {Method} {RawUrl} responded {StatusCode}.", context.Request.Method, context.Request.RequestUri.AbsolutePath, "500");
        }
    }
}