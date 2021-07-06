using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication6.Controllers
{
    public class ThongTinSinhVienController : Controller
    {
        // GET: ThongTinSinhVien
        public ActionResult Index(string masv, String hoten, String ngaysinh, String quequan)
        {
           
            return View();
        }
    }
}