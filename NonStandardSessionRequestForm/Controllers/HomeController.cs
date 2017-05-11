
using System.Web.Mvc;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var user = new UserHelper();

            ViewBag.Title = "Non-standard Session Request";
            //            ViewBag.ShibCollege = "Viterbi School of Engineering";
            ViewBag.ShibDepartment = user.Department;
            ViewBag.ShibUserName = user.FirstName + " " + user.Surname;

            return View();
        }
    }   
}