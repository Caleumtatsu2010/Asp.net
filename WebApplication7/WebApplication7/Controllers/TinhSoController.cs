using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication7.Controllers
{
    public class TinhSoController : Controller
    {
        // GET: TinhSo
        public ActionResult TinhSo()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult HienThi()
        {
            String firstname = Request["First_Name"];
            String lastname = Request["Last_Name"];
            String email = Request["Email"];
            String pass = Request["Password"];

            String diachi = Request["ddlCourse"];

            String gioitinh = Request["Gender"];


            ViewBag.firstname = firstname;
            ViewBag.lastname = lastname;
            ViewBag.email = email;
            ViewBag.pass = pass;

            ViewBag.diachi = diachi;
            ViewBag.gioitinh = gioitinh;









            return View();
        }

    }
}