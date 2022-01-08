using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VnSport.Models.DAO
{
    public class KhachHangDAO
    {
        vnsport db = null;
        public KhachHangDAO()
        {
            db = new vnsport();
        }

        public int Insert(ThongTinKhachHang guestinfo)
        {
            db.ThongTinKhachHangs.Add(guestinfo);
            db.SaveChanges();
            return guestinfo.maKhachHang;
        }

        //public bool Update(ThongTinKhachHang entity)
        //{
        //    try
        //    {
        //        var user = db.ThongTinKhachHangs.Find(entity.maKhachHang);
        //        user.tenKhachHang = entity.tenKhachHang;
        //        user.ngaySinh = entity.ngaySinh;
        //        user.gioiTinh = entity.gioiTinh;
        //        user.soDienThoai = user.soDienThoai;
        //        user.email = entity.email;
        //        user.diaChi = entity.diaChi;
        //        user.ghiChu = user.ghiChu;
        //        user.hinhAnh = entity.hinhAnh;
        //        db.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }

        //}
        public ThongTinKhachHang GetBytenDangNhap(string tendangnhap)
        {
            return db.ThongTinKhachHangs.SingleOrDefault(x => x.tenDangNhap == tendangnhap);
        }
    }
}