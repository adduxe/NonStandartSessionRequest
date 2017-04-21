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
                    await client.SessionRequest.PostBySessionDTOAsync(session);
                    return Ok();
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
                    var sessionRequest = await client.Submissions.GetPendingAsync();
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
    }
}