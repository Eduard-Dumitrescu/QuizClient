using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Communication.Applications;
using QuizClient.FilterAttribute;
using QuizClient.Models;

namespace QuizClient.Controllers
{
    public class AdminController : Controller
    {
        private UserSessionApplication _userSession;
        public string controllerRedirect { get; set; }

        public AdminController()
        {
            _userSession = new UserSessionApplication("http://localhost:12358/api");
        }
        
        //[AuthorizeAdmin]
        public ActionResult Index()
        {
       
            var model = new LoginViewModel();
          
            return View(model);
        }

        public ActionResult Users()
        {

            return View();
        }
        public ActionResult Questions()
        {

            return View();
        }
        public ActionResult Categories()
        {

            return View();
        }
        public ActionResult Tests()
        {

            return View();
        }

        public ActionResult Logout()
        {
            _userSession.EndSession("/EndSession",new Guid(Request.Cookies["Authorization"].ToString()));
            return RedirectToAction("Index", "Home");
        }

        public  ActionResult AuthorizeRedirect()
        {
            if (String.IsNullOrEmpty(controllerRedirect))
                return RedirectToAction("Index","Login");
            return RedirectToAction("Index", controllerRedirect);
        }

        public string checkCookie()
        {
            var cookie = Request.Cookies["Authorization"];

            if (cookie == null)
                return "Login";

            var userSessionData = _userSession.GetSessionData("/UserSession", new Guid(cookie.Value));

            if (!userSessionData.IsActive)
                return "Login";

            if (!userSessionData.IsAdmin)
               return "User";

            return String.Empty;
        }


    }
}