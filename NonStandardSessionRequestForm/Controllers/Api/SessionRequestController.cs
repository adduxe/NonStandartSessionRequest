using DataApi;
using DataApi.Models;
using Microsoft.Rest;
using Serilog;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;

namespace USC.RNR.NonStandardSessionRequestForm.Controllers.Api
{
    [RoutePrefix("api")]
    public class SessionRequestController : ApiController
    {        
        [Route("sessionrequests")]
        public IHttpActionResult Post(Session session)
        {
            try
            {
                using (var client = new DataApiClient(new Uri(ConfigurationManager.AppSettings["DataApiUrl"])))
                {
                    client.SessionRequest.PostBysessionDTO(session);
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
        public IHttpActionResult Get(int requestId)
        {
            object sessionRequest;
            try
            {
                using (var client = new DataApiClient(new Uri(ConfigurationManager.AppSettings["DataApiUrl"])))
                {
                    sessionRequest = client.SessionRequest.GetByrequestId(requestId);
                }

                return Ok(sessionRequest);
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
    }
}