﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers
{
    public class UserHelper
    {
        private static List<string> _superUsers = new List<string>
        {
            "6768358816", "3147921339", "2544635785", null
        };

        public UserHelper()
        {
            this.UscId = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONUSCID"];
            this.FirstName = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONFIRSTNAME"];
            this.Surname = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONSURNAME"];
            this.Department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

            this.IsAdmin = false;
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBEPENTITLEMENT"];
            if (entitlements != null && entitlements.Contains("urn:mace:usc.edu:gds:entitlement:scwk8kd3@scgw6st3"))
            {
                this.IsAdmin = true;
            }

            var department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

            this.IsFao = false;
            if (department != null && department.Contains("Financial Aid"))
            {
                this.IsFao = true;
            }

            this.IsRnr = false;
            if (department != null && department.Contains("Academic Records & Registrar"))
            {
                this.IsRnr = true;
            }

            this.IsBur = false;
            if (department != null && department.Contains("Financial Services"))
            {
                this.IsBur = true;
            }

            string user = "F";

            switch (user.ToUpper()){
                 
                case "F": // Test as FAO
                    this.UscId = "this is a test";
                    this.FirstName = "FAO Admin";
                    this.Surname = "Tester";
                    this.Department = "Department of Testing";
                    this.IsAdmin = true;
                    this.IsFao = true;
                    this.IsRnr = false;
                    this.IsBur = false;
                    break;

                case "R": // Test as RNR
                    this.UscId = "this is a test";
                    this.FirstName = "RNR Admin";
                    this.Surname = "Tester";
                    this.Department = "Department of Testing";
                    this.IsAdmin = true;
                    this.IsFao = false;
                    this.IsRnr = true;
                    this.IsBur = false;
                    break;

                case "B": // Test as Bursar
                    this.UscId = "this is a test";
                    this.FirstName = "BUR Admin";
                    this.Surname = "Tester";
                    this.Department = "Department of Testing";
                    this.IsAdmin = true;
                    this.IsFao = false;
                    this.IsRnr = false;
                    this.IsBur = true;
                    break;

                default:    // Illegal User
                    this.UscId = "Illegal User";
                    this.FirstName = "Forbidden";
                    this.Surname = "User";
                    this.Department = "Department of Hacking";
                    this.IsAdmin = false;
                    this.IsFao = false;
                    this.IsRnr = false;
                    this.IsBur = false;
                    break;
            }

        }

        internal string UscId { get; private set; }

        internal string FirstName { get; private set; }

        internal string Surname { get; private set; }

        internal string Department { get; private set; }

        internal bool IsAdmin { get; private set; }

        internal bool IsFao { get; private set; }

        internal bool IsRnr { get; private set; }

        internal bool IsBur { get; private set; }
    }
}