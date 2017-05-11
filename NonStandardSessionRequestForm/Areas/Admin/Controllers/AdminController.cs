using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;

namespace USC.RNR.NonStandardSessionRequestForm.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Fao() {

            var user = new UserHelper();

            ViewBag.Title = "Financial Aid Request Queue";
            ViewBag.ShibDepartment = user.Department;
            ViewBag.ShibUserName = user.FirstName + " " + user.Surname;

            return View();
        }
        public ActionResult Rnr()
        {
            var user = new UserHelper();

            ViewBag.Title = "Records and Registration Request Queue";
            ViewBag.ShibDepartment = user.Department;
            ViewBag.ShibUserName = user.FirstName + " " + user.Surname;

            return View();
        }
        public ActionResult Bur()
        {
            return View();
        }
    }
}