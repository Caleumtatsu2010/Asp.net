using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication7.Controllers
{
    public class TinhTienController : Controller
    {
        // GET: TinhTien
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult TinhTien()
        {
            String manv = Request["manv"];
            int bacluong =Int32.Parse(Request["bacluong"]);
            int ngaycong = Int32.Parse(Request["ngaycong"]);
            String chucvu = Request["chucvu"];
            String nam = Request["nam"];
            String nu = Request["nu"];
            String anh = Request["anh"];
            String phap = Request["phap"];
            String nga = Request["nga"];
            //int tienlinh = Int32.Parse(Request["tienlinh"]);
            int NCTL;
            if(ngaycong < 25)
            {
                NCTL = ngaycong;
            }
            else
            {
                NCTL = (ngaycong - 25) * 2 + 25;
            }
            int phucap = 0;
            if (chucvu == "Trưởng Phòng")
                phucap = 500000;
            else if (chucvu == "Phó Phòng")
                phucap = 300000;

            int tienlinh = bacluong * 650000 * NCTL + phucap;

            ViewBag.manv = manv;
            ViewBag.ngaycong = ngaycong;
            ViewBag.tienlinh = tienlinh;
            return View();

        }
    }
}