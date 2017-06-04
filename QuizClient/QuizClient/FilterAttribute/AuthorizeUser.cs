using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuizClient.Controllers;

namespace QuizClient.FilterAttribute
{
    public class AuthorizeUser : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userController = filterContext.Controller as UserController;

            if (!String.IsNullOrEmpty(userController.checkCookie()))
                filterContext.Result = userController.AuthorizeRedirect();
        }
    }
}