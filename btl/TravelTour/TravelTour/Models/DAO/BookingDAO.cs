using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelTour.Models.DAO
{
    public class BookingDAO
    {
        travel db = null;
        public BookingDAO()
        {
            db = new travel();
        }
        public int Insert(Booking book)
        {
            db.Bookings.Add(book);
            db.SaveChanges();
            return book.BookingCode;
        }
    }
}