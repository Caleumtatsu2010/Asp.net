using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication7.Models;

namespace WebApplication7.Controllers
{
    public class StudentRegistationController : Controller
    {
        // GET: StudentRegistation
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Regis(Student s)
        {
            return View(s);
        }
    }
}