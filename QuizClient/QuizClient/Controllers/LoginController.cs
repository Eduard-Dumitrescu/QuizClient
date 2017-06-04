using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Communication.Applications;
using QuizClient.Models;

namespace QuizClient.Controllers
{
    public class LoginController : Controller
    {
        private LoginApplication _loginApplication;

        public LoginController()
        {
            _loginApplication = new LoginApplication("http://localhost:12358/api");
        }

        // GET: Login
        public ActionResult Index()
        {
            var model = new LoginViewModel()
            {
                Message = String.Empty
            };
            if (Response.Cookies.AllKeys.Contains("Authorization"))
            {
                model.Message = Response.Cookies["Authorization"].Value;
            }
            return View(model);
        }

        [HttpPost]
        public ActionResult Index(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                model.Message = "Incorect email format";
                return View("Index", model);
            }

            var user = new LoginModel()
            {
                Username = model.Username,
                Password = model.Password
            };

            var response = _loginApplication.Login("/user", user);

            if (response.StatusCode != 200)
            {
                model.Message = response.Message;

                return View("Index", model);
            }

            Response.Cookies.Add(new HttpCookie("Authorization",response.Authorization));

            if (response.Message.Equals("Admin"))
                return RedirectToAction("Index", "Admin");

            return RedirectToAction("Index", "User");
        }
    }
}