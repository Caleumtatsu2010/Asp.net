using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;
using TravelTour.Models.DAO;

namespace TravelTour.Controllers
{
    public class PayController : Controller
    {
        travel db = new travel();
        // GET: Pay
        public ActionResult Index(int TourCode,  DateTime DeptTime, int elder, int kid)
        {
            //int TourCode = Convert.ToInt32(TempData["TourCode"]);

            var tour = db.Tours.Find(TourCode);

            ViewBag.TotalPrice = (tour.newPrice * elder) + ( tour.newPrice * 0.8 * kid );
            ViewBag.TotalPeople = elder + kid;

            ViewBag.DeptTime = DeptTime;

            return View(tour);
        }

        [HttpGet]
        public ActionResult Paid(string Payment, string CustomerName,  int TourCode, string CustomerPhone, string CustomerMail, string CustomerAddress, DateTime DeptTime, int TotalPrice, int TotalPeople, string Note)
        {
            var booking = new Booking();
            var b = new BookingDAO();
            booking.Payment = Payment;
            booking.CustomerName = CustomerName;
            booking.TourCode = TourCode;
            booking.CustomerPhone_ = CustomerPhone;
            booking.CustomerMail = CustomerMail;
            booking.CustomerAddress = CustomerAddress;
            booking.CustomerAddress = CustomerAddress;
            booking.DeptTime = DeptTime;
            booking.TotalPrice = TotalPrice;

            booking.TotalPeople = TotalPeople;
            booking.Note = booking.Note;

            int bookingcode = b.Insert(booking);

            //db.Bookings.Find(booking.TourCode);

            for(int i = 0; i< TotalPeople;i++)
            {
                var passenger = new Passenger();
                passenger.BookingCode = bookingcode;

                passenger.AgeType = "elder";
                db.Passengers.Add(passenger);
                db.SaveChanges();

            }
            return RedirectToAction("Index", "Home");
        }


    }
}