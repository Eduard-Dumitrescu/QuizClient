using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Communication.Applications
{
    public class BaseApplication
    {
        public string BaseUrl { get; set; }

        public BaseApplication()
        {
                
        }

        public BaseApplication(string baseUrl)
        {
            BaseUrl = baseUrl;
        }
    }
}
