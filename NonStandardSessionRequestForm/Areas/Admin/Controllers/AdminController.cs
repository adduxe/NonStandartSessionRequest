﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            return View();
        }
        public ActionResult Rnr()
        {
            return View();
        }
        public ActionResult Bur()
        {
            return View();
        }
    }
}