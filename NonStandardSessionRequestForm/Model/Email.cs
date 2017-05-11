using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace USC.RNR.NonStandardSessionRequestForm.Model
{
    public class Email
    {
        public string ToAddress { get; set; }
        public string FromAddress { get; set; }
        public string EmailBody { get; set; }

    }
}