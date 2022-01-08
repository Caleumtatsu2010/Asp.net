using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelTour.Models;
using TravelTour.Models.CLASS;
using TravelTour.Models.DAO;

namespace TravelTour.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var dao = new TaiKhoanDAO();
                var result = dao.Login(model.Username, model.Password);
                if (result == 1)
                {
                    //var user = dao.GetById(model.Username);
                    Session["UserName"] = model.Username;
                    return RedirectToAction("Index", "Home");

                }
                else if (result == 3)
                {
                    return RedirectToAction("Index", "Admin/Default");
                }
                else if (result == 0)
                {

                    ModelState.AddModelError("tenDangNhap", "Tài khoản không tồn tại.");
                }
                else if (result == -2)
                {
                    ModelState.AddModelError("matKhau", "Mật khẩu không đúng.");
                }
                else
                {
                    ModelState.AddModelError("", "đăng nhập không đúng.");
                }
            }
            return View(model);
        }

        public ActionResult Logout()
        {
            Session.Remove("UserName");
            return Redirect("/");
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var dao = new TaiKhoanDAO();
                if (dao.CheckUserName(model.Username))
                {
                    ModelState.AddModelError("tenDangNhapExsits", "Tên đăng nhập đã tồn tại");
                }
                else
                {
                    var taikhoan = new Account();
                    taikhoan.Username = model.Username;
                    taikhoan.Password = model.Password;
                    taikhoan.Roles = "user";

                    dao.Insert(taikhoan);
                    if (dao.GetById(taikhoan.Username) != null)
                    {

                        Session["UserName"] = dao.GetById(taikhoan.Username).Username;
                        return RedirectToAction("Index", "Home");
                    }
                    ModelState.AddModelError("dangkyfailed", "Đăng ký không thành công.");
                }
            }
            return View(model);
        }
    }
}