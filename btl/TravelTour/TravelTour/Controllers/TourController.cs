using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;

namespace TravelTour.Controllers
{
    public class TourController : Controller
    {
        travel db = new travel();

        // GET: Tour
        public ActionResult Index(int id)
        {
           

            if (id == 0)
            {
                //lay ra tat ca san pham

                ViewBag.AllProducts = db.Tours.ToList();

                ViewBag.TourName = "TẤT CẢ TOUR";
            }
            else
            {
                //lay ra tat ca san pham theo id (ma loai)
                ViewBag.AllProducts = db.Tours.Where(s => s.TourCategoryCode == id).ToList();

                var tour = db.TourCategories.Find(id);
                ViewBag.TourName ="TOUR " + tour.CategoryName;
            }

            return View();
        }

        public ActionResult Detail(int id)
        {
            //lay ra san pham dua theo ma
            var Detailproduct = db.Tours.Find(id);

            //lay ra san pham co cung TourCategoryCode
            ViewBag.related = db.Tours.Where(s => s.TourCategoryCode == Detailproduct.TourCategoryCode).ToList(); 
            return View(Detailproduct);
        }


    }
}