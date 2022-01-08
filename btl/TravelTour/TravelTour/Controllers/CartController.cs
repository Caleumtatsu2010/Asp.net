using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;
using TravelTour.Models.CLASS;

namespace TravelTour.Controllers
{

    public class CartController : Controller
    {
        travel db = new travel();
        private const string CartSession = "CartSession";

        // GET: Cart
        public ActionResult Index()
        {

            //lay ra session tu list
            var cart = Session[CartSession];

            //danh sach tour
            var list = new List<CartItem>();
            if (cart != null)
            {
                list = (List<CartItem>)cart;
            }

            return View(list);
        }




        public ActionResult AddItem(int id)
        {
            //lay session
            var cart = Session[CartSession];

            //neu session co gia tri
            if (cart != null)
            {
                //lay ra session convert sang list
                var list = (List<CartItem>)cart;

                //tạo mới đối tượng cart item
                var item = new CartItem();

                Tour tour = db.Tours.Find(id);
                item.tour = tour;

                list.Add(item);
                //Gán lại list vào session
                Session[CartSession] = list;
            }
            else//neu session null
            {
                //tạo mới đối tượng cart item
                var item = new CartItem();
                Tour tour = db.Tours.Find(id);
                item.tour = tour;

                var list = new List<CartItem>();
                //gán vào list
                list.Add(item);

                //Gán lại list vào session
                Session[CartSession] = list;
            }

            string url = this.Request.UrlReferrer.AbsolutePath;
            return Redirect(url);
        }

        //xoa item trong gio hang
        public ActionResult Delete(int delId)
        {
            var sessionCart = (List<CartItem>)Session[CartSession];

            sessionCart.RemoveAll(x => x.tour.TourCode == delId);
            Session[CartSession] = sessionCart;
            return RedirectToAction("Index");
        }
    }
}