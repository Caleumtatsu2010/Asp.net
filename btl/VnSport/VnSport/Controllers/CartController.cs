using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VnSport.Models;
using VnSport.Models.CLASS;
using VnSport.Models.DAO;

namespace VnSport.Controllers
{
    public class CartController : Controller
    {
        private const string CartSession = "CartSession";

        // GET: Cart
        public ActionResult Index()
        {


            //lay ra session tu list
            var cart = Session[CartSession];
            var list = new List<CartItem>();
            if (cart != null)
            {
                list = (List<CartItem>)cart;

                int result = 0;
                var res = new List<int>();
                foreach (var item in list)
                {
                    result = result + item.Quantity * (int)item.Product.giaMoi;
                    res.Add(item.Quantity * (int)item.Product.giaMoi);
                }
                ViewBag.Total = result;
                ViewBag.TotalPrice = result + 20000;
                ViewBag.ListPrice = res;
            }

            ThongTinKhachHang guestinfo = new ThongTinKhachHang();

            KhachHangDAO k = new KhachHangDAO();

            if (k.GetBytenDangNhap(Session["UserName"].ToString()) != null)// dang nhap roi va da co thong tin ca nhan
            {

                guestinfo = k.GetBytenDangNhap(Session["UserName"].ToString());

                ViewBag.UserInfo = guestinfo;

            }
            return View(list);
        }

        [HttpGet]
        public ActionResult AddItem(string productId, int quantity)
        {
            var product = new SanPhamDAO().ViewDetail(productId);
            var cart = Session[CartSession];
            if (cart != null)
            {
                var list = (List<CartItem>)cart;
                //neu trong list ton tai san pham co ma nhap vao
                if (list.Exists(x => x.Product.maSanPham.Equals(productId)))
                {

                    foreach (var item in list)
                    {
                        if (item.Product.maSanPham.Equals(productId))
                        {
                            item.Quantity = quantity;//them so luong san pham da co
                        }
                    }
                }
                else
                {
                    //tạo mới đối tượng cart item
                    var item = new CartItem();
                    item.Product = product;
                    item.Quantity = quantity;
                    list.Add(item);
                }
                //Gán lại list vào session
                Session[CartSession] = list;
            }
            else
            {
                //tạo mới đối tượng cart item
                var item = new CartItem();
                item.Product = product;
                item.Quantity = quantity;
                var list = new List<CartItem>();
                //gán vào list
                list.Add(item);
                //Gán lại list vào session
                Session[CartSession] = list;
            }
            //lay ra san pham vua them vao trong list
            //TempData["id"] = productId;
            return RedirectToAction("Index");
        }


        public ActionResult Delete(string delId)
        {
            var sessionCart = (List<CartItem>)Session[CartSession];
            sessionCart.RemoveAll(x => x.Product.maSanPham.Equals(delId));
            Session[CartSession] = sessionCart;
            //TempData["id"] = delId;
            return RedirectToAction("Index");
        }

    }
}