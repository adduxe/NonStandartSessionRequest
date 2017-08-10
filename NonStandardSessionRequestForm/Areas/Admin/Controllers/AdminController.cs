
using System.Web.Mvc;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;
using System.Web;
using System;

namespace USC.RNR.NonStandardSessionRequestForm.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        public ActionResult Index()
        {

            GetUserRole();                  // Check to see if the role is set in the querystring

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

        public void GetUserRole()
        {
            string role = Request.QueryString["User"];              // Read the role off of the Querystring

            if (!string.IsNullOrEmpty(role)) {
                
                HttpCookie myCookie = new HttpCookie("User");       // Set the cookie
                DateTime now = DateTime.Now;

                myCookie.Value = role;                              // Set the cookie value.
                myCookie.Expires = now.AddMinutes(0.05);              // Set the cookie expiration date.

                Response.Cookies.Add(myCookie);                     // Add the cookie.
            }
            return;
        }

    }
}