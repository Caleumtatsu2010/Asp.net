using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication6.Controllers
{
    public class HelloController : Controller
    {
        // GET: Hello
        public ActionResult Index()
        {
            ViewBag.Message = "Lien ket cua toi";
            return View();
        }
        public String ChaoMung(String ten, int solan)
        {
            return HttpUtility.HtmlEncode("Xin chao "+ten+" So lan la"+solan);

        }

    }
}