
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

            ViewBag.ShibDepartment = user.Department;
            ViewBag.ShibUserName = user.FirstName + " " + user.Surname;
            @ViewBag.ShibCollege = user.School;

            if (user.IsAdmin)
            {

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

        public ActionResult Forbidden()
        {
            return View();
        }
    }
}