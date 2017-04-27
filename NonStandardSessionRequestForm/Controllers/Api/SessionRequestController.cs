using Microsoft.Rest;
using Newtonsoft.Json;
using Serilog;
using SessionRequestApi.Client;
using SessionRequestApi.Client.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Api
{
    [RoutePrefix("api")]
    public class SessionRequestController : ApiController
    {
        private readonly Uri _dataApiUri = new Uri(ConfigurationManager.AppSettings["DataApiUrl"]);

        [Route("sessionrequests")]
        public async Task<IHttpActionResult> PostSessionRequest(Session session)
        {
            try
            {
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    var createdSession = await client.SessionRequest.PostBySessionDTOAsync(session);
                    return Ok(createdSession);
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

        [Route("submissions/pending")]
        public async Task<IHttpActionResult> GetPendingSubmissions()
        {
            try
            {
                using (var client = new RNRSessionRequestAPI(_dataApiUri))
                {
                    var sessionRequest = await client.Submissions.GetByDepartmentStatusAsync(status: "Pending");
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