using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers
{
    public class UserHelper
    {
        internal string FirstName
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONFIRSTNAME"];
            }
        }

        internal string Surname
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONSURNAME"];
            }
        }

        internal string Department
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];
            }
        }

        internal bool IsAdmin
        {
            get
            {
                var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBEPENTITLEMENT"];

                if (entitlements != null && entitlements.Contains("urn:mace:usc.edu:gds:entitlement:scwk8kd3@scgw6st3"))
                {
                    return true;
                }

                return false;
            }
        }

        internal bool IsFao
        {
            get
            {
                var department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

                if (department != null && department.Contains("Financial Aid"))
                {
                    return true;
                }

                return false;
            }
        }

        internal bool IsRnr
        {
            get
            {
                var department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

                if (department != null && department.Contains("Academic Records & Registrar"))
                {
                    return true;
                }

                return false;
            }
        }

        internal bool IsBur
        {
            get
            {
                var department = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

                if (department != null && department.Contains("Financial Services"))
                {
                    return true;
                }

                return false;
            }
        }
    }
}