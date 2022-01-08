using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VnSport.Models;
using VnSport.Models.DAO;

namespace VnSport.Controllers
{
    public class HomeController : Controller
    {
        vnsport db = new vnsport();
        public ActionResult Index()
        {
            var p = new SanPhamDAO();
            ViewBag.NewProducts1 = db.SanPhams.Where(s => s.maLoai == 1).Take(5).ToList();

            var p2 = new SanPhamDAO();
            ViewBag.NewProducts2 = db.SanPhams.Where(s => s.maLoai == 3).Take(5).ToList();

            var p3 = new SanPhamDAO();
            ViewBag.NewProducts3 = db.SanPhams.Where(s => s.maLoai == 7).Take(5).ToList();


            return View();
        }

      
    }
}