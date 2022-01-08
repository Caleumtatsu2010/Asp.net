using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;

namespace TravelTour.Controllers
{
    public class HomeController : Controller
    {
        travel db = new travel();
        public ActionResult Index()
        {
            ViewBag.NewProducts1 = db.Tours.Where(s => s.TourCategoryCode == 1).Take(5).ToList();


            ViewBag.NewProducts2 = db.Tours.Where(s => s.TourCategoryCode == 2).Take(5).ToList();


            ViewBag.NewProducts3 = db.Tours.Where(s => s.TourCategoryCode == 3).Take(5).ToList();
            return View();
        }


    }
}