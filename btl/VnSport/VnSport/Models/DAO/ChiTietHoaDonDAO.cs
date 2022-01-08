using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VnSport.Models.DAO
{
    public class ChiTietHoaDonDAO
    {
        vnsport db = null;
        public ChiTietHoaDonDAO()
        {
            db = new vnsport();
        }
        public bool Insert(ChiTietHoaDon detail)
        {
            try
            {
                db.ChiTietHoaDons.Add(detail);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public List<ChiTietHoaDon> getByMaHoaDon(int mahoadon)
        {
            return db.ChiTietHoaDons.Where(s => s.maHoaDon == mahoadon).ToList();

        }
        public void DeleteByMaHD(int mahd)
        {
            ChiTietHoaDon cthd = db.ChiTietHoaDons.SingleOrDefault(s => s.maHoaDon == mahd);

            db.ChiTietHoaDons.Remove(cthd);
            db.SaveChanges();
        }
    }
}