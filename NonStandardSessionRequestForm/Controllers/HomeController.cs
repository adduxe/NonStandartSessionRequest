using System.Web.Mvc;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Result()
        {
            return View();
        }
    }   
}