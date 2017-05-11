using Microsoft.Rest;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using SessionRequestApi.Client;
using SessionRequestApi.Client.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using USC.RNR.NonStandardSessionRequestForm.Controllers.Helpers;
using UvApi.RnrSWebSess.Client;
using System.Net.Mail;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Api
{
    [RoutePrefix("api")]
    public class SessionRequestController : ApiController
    {
        private readonly Uri _dataApiUri = new Uri(ConfigurationManager.AppSettings["DataApiUrl"]);
        private readonly Uri _uvApiUri = new Uri(ConfigurationManager.AppSettings["UvApiUrl"]);
        private readonly Uri _peApiUri = new Uri(ConfigurationManager.AppSettings["PeApiUrl"]);

        [Route("sessionrequests")]
        public async Task<IHttpActionResult> PostSessionRequest(Session session)
        {
            try
            {
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    session.SubmitDate = DateTime.Now;
                    var createdSession = await client.SessionRequest.PostBySessionDTOAsync(session);
                    var submission = new Submission
                    {
                        RequestId = createdSession.RequestId,                        
                    };

                    await client.Submissions.PostBySubmissionDTOAsync(submission);

                    return Ok(createdSession.RequestId);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to POST session! Error: {Error}", apiEx.Message);
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
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    var sessionRequest = await client.SessionRequest.GetByRequestIdAsync(requestId);
                    var json = JsonConvert.SerializeObject(sessionRequest, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore, PreserveReferencesHandling = PreserveReferencesHandling.All });
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
            string status = "Pending";

            try
            {
                var user = new UserHelper();

                if (user.IsAdmin == false)
                {
                    return NotFound();
                }

                if (user.IsFao)
                {
                    department = "Fao";
                }

                if (user.IsRnr)
                {
                    department = "Rnr";
                }

                if (user.IsBur)
                {
                    status = "Approved";
                }

                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    var sessionRequest = await client.Submissions.GetByDepartmentStatusAsync(department, status);
                    var json = JsonConvert.SerializeObject(sessionRequest, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore, PreserveReferencesHandling = PreserveReferencesHandling.All });
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
        public async Task<IHttpActionResult> PutSubmission(int submissionId, Submission submission)
        {
            try
            {
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
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

        [Route("ratetable")]
        public async Task<IHttpActionResult> GetRateTable()
        {
            try
            {
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    var json = @"[
                           {
                               ""term"": ""20172"",
                               ""rateTypes"": [
                                 {
                                     ""rateTypeCode"": ""STD"",
                                     ""rateTypeDesc"": ""Standard (session 001)"",
                                     ""rateTypeUnitRate"": ""1733"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""GBUS"",
                                     ""rateTypeDesc"": ""Graduate Business"",
                                     ""rateTypeUnitRate"": ""1778"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""GCINA"",
                                     ""rateTypeDesc"": ""Graduate Cinematic Arts"",
                                     ""rateTypeUnitRate"": ""1843"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""GENGR"",
                                     ""rateTypeDesc"": ""Graduate Engineering"",
                                     ""rateTypeUnitRate"": ""1845"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""LAW"",
                                     ""rateTypeDesc"": ""Law"",
                                     ""rateTypeUnitRate"": ""2303"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""MRED"",
                                     ""rateTypeDesc"": ""Master of Real Estate Development"",
                                     ""rateTypeUnitRate"": ""1921"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""PHAR"",
                                     ""rateTypeDesc"": ""Pharmacy"",
                                     ""rateTypeUnitRate"": ""1761"",
                                     ""rateTypeFlatRate"": """"
                                 }
                               ]        
                           },
                           {
                               ""term"": ""20173"",
                               ""rateTypes"": [
                                 {
                                     ""rateTypeCode"": ""STD"",
                                     ""rateTypeDesc"": ""Standard (session 001)"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""26724""
                                 },
                                 {
                                     ""rateTypeCode"": ""GBUS"",
                                     ""rateTypeDesc"": ""Graduate Business"",
                                     ""rateTypeUnitRate"": ""1847"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""GCINA"",
                                     ""rateTypeDesc"": ""Graduate Cinematic Arts"",
                                     ""rateTypeUnitRate"": ""1915"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""ADVDE"",
                                     ""rateTypeDesc"": ""Advanced Dentistry"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30736""
                                 },
                                 {
                                     ""rateTypeCode"": ""DENT"",
                                     ""rateTypeDesc"": ""Dentistry"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30409""
                                 },
                                 {
                                     ""rateTypeCode"": ""DH"",
                                     ""rateTypeDesc"": ""Dental Hygiene"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""24769""
                                 },
                                 {
                                     ""rateTypeCode"": ""GENGR"",
                                     ""rateTypeDesc"": ""Graduate Engineering"",
                                     ""rateTypeUnitRate"": ""1937"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""LAW"",
                                     ""rateTypeDesc"": ""Law"",
                                     ""rateTypeUnitRate"": ""2393"",
                                     ""rateTypeFlatRate"": ""30949""
                                 },
                                 {
                                     ""rateTypeCode"": ""MED"",
                                     ""rateTypeDesc"": ""Medicine"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30714""
                                 }
                               ]     
                           },
                           {
                               ""term"": ""20181"",
                               ""rateTypes"": [
                                 {
                                     ""rateTypeCode"": ""STD"",
                                     ""rateTypeDesc"": ""Standard (session 001)"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""26724""
                                 },
                                 {
                                     ""rateTypeCode"": ""GBUS"",
                                     ""rateTypeDesc"": ""Graduate Business"",
                                     ""rateTypeUnitRate"": ""1847"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""GCINA"",
                                     ""rateTypeDesc"": ""Graduate Cinematic Arts"",
                                     ""rateTypeUnitRate"": ""1915"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""ADVDE"",
                                     ""rateTypeDesc"": ""Advanced Dentistry"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30736""
                                 },
                                 {
                                     ""rateTypeCode"": ""DENT"",
                                     ""rateTypeDesc"": ""Dentistry"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30409""
                                 },
                                 {
                                     ""rateTypeCode"": ""DH"",
                                     ""rateTypeDesc"": ""Dental Hygiene"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""24769""
                                 },
                                 {
                                     ""rateTypeCode"": ""GENGR"",
                                     ""rateTypeDesc"": ""Graduate Engineering"",
                                     ""rateTypeUnitRate"": ""1937"",
                                     ""rateTypeFlatRate"": """"
                                 },
                                 {
                                     ""rateTypeCode"": ""LAW"",
                                     ""rateTypeDesc"": ""Law"",
                                     ""rateTypeUnitRate"": ""2393"",
                                     ""rateTypeFlatRate"": ""30949""
                                 },
                                 {
                                     ""rateTypeCode"": ""MED"",
                                     ""rateTypeDesc"": ""Medicine"",
                                     ""rateTypeUnitRate"": ""1800"",
                                     ""rateTypeFlatRate"": ""30714""
                                 }
                               ]     
                           }
                        ]";

                    return ResponseMessage(new HttpResponseMessage
                    {
                        Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
                    });
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET rate table! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET rate table! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

        [Route("rnrswebsess")]
        public async Task<IHttpActionResult> PostRnrSWebSess(JToken json)
        {
            try
            {
                using (var client = new UvApiClient(_uvApiUri))
                {
                    await client.RnrSWebSess.PostAsync(json.ToString());
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

        [Route("sessions/{term}/001")]
        public async Task<IHttpActionResult> GetSession001(string term)
        {
            try
            {
                using (var client = new PE.Api.Client.RnrAppsClient(_peApiUri))
                {
                    var sessionDate = client.SessionDates.Get(term, "001");
                    if (sessionDate == null)
                    {
                        return NotFound();
                    }
                    return Ok(sessionDate);
                }
            }
            catch (HttpOperationException apiEx)
            {
                Log.Logger.Error("Failed to GET Session 001 dates! Error: {Error}", apiEx.Message);
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to GET Session 001 dates! Error: {Error}", ex.Message);
                return InternalServerError(ex);
            }
        }

//        [Route("email")]
//        public IHttpActionResult PostEmail(object sender, EventArgs e)
//        {

//            string returnVal = "";

//            try
//            {
//                MailMessage mail = new MailMessage();
//                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

//                mail.From = new MailAddress("donotreply@usc.edu");
//                mail.To.Add("adduxe@yahoo.com");
//                mail.Subject = "Test Mail";
//                mail.Body = "This is for testing SMTP mail from GMAIL";

//                SmtpServer.Port = 587;
//                SmtpServer.Credentials = new System.Net.NetworkCredential("adduxe", "Al@d5150");
//                SmtpServer.EnableSsl = true;

//                SmtpServer.Send(mail);
//                // MessageBox.Show("mail Send");
//                returnVal = ("mail Send");
//            }
//            catch (Exception ex)
//            {
//                // MessageBox.Show(ex.ToString());
//                returnVal = (ex.ToString());
//            }
////            return returnVal;
//        }   // email

    }
}