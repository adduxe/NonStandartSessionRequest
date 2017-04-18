using DataApiClient;
using DataApiClient.Models;
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
                using (var client = new DataAPI(new Uri(ConfigurationManager.AppSettings["DataApiUrl"])))
                {
                    client.SessionRequest.PostBySessionDTO(session);
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
                using (var client = new DataAPI(new Uri(ConfigurationManager.AppSettings["DataApiUrl"])))
                {
                    sessionRequest = client.SessionRequest.GetByRequestId(requestId);
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