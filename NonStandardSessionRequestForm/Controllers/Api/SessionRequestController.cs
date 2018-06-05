using Microsoft.Rest;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;
using System.Net.Mail;
using System.Collections.Generic;
using DataApi.Models;
using DataApi;
using PeApi;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Api
{

    [RoutePrefix("api")]
    public class SessionRequestController : ApiController
    {
        private readonly Uri _dataApiUri = new Uri(ConfigurationManager.AppSettings["DataApiUrl"]);
        private readonly Uri _uvApiUri = new Uri(ConfigurationManager.AppSettings["UvApiUrl"]);
        private readonly Uri _peApiUri = new Uri(ConfigurationManager.AppSettings["PeApiUrl"]);

        [Route("sessionrequests")]
        public async Task<IHttpActionResult> PostSessionRequest(SessionDTO session)
        {
            try
            {
                using (var client = new DataAPI(_dataApiUri))
                {
                    var user = new UserHelper();
                    session.OwningSchool = user.School;
                    session.OwningDepartment = user.Department;
                    session.UserContact = user.FirstName + " " + user.Surname;
                    session.UserEmail = user.Email;
                    session.UserPhone = user.Phone;
                    session.SubmitDate = DateTime.Now;
                    var createdSession = await client.SessionRequest.PostBySessionDTOAsync(session);
                    var submission = new SubmissionDTO
                    {
                        RequestId = createdSession.RequestId,
                    };

                    await client.Submissions.PostBySubmissionDTOAsync(submission);

                    return Ok(createdSession);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to POST session! Error: {Error}.  SessionRequest: {@SessionRequest}", apiEx.Message, session);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to POST session! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }


        [Route("sessionrequests/{requestId}")]
        public async Task<IHttpActionResult> GetSessionRequest(int requestId)
        {
            try
            {
                using (var client = new DataAPI(_dataApiUri))
                {
                    var sessionRequest = await client.SessionRequest.GetByRequestIdAsync(requestId);
                    var json = JsonConvert.SerializeObject(sessionRequest, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        PreserveReferencesHandling = PreserveReferencesHandling.All
                    });
                    return ResponseMessage(new HttpResponseMessage
                    {
                        Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
                    });
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET session! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET session! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }


        [Route("submissions")]
        public async Task<IHttpActionResult> GetSubmissions()
        {
            string department = null;
            string status = null;

            try
            {
                var user = new UserHelper();

                if (user.IsAdmin == false)
                {
                    return NotFound();
                }

                if (user.IsFao)     // Get the FAO Queue
                {
                    department = "Fao";
                    status = "Pending";
                }

                if (user.IsRnr)     // Get the RNR Queue
                {
                    department = "Rnr";
                    status = "Pending";

                }

                if (user.IsBur)     // Get the BUR Queue
                {
                    department = "Bur";
                }

                using (var client = new DataAPI(_dataApiUri))
                {
                    var sessionRequest = await client.Submissions.GetByDepartmentStatusAsync(department, status);
                    var json = JsonConvert.SerializeObject(sessionRequest, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        PreserveReferencesHandling = PreserveReferencesHandling.All
                    });
                    return ResponseMessage(new HttpResponseMessage
                    {
                        Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
                    });
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET submissions! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET submissions! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

        [Route("submissions/{submissionId}")]
        public async Task<IHttpActionResult> PutSubmission(int submissionId, SubmissionDTO submission)
        {
            try
            {
                using (var client = new DataAPI(_dataApiUri))
                {
                    await client.Submissions.PutBySubmissionIdSubmissionDTOAsync(submissionId, submission);
                    return Ok();
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to PUT submission! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to PUT submission! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

        [Route("specialfeecodes/{term}")]
        public IHttpActionResult GetSpecialFeeCodes(string term)
        {

            try
            {
                using (var client = new PEApi(_peApiUri))
                {
                    var feeCodes = client.SpecialFeeCodes.Get1(term);

                    if (feeCodes == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        List<string> SFCodes = new List<string>();
                        foreach (var specFeeCode in feeCodes)
                        {
                            SFCodes.Add(specFeeCode.FtCode + " " + specFeeCode.FtDescription);
                        }
                        return Ok(SFCodes);
                    }
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET Special Fee Codes for term " + term + "! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET Special Fee Codes for " + term + "! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }


        [Route("ratetable")]
        public IHttpActionResult GetRateTable()
        {
            try
            {
                using (var client = new PeApi.PEApi(_peApiUri))
                {
                    var rateTable = client.RateTable.Get();

                    if (rateTable == null)
                    {
                        return NotFound();
                    }

                    return Ok(rateTable);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET Rate Table! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET Rate Table! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }


        [Route("usclocations")]
        public IHttpActionResult GetUscLocations() {

            try
            {
                using (var client = new PEApi(_peApiUri))
                {
                    var uscLocations = client.UscLocations.Get();

                    if (uscLocations == null)
                        return NotFound();
                    else
                        return Ok(uscLocations);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET USC Locations! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET USC Locations! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }


        [Route("rnrswebsess")]
        public async Task<IHttpActionResult> PostRnrSWebSess(JToken json)
        {
            try
            {
                using (var client = new UvApi.USCCommonUVApi(_uvApiUri))
                {
                    await client.RnrSWebSess.PostWithHttpMessagesAsync(json.ToString());
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to POST session to SIS! Error: {Error}", apiEx.Response.Content);
                return Content(System.Net.HttpStatusCode.InternalServerError, apiEx.Response.Content);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to POST session to SIS! Error: {Error}", ex.Message);
                return InternalServerError();
            }

            return Ok();
        }

        [Route("sessioncodes")]
        public IHttpActionResult GetSessionCodes()
        {
            try
            {
                using (var client = new PEApi(_peApiUri))
                {
                    var sessionCodes = client.SessionCodes.Get();
                    
                    if (sessionCodes == null)
                    {
                        return NotFound();
                    }
                    return Ok(new { sessionCodes });
                }
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET Session Codes! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

        [Route("sessions/{term}/001")]
        public IHttpActionResult GetSession001(string term)
        {
            try
            {
                using (var client = new PEApi(_peApiUri))
                {
                    var sessionDate = client.SessionDates.Get1(term, "001");
                    if (sessionDate == null)
                    {
                        return NotFound();
                    }
                    return Ok(sessionDate);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Warning("Failed to GET Session 001 dates! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Warning("Failed to GET Session 001 dates! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

        private string FormatDate(DateTime? givenDate)
        {
            return String.Format("{0:MMMM dd, yyyy}", givenDate);
        }

        private string ComposeEmail(Submission submission)
        {

            string emailBody = "", decision = "", reason = "";

                // Determine whether it's an RNR or FAO decision
            if (!string.IsNullOrEmpty(submission.RnrAction) && (submission.RnrAction.Trim().Length > 0))
            {           // RNR
                decision = submission.RnrAction;
                reason = submission.RnrActionReason;

            } else {    // FAO

                decision = submission.FaoAction;
                reason = submission.FaoActionReason;
            }

            // Decide whether it's an Approval or Rejection email.
            switch (decision.Trim()) {

                case "A":       // Approval

                    emailBody = 
                        "Your Session Request for Session " + submission.Session.SessionCode + " for semester " + submission.Session.AcademicTerm + " has been approved.  Please do the following. <br/><br/>" +
                        "Check all dates for the session on SIS.D.SESS and communicate the dates to faculty. Once you have verified that fees appear on page 2 of SIS.D.SESS, please instruct students to register for the class.";
                    break;

                case "R":       // Rejection

                    string campusLoc = "";

                    if ((bool)submission.Session.IsClassHeldAtUpc)
                    {
                        campusLoc = "UPC";
                    }
                    else {
                        if (submission.Session.UscCampusLocation == "OTH") {
                            campusLoc = submission.Session.OtherCampusLocation;
                        }
                        else {
                            campusLoc = submission.Session.UscCampusLocation;
                        }
                    } // if ((bool...

                    emailBody =
                        "<table align='center'>" +
                        "<tr>" +
                        "	<th width='50%'>Academic Term</th>" +
                        "	<td width='50%'>" + submission.Session.AcademicTerm + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Session Code</th>" +
                        "	<td>" + submission.Session.SessionCode + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>First Day of Classes</th>" +
                        "	<td>" + FormatDate(submission.Session.FirstDayOfClass) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Last Day of Classes</th>" +
                        "	<td>" + FormatDate(submission.Session.LastDayOfClass) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Last Day to Add/Drop</th>" +
                        "	<td>" + FormatDate(submission.Session.LastDayForAddDrop) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Last Day to Withdraw</th>" +
                        "	<td>" + FormatDate(submission.Session.LastDayForWithdrawal) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Last Day for Enrollment Change</th>" +
                        "	<td>" + FormatDate(submission.Session.LastDayForEnrollmentOptionChange) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>First Day of Finals</th>" +
                        "	<td>" + FormatDate(submission.Session.FirstDayOfFinals) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Last Day of Finals</th>" +
                        "	<td>" + FormatDate(submission.Session.LastDayOfFinals) + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Campus Location</th>" +
                        "	<td>" + campusLoc + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "	<th>Reason for rejection:</th>" +
                        "	<td>" +
                            "<p>"
                            + reason +
                            "</p>" +
                        "</td>" +
                        "</tr>" +
                        "</table><br/>" +
                        "<b>For questions regarding your submission please call (213)740-4623</b>"
                        ;
                    break;

                default:
                    emailBody = "No decision on this Request yet.";
                    break;
            }


            return emailBody;

        }   // ComposeEmail()

        [Route("email/{submId}")]
        public async Task<IHttpActionResult> PostEmail(int submId)
        {

            try
            {
                Submission Submission;
                using (var client = new DataAPI(_dataApiUri))
                {
                    Submission = await client.Submissions.GetBySubmissionIdAsync(submId);
                }

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("email.usc.edu");
                mail.From = new MailAddress("donotreply@usc.edu");
                mail.To.Add(Submission.Session.UserEmail);
                mail.Subject = "Session Request Result (Request ID: " + Submission.RequestId + ")";
                mail.IsBodyHtml = true;
                mail.Body = ComposeEmail(Submission);

                SmtpServer.Send(mail);
                return Ok();
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET session! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }   // email

    }
}