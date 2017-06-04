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
    public class LoginApplication : BaseApplication
    {
        public LoginApplication(string baseUrl) : base(baseUrl)
        {
        }

        public LoginResponseModel Login(string appendToPath,Object data)
        {
            var result = new LoginResponseModel();
          
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(BaseUrl + appendToPath);

            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            try
            {
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = JsonConvert.SerializeObject(data);

                    streamWriter.Write(json);
                    streamWriter.Flush();
                    streamWriter.Close();
                }
            }
            catch (WebException e)
            {
                result.Message = e.Message;
                result.Status = e.Status.ToString();
                result.StatusCode = 0;

                return result;
            }

            string jsonResult = String.Empty;

            try
            {
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    jsonResult = streamReader.ReadToEnd();
                }

                var obj = JsonConvert.DeserializeObject<LoginResponseModel>(jsonResult);
                result.StatusCode = (int)httpResponse.StatusCode;
                result.Message = obj.Message;
                result.Authorization = obj.Authorization;
            }
            catch (WebException e)
            {
                var response = (HttpWebResponse)e.Response;
                using (var streamReader = new StreamReader(response.GetResponseStream()))
                {
                    jsonResult = streamReader.ReadToEnd();
                }
                var obj = JsonConvert.DeserializeObject<LoginResponseModel>(jsonResult);
                result.StatusCode = (int)response.StatusCode;
                result.Message = obj.Message;
            }

            return result;
        }
    }
}
