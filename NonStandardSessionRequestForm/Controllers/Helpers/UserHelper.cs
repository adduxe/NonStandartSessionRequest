using System;
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

        internal string UscId
        {
            get
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_SHIBUSCPERSONUSCID"];
            }
        }
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
                if (_superUsers.Any(u => u == this.UscId))
                {
                    return true;
                }

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
                if (_superUsers.Any(u => u == this.UscId))
                {
                    return true;
                }

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
                if (_superUsers.Any(u => u == this.UscId))
                {
                    return true;
                }

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
                if (_superUsers.Any(u => u == this.UscId))
                {
                    return true;
                }

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