using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VnSport.Models;
using VnSport.Models.DAO;

namespace VnSport.Controllers
{
    public class SanPhamController : Controller
    {
        vnsport db = new vnsport();
        // GET: SanPham
        public ActionResult Index(int id)
        {

            if (id == 0)
            {
                //lay ra tat ca san pham

                ViewBag.AllProducts = db.SanPhams.ToList();
            }
            else
            {
                //lay ra tat ca san pham theo id (ma loai)
                ViewBag.AllProducts = db.SanPhams.Where(s => s.maLoai == id).ToList();
            }

            return View();
        }

        //lay ra chi tiet san pham va san pham lien quan
        public ActionResult Detail(string id)
        {
            //lay ra chi tiet san pham dua theo ma
            var Detailproduct = db.SanPhams.Find(id);

            //lay ra 5 san pham co cung ma loai voi chi tiet san pham
            ViewBag.RelatedProducts = db.SanPhams.Where(x => x.maLoai == Detailproduct.maLoai).Take(5);
        
            return View(Detailproduct);
        }
    }
}