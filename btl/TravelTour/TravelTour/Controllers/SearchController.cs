using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;

namespace TravelTour.Controllers
{
    public class SearchController : Controller
    {
        travel db = new travel();

        // GET: Search
        public ActionResult Index(string tourname)
        { 
            //lay ra loai tour theo ten

            var list = db.Tours.Where(y => y.Name.Contains(tourname)).ToList();
            ViewBag.TourName = tourname;
            return View(list);
            

        }
    }
}