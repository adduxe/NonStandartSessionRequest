﻿
using System.Web;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers
{
    public class UserHelper
    {
        public void SetUserRole() {

            string user = "B";  // "F" - FAO, "R" - RNR, "B" - BUR, "" - get from Shib

            HttpCookie myCookie = new HttpCookie("User");
            myCookie = HttpContext.Current.Request.Cookies["User"];
            if (myCookie != null)
            {
                user = myCookie.Value;
            }

            if (!string.IsNullOrEmpty(user))
            {
                switch (user.ToUpper())
                {
                    case "F": // Test as FAO
                        this.UscId = "this is a test";
                        this.FirstName = "FAO Admin";
                        this.Surname = "Tester";
                        this.Department = "Department of Testing";
                        this.School = "Financial Aid Office";
                        this.Email = "anthondd@usc.edu";
                        this.Phone = "+1 213 111 1111";
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
                        this.School = "Record and Registration Office";
                        this.Email = "anthondd@usc.edu";
                        this.Phone = "+1 213 111 1111";
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
                        this.School = "Bursar Office";
                        this.Email = "anthondd@usc.edu";
                        this.Phone = "+1 213 111 1111";
                        this.IsAdmin = true;
                        this.IsFao = false;
                        this.IsRnr = false;
                        this.IsBur = true;
                        break;

                    default:    // use the values from Shib
                                //this.UscId = "Illegal User";
                                //this.FirstName = "Forbidden";
                                //this.Surname = "User";
                                //this.Department = "Department of Hacking";
                                //this.Email = "anthondd@usc.edu";
                                //this.Phone = "+1 213 111 1111";
                                //this.IsAdmin = false;
                                //this.IsFao = false;
                                //this.IsRnr = false;
                                //this.IsBur = false;
                        break;
                }   // switch()
            }
            return;
        }   

        public UserHelper()
        {
            this.UscId = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONUSCID"];
            this.FirstName = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONFIRSTNAME"];
            this.Surname = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONSURNAME"];
            this.School = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDIVISION"];
            this.Department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];
            this.Email = HttpContext.Current.Request.ServerVariables["HTTP_SHIBPERSONMAIL"];
            this.Phone = HttpContext.Current.Request.ServerVariables["HTTP_SHIBPERSONTELEPHONENUMBER"];

            this.IsAdmin = false;
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBEPENTITLEMENT"];
            if (entitlements != null && entitlements.Contains("urn:mace:usc.edu:gds:entitlement:scwk8kd3@scgw6st3"))
            {
                this.IsAdmin = true;
            }

            this.IsFao = false;
            if (this.Department != null && this.Department.Contains("Financial Aid"))
            {
                this.IsFao = true;
            }

            this.IsRnr = false;
            if (this.Department != null && this.Department.Contains("Academic Records & Registrar"))
            {
                this.IsRnr = true;
            }

            this.IsBur = false;
            if (this.Department != null && this.Department.Contains("Financial Services"))
            {
                this.IsBur = true;
            }
#if (DEBUG)

        SetUserRole();              // Get the User Role from Cookies

#endif
        }

        internal string UscId { get; private set; }

        internal string FirstName { get; private set; }

        internal string Surname { get; private set; }

        internal string School { get; private set; } 

        internal string Department { get; private set; }

        internal string Email { get; private set; }

        internal string Phone { get; private set; }

        internal bool IsAdmin { get; private set; }

        internal bool IsFao { get; private set; }

        internal bool IsRnr { get; private set; }

        internal bool IsBur { get; private set; }

    }
}