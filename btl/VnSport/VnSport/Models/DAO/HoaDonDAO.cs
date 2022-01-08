using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VnSport.Models.DAO
{
    public class HoaDonDAO
    {
        vnsport db = null;
        public HoaDonDAO()
        {
            db = new vnsport();
        }
        public int Insert(HoaDon order)
        {
            db.HoaDons.Add(order);
            db.SaveChanges();
            return order.maHoaDon;
        }
        public List<HoaDon> getRecentByUserName(string username)
        {
            KhachHangDAO k = new KhachHangDAO();

            var list = new List<HoaDon>();
            try
            {
                ThongTinKhachHang user = k.GetBytenDangNhap(username);
                return db.HoaDons.Where(s => s.maKhachHang == user.maKhachHang).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public void DeleteById(int mahoadon)
        {
            HoaDon hoaDon = db.HoaDons.Find(mahoadon);
            db.HoaDons.Remove(hoaDon);
            db.SaveChanges();
        }
    }
}