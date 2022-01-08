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
    public class BookingsController : Controller
    {
        private travel db = new travel();

        // GET: Admin/Bookings
        public ActionResult Index()
        {
            var bookings = db.Bookings.Include(b => b.Member).Include(b => b.Tour);
            return View(bookings.ToList());
        }

        // GET: Admin/Bookings/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            return View(booking);
        }

        // GET: Admin/Bookings/Create
        public ActionResult Create()
        {
            ViewBag.BookedByMemberID = new SelectList(db.Members, "ID", "Username");
            ViewBag.TourCode = new SelectList(db.Tours, "TourCode", "Name");
            return View();
        }

        // POST: Admin/Bookings/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "BookingCode,TourCode,CustomerName,CustomerMail,CustomerPhone_,CustomerAddress,Note,DeptTime,StartDepart,Payment,TotalPrice,TotalPeople,BookedByMemberID")] Booking booking)
        {
            if (ModelState.IsValid)
            {
                db.Bookings.Add(booking);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.BookedByMemberID = new SelectList(db.Members, "ID", "Username", booking.BookedByMemberID);
            ViewBag.TourCode = new SelectList(db.Tours, "TourCode", "Name", booking.TourCode);
            return View(booking);
        }

        // GET: Admin/Bookings/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            ViewBag.BookedByMemberID = new SelectList(db.Members, "ID", "Username", booking.BookedByMemberID);
            ViewBag.TourCode = new SelectList(db.Tours, "TourCode", "Name", booking.TourCode);
            return View(booking);
        }

        // POST: Admin/Bookings/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "BookingCode,TourCode,CustomerName,CustomerMail,CustomerPhone_,CustomerAddress,Note,DeptTime,StartDepart,Payment,TotalPrice,TotalPeople,BookedByMemberID")] Booking booking)
        {
            if (ModelState.IsValid)
            {
                db.Entry(booking).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.BookedByMemberID = new SelectList(db.Members, "ID", "Username", booking.BookedByMemberID);
            ViewBag.TourCode = new SelectList(db.Tours, "TourCode", "Name", booking.TourCode);
            return View(booking);
        }

        // GET: Admin/Bookings/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            return View(booking);
        }

        // POST: Admin/Bookings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Booking booking = db.Bookings.Find(id);
            db.Bookings.Remove(booking);
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
