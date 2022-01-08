using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelTour.Models.DAO
{
    public class TaiKhoanDAO
    {
        travel db = null;
        public TaiKhoanDAO()
        {
            db = new travel();
        }

        public bool CheckUserName(string userName)
        {
            return db.Accounts.Count(x => x.Username == userName) > 0;
        }
        public Account GetById(string userName)
        {
            return db.Accounts.SingleOrDefault(x => x.Username == userName);
        }
        public int Login(string username, string password)
        {

            var result = db.Accounts.SingleOrDefault(x => x.Username == username);

            //ten dang nhap k ton tai
            if (result == null)
            {
                return 0;
            }
            else
            {
                if (result.Roles == "admin")//la admin, chuyen huong den admin page
                {
                    if (result.Password == password)
                        return 3;//mat khau, tai khoan ton tai => sesion cho admin
                    else
                        return -2;//mat khau sai hoac khong ton tai 

                }
                else//ko phai admin, la user
                {
                    if (result.Password == password)
                        return 1;//mat khau, tai khoan ton tai => sesion cho user
                    else
                        return -2;//mat khau sai hoac khong ton tai
                }
            }

        }
        public Account ViewDetail(string tenDangNhap)
        {
            return db.Accounts.Find(tenDangNhap);
        }
        //public Account AutoRegisterForGuest()
        //{
        //    TaiKhoan guestuser = new TaiKhoan();
        //    string milisec = DateTime.Now.Subtract(DateTime.MinValue.AddYears(1969)).TotalMilliseconds.ToString(); ;
        //    guestuser.tenDangNhap = "guest" + milisec;
        //    guestuser.matKhau = "1";
        //    guestuser.loai = "user";

        //    db.TaiKhoans.Add(guestuser);
        //    db.SaveChanges();
        //    return guestuser;

        //}

        public void Insert(Account entity)
        {
            db.Accounts.Add(entity);
            db.SaveChanges();
        }
    }
}