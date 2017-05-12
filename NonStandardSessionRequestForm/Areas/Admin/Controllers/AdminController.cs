
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
            string viewName = "Forbidden";  // default view if none found.

            if (user.IsAdmin)
            {
                ViewBag.ShibDepartment = user.Department;
                ViewBag.ShibUserName = user.FirstName + " " + user.Surname;

                if (user.IsFao)
                {
                    ViewBag.Title = "Financial Aid Office Session Requests";
                    viewName = "Fao";
                }
                else
                    if (user.IsRnr)
                    {
                        ViewBag.Title = "Records and Registration Session Requests";
                        viewName = "Rnr";
                    }
                    else
                        if (user.IsBur)
                        {
                            ViewBag.Title = "Bursar Session Requests";
                            viewName = "Bur";
                        }
            }

            return View(viewName);

        }   // Index()

        //public ActionResult Fao() {

        //    var user = new UserHelper();

        //    if (user.IsAdmin && user.IsFao)
        //    {
        //        ViewBag.Title = "Financial Aid Request Queue";
        //        ViewBag.ShibDepartment = user.Department;
        //        ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
        //        return View();
        //    }
        //    else
        //    {
        //        return View("Forbidden");
        //    }
        //}
        //public ActionResult Rnr()
        //{
        //    var user = new UserHelper();

        //    if (user.IsAdmin && user.IsRnr)
        //    {
        //        ViewBag.Title = "Records and Registration Request Queue";
        //        ViewBag.ShibDepartment = user.Department;
        //        ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
        //        return View();
        //    }
        //    else
        //    {
        //        return View("Forbidden");
        //    }
        //}

        //public ActionResult Bur()
        //{
        //    return View();
        //}

        //public ActionResult Forbidden()
        //{
        //    return View();
        //}
    }
}