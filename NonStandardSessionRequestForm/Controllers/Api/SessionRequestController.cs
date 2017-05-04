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
using System.Web.Http;
using UvApi.RnrSWebSess.Client;

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
        public async Task<IHttpActionResult> GetSubmissions(string department = null, string status = null)
        {
            try
            {
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
           ""term"": ""20171"",
           ""rateTypes"": [
             {
                 ""rateTypeCode"": ""STD"",
                 ""rateTypeDesc"": ""MAIN ON-CAMPUS SESSION"",
                 ""rateTypeUnitRate"": ""24732"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""GB"",
                 ""rateTypeDesc"": ""Graduate Business"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1710""
             },
             {
                 ""rateTypeCode"": ""GCA"",
                 ""rateTypeDesc"": ""Graduate Cinematic Arts"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1772""
             },
             {
                 ""rateTypeCode"": ""GE"",
                 ""rateTypeDesc"": ""Graduate Engineering"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1774""
             },
             {
                 ""rateTypeCode"": ""DT3"",
                 ""rateTypeDesc"": ""Dentistry"",
                 ""rateTypeUnitRate"": ""28142"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""AD3"",
                 ""rateTypeDesc"": ""Advanced Dentistry"",
                 ""rateTypeUnitRate"": ""28445"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""LAW"",
                 ""rateTypeDesc"": ""Law"",
                 ""rateTypeUnitRate"": ""28643"",
                 ""rateTypeFlatRate"": ""2214""
             },
             {
                 ""rateTypeCode"": ""MED"",
                 ""rateTypeDesc"": ""Medicine"",
                 ""rateTypeUnitRate"": ""28424"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                   ""rateTypeCode"": ""OTH"",
                   ""rateTypeDesc"": ""Others"",
                   ""rateTypeUnitRate"": """",
                   ""rateTypeFlatRate"": """"
             }
           ]        
       },
       {
           ""term"": ""20172"",
           ""rateTypes"": [
             {
                 ""rateTypeCode"": ""STD"",
                 ""rateTypeDesc"": ""MAIN ON-CAMPUS SESSION"",
                 ""rateTypeUnitRate"": ""24732"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""GB"",
                 ""rateTypeDesc"": ""Graduate Business"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1710""
             },
             {
                 ""rateTypeCode"": ""GCA"",
                 ""rateTypeDesc"": ""Graduate Cinematic Arts"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1772""
             },
             {
                 ""rateTypeCode"": ""GE"",
                 ""rateTypeDesc"": ""Graduate Engineering"",
                 ""rateTypeUnitRate"": ""n/a"",
                 ""rateTypeFlatRate"": ""1774""
             },
             {
                 ""rateTypeCode"": ""DT3"",
                 ""rateTypeDesc"": ""Dentistry"",
                 ""rateTypeUnitRate"": ""28142"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""AD3"",
                 ""rateTypeDesc"": ""Advanced Dentistry"",
                 ""rateTypeUnitRate"": ""28445"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""LAW"",
                 ""rateTypeDesc"": ""Law"",
                 ""rateTypeUnitRate"": ""28643"",
                 ""rateTypeFlatRate"": ""2214""
             },
             {
                 ""rateTypeCode"": ""MED"",
                 ""rateTypeDesc"": ""Medicine"",
                 ""rateTypeUnitRate"": ""28424"",
                 ""rateTypeFlatRate"": ""1666""
             },
             {
                 ""rateTypeCode"": ""OTH"",
                 ""rateTypeDesc"": ""Others"",
                 ""rateTypeUnitRate"": """",
                 ""rateTypeFlatRate"": """"
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
                return InternalServerError(apiEx);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("Failed to POST session to SIS! Error: {Error}", ex.Message);
                return InternalServerError(ex);
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

        //[Route("authorization/users/{uscId}")]
        //public async Task<IHttpActionResult> GetUser(string uscId)
        //{
        //try
        //{
        //    using (var client = new RNRSessionRequestAPI(_dataApiUri))
        //    {
        //        await clien
        //        return Ok();
        //    }
        //}
        //catch (HttpOperationException apiEx)
        //{
        //    Log.Logger.Error("Failed to PUT submission! Error: {Error}", apiEx.Message);
        //    return InternalServerError(apiEx);
        //}
        //catch (Exception ex)
        //{
        //    Log.Logger.Error("Failed to PUT submission! Error: {Error}", ex.Message);
        //    return InternalServerError(ex);
        //}
        //}

    }
}