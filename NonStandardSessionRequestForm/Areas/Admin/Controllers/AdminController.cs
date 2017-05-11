
using System.Web.Mvc;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;

namespace USC.RNR.NonStandardSessionRequestForm.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        public ActionResult Index()
        {
            var user = new UserHelper();

            if (user.IsAdmin && user.IsFao)
                return View("Fao");
            else
                if (user.IsAdmin && user.IsRnr) return View("Rnr");
            //else
            //    if (user.IsAdmin && user.IsBur) return View("Bur");
            else
                return View("Forbidden");
        }

        public ActionResult Fao() {

            var user = new UserHelper();

            if (user.IsAdmin && user.IsFao)
            {
                ViewBag.Title = "Financial Aid Request Queue";
                ViewBag.ShibDepartment = user.Department;
                ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
                return View();
            }
            else
            {
                return View("Forbidden");
            }
        }
        public ActionResult Rnr()
        {
            var user = new UserHelper();

            if (user.IsAdmin && user.IsRnr)
            {

                ViewBag.Title = "Records and Registration Request Queue";
                ViewBag.ShibDepartment = user.Department;
                ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
                return View();
            }
            else
            {
                return View("Forbidden");
            }
        }

        public ActionResult Bur()
        {
            return View();
        }

        //public ActionResult Forbidden()
        //{
        //    return View();
        //}
    }
}