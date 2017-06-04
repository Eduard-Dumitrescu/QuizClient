using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Communication.Models;
using Newtonsoft.Json;

namespace Communication.Applications
{
    public class UserSessionApplication : BaseApplication
    {
        public UserSessionApplication(string baseURL) : base(baseURL)
        {
            
        }

        public UserSessionResponseModel GetSessionData(string appendToPath,Guid sessionId)
        {
            var result = new UserSessionResponseModel();

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(BaseUrl + appendToPath);

            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.Headers["Authorization"] = sessionId.ToString();
            httpWebRequest.ContentLength = 0;

            string jsonResult = String.Empty;

            try
            {
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    jsonResult = streamReader.ReadToEnd();
                }

                result = JsonConvert.DeserializeObject<UserSessionResponseModel>(jsonResult);
             
            }
            catch (WebException e)
            {

            }

            return result;
        }

        public void EndSession(string appendToPath,Guid sessionId)
        {
            var result = new UserSessionResponseModel();

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(BaseUrl + appendToPath);

            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.Headers["Authorization"] = sessionId.ToString();
            httpWebRequest.ContentLength = 0;

            string jsonResult = String.Empty;

            try
            {
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
               
            }
            catch (WebException e)
            {

            }
        }

    }
}
