
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

            ViewBag.Title = "Session Request";
            ViewBag.ShibCollege = user.School;
            ViewBag.ShibDepartment = user.Department;
            ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
//            ViewBag.ShibPhone = user.Phone;

            return View();
        }
    }   
}