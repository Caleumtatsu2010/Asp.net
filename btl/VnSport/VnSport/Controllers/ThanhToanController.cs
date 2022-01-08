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
    public class ThanhToanController : Controller
    {
        private const string CartSession = "CartSession";

        // GET: ThanhToan
        public ActionResult Index()
        {
            return View();
        }

        
        [HttpGet]
        public ActionResult Paid(string hoTen, string sdt, string tinh, string huyen, string xa, string diaChi, string ghiChu, string hinhThucThanhToan)
        {
            //tao thong tin khach hang cho guest
            ThongTinKhachHang guestinfo = new ThongTinKhachHang();

            KhachHangDAO k = new KhachHangDAO();

            //tao hoa don
            HoaDon hoadon = new HoaDon();


            //kiem tra xem da co thong tin ca nhan hay chua

            if (k.GetBytenDangNhap(Session["UserName"].ToString()) != null)// dang nhap roi va da co thong tin ca nhan
            {

                guestinfo = k.GetBytenDangNhap(Session["UserName"].ToString());

                hoadon.maKhachHang = guestinfo.maKhachHang; //lay ra ma khach hang tu khach hang da co thong tin

            }
            else //dang nhap roi nhung chua co thong tin ca nhan => insert thong tin 1 lan
            {
                guestinfo.tenDangNhap = Session["UserName"].ToString();
                guestinfo.hoTen = hoTen;

                guestinfo.sdt = sdt;
                guestinfo.tinh = tinh;
                guestinfo.huyen = huyen;
                guestinfo.xa = xa;
                guestinfo.diaChi = diaChi;
                guestinfo.ghiChu = ghiChu;
                guestinfo.hinhAnh = "";


                hoadon.maKhachHang = k.Insert(guestinfo);//them thong tin khach hang va lay ra ma khach hang vua them

            }

            hoadon.ngayBan = DateTime.Now;
            hoadon.giamGia = 0;
            hoadon.hinhThucThanhToan = hinhThucThanhToan;

            //insert khach hang ms
            //lay ra ds san pham luu cart trong session
            var list = (List<CartItem>)Session[CartSession];
            int result = 0;

            foreach (var item in list)
            {
                result = result + item.Quantity * (int)item.Product.giaMoi;//tinh tong tien
            }

            //them not cho hoa don
            hoadon.tongSoLuong = list.Count;
            hoadon.thanhTien = result + 20000;//phi ship

            HoaDonDAO h = new HoaDonDAO();
            var mahd = h.Insert(hoadon);

            ChiTietHoaDonDAO detailDao = new ChiTietHoaDonDAO();
            //them nhieu chi tiet hoa don trong 1 hoa don
            foreach (var item in list)
            {
                var orderDetail = new ChiTietHoaDon();
                orderDetail.maSanPham = item.Product.maSanPham;
                orderDetail.soLuong = item.Quantity;
                orderDetail.donGia = item.Product.giaMoi;
                orderDetail.maHoaDon = mahd;//lay ra ma hoa don vua them
                detailDao.Insert(orderDetail);
            }
            return RedirectToAction("Index", "Success");
        }
    }
}