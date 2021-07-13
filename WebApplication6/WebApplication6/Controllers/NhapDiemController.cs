using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication6.Controllers
{
    public class NhapDiemController : Controller
    {
        // GET: NhapDiem
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult XuLy()
        {
            string id = Request["ID"];
            string name = Request["Name"];
            double mark = Convert.ToDouble((Request["Mark"]));
            ViewBag.ID = id;
            ViewBag.Name = name;
            ViewBag.Mark = mark;
            return View();
        }
        public ActionResult XuLy2(SinhVien sv)
        {
            string id = sv.ID;
            string name = sv.Name;
            double mark = sv.Mark;
            ViewBag.ID = id;
            ViewBag.Name = name;
            ViewBag.Mark = mark;
            return View();
        }
    }
}