using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VnSport.Models.DAO
{
    public class TaiKhoanDAO
    {
        vnsport db = null;
        public TaiKhoanDAO()
        {
            db = new vnsport();
        }
        public TaiKhoan GetById(string userName)
        {
            return db.TaiKhoans.SingleOrDefault(x => x.tenDangNhap == userName);
        }
        public int Login(string userName, string passWord)
        {

            var result = db.TaiKhoans.SingleOrDefault(x => x.tenDangNhap == userName);
            //ten dang nhap k ton tai
            if (result == null)
            {
                return 0;
            }
            else
            {
                if (result.loai == "admin")//la admin, chuyen huong den admin page
                {
                    if (result.matKhau == passWord)
                        return 3;//mat khau, tai khoan ton tai => sesion
                    else
                        return -2;//mat khau sai hoac khong ton tai

                }
                else//ko phai admin, la user
                {
                    if (result.matKhau == passWord)
                        return 1;//mat khau, tai khoan ton tai => sesion
                    else
                        return -2;//mat khau sai hoac khong ton tai
                }
            }

        }


        public bool CheckUserName(string userName)
        {
            return db.TaiKhoans.Count(x => x.tenDangNhap == userName) > 0;
        }

        //public bool CheckEmail(string email)
        //{
        //    return db.TaiKhoans.Count(x => x. == email) > 0;
        //}
        public TaiKhoan ViewDetail(string tenDangNhap)
        {
            return db.TaiKhoans.Find(tenDangNhap);
        }


        public void Insert(TaiKhoan entity)
        {
            db.TaiKhoans.Add(entity);
            db.SaveChanges();
        }
    }
}