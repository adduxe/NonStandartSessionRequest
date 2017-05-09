using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers
{
    public class UserRoleHelper
    {
        internal bool IsAdmin()
        {
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBEPENTITLEMENT"];

            if (entitlements != null && entitlements.Contains("urn:mace:usc.edu:gds:entitlement:scwk8kd3@scgw6st3"))
            {
                return true;
            }

            return false;
        }

        internal bool IsFao()
        {
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

            if (entitlements != null && entitlements.Contains("Financial Aid"))
            {
                return true;
            }

            return false;
        }

        internal bool IsRnr()
        {
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

            if (entitlements != null && entitlements.Contains("Academic Records & Registrar"))
            {
                return true;
            }

            return false;
        }

        internal bool IsBur()
        {
            var entitlements = HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONDEPARTMENT"];

            if (entitlements != null && entitlements.Contains("Financial Services"))
            {
                return true;
            }

            return false;
        }
    }
}