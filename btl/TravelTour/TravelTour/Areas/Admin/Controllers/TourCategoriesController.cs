using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;

namespace TravelTour.Areas.Admin.Controllers
{
    public class TourCategoriesController : Controller
    {
        private travel db = new travel();

        // GET: Admin/TourCategories
        public ActionResult Index()
        {
            return View(db.TourCategories.ToList());
        }

        // GET: Admin/TourCategories/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TourCategory tourCategory = db.TourCategories.Find(id);
            if (tourCategory == null)
            {
                return HttpNotFound();
            }
            return View(tourCategory);
        }

        // GET: Admin/TourCategories/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/TourCategories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TourCategoryCode,CategoryName,Intro")] TourCategory tourCategory)
        {
            if (ModelState.IsValid)
            {
                db.TourCategories.Add(tourCategory);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tourCategory);
        }

        // GET: Admin/TourCategories/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TourCategory tourCategory = db.TourCategories.Find(id);
            if (tourCategory == null)
            {
                return HttpNotFound();
            }
            return View(tourCategory);
        }

        // POST: Admin/TourCategories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "TourCategoryCode,CategoryName,Intro")] TourCategory tourCategory)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tourCategory).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tourCategory);
        }

        // GET: Admin/TourCategories/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TourCategory tourCategory = db.TourCategories.Find(id);
            if (tourCategory == null)
            {
                return HttpNotFound();
            }
            return View(tourCategory);
        }

        // POST: Admin/TourCategories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TourCategory tourCategory = db.TourCategories.Find(id);
            db.TourCategories.Remove(tourCategory);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
