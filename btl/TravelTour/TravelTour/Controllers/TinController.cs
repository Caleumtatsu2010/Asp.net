using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;

namespace TravelTour.Controllers
{
    public class TinController : Controller
    {
        travel db = new travel();

        // GET: Tin
        public ActionResult Index(int page = 1, int pagesize = 4)
        {

            var listnews = db.TinTucs.OrderBy(y => y.ID).ToPagedList(page, pagesize);
            return View(listnews);
        }

        public ActionResult Detail(int ID)
        {
            //lay ra chi tiet san pham dua theo ma
            var Detailnew =  db.TinTucs.Find(ID);


            return View(Detailnew);
        }
    }
}