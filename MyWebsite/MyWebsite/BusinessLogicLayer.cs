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
            string sql = "update Account set PassW = '" + pass + "'  where TenDN = '" + user + "'";
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
        public void register(string firstname, string lastname, int phone, string email, string day, string username, string password)
        {
            string sql = "insert into Account values (N'" + username + "', '" + password + "')";
            string sql2 = "insert into Infor values (N'"+username+"', N'"+firstname+"', N'"+lastname+"', '"+phone+"', N'"+email+"', '"+day+"')";
            dal.ExecuteNonQuery(sql);
            dal.ExecuteNonQuery(sql2);

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