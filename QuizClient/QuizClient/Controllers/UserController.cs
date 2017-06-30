using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Communication.Applications;
using QuizClient.FilterAttribute;

namespace QuizClient.Controllers
{
   
    public class UserController : Controller
    {
        public string controllerRedirect { get; set; }


        // GET: User
        //[AuthorizeUser]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AuthorizeRedirect()
        {
            if (String.IsNullOrEmpty(controllerRedirect))
                return RedirectToAction("Index", "Login");
            return RedirectToAction("Index", controllerRedirect);
        }

        public string checkCookie()
        {
            var cookie = Request.Cookies["Authorization"];

            if (cookie == null)
                return "Login";

            var userSession = new UserSessionApplication("https://localhost:44361/api");
            var userSessionData = userSession.GetSessionData("/UserSession", new Guid(cookie.Value));

            if (!userSessionData.IsActive)
                return "Login";

            if (userSessionData.IsAdmin)
                return "Admin";

            return String.Empty;
        }


    }
}