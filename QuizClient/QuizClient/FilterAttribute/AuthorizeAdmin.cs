using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuizClient.Controllers;

namespace QuizClient.FilterAttribute
{
    public class AuthorizeAdmin : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var adminController = filterContext.Controller as AdminController;
           
            if (!String.IsNullOrEmpty(adminController.checkCookie()))
                filterContext.Result = adminController.AuthorizeRedirect();
        }
    }
}