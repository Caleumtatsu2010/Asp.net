using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace MyWebsite
{
    public class BusinessLogicLayer
    {
        DataAccessLayer dal = new DataAccessLayer();
        public DataTable Login(string user, string pass)
        {
            string sql = "Select * from Account where Username = '" + user + "' and Password = '" + pass + "' ";
            DataTable dt = new DataTable();
            dt = dal.GetTable(sql);
            return dt;
        }
        public void update(string user, string pass)
        {
            string sql = "update DANGNHAP set PassW = '" + pass + "'  where TenDN = '" + user + "'";
            dal.ExecuteNonQuery(sql);
        }
        // QL tài khoản
        public DataTable ShowNguoiDung()
        {
            string sql = "Select * from DANGNHAP";
            DataTable dt = new DataTable();
            dt = dal.GetTable(sql);
            return dt;
        }
        public void ThemNguoiDung(string tendn, string pass, string quyenhan)
        {
            string sql = "Insert into DANGNHAP values('" + tendn + "', '" + pass + "', '" + quyenhan + "') ";
            dal.ExecuteNonQuery(sql);
        }
        public void SuaNguoiDung(string tendn, string pass, string quyenhan)
        {
            string sql = "Update DANGNHAP set PassW = '" + pass + "', QuyenHan = '" + quyenhan + "' where TenDN = '" + tendn + "' ";
            dal.ExecuteNonQuery(sql);
        }
        public void XoaNguoiDung(string tendn)
        {
            string sql = "Delete from DANGNHAP where TenDN = '" + tendn + "' ";
            dal.ExecuteNonQuery(sql);
        }
        public DataTable TimTenTaiKhoan(string user)
        {
            string sql = "select * from DANGNHAP where TenDN LIKE '%" + user + "%' ";
            DataTable dt = new DataTable();
            dt = dal.GetTable(sql);
            return dt;
        }
    }
}