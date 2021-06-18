using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication4
{
    public class DataConnect
    {
        // ket noi csdl
        public SqlConnection getcon()
        {

            return new SqlConnection(@"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=Account;Integrated Security=True");
        }

        //lay du lieu ra theo dang bang
        public DataTable gettable(string sql)
        {
            SqlConnection con = getcon();
            con.Open();

            SqlDataAdapter da = new SqlDataAdapter(sql, con);

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        //thuc hien cau lenh truy van them sua xoa
        public void excute(string sql)
        {
            SqlConnection con = getcon();
            con.Open();

            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.ExecuteNonQuery();
            cmd.Dispose();
            cmd.Clone();

            con.Close();

        }

        public bool checkAccount(string user, string pass)
        {
            SqlConnection con = getcon();
            con.Open();
            string sql = "select * from Account where Username='" + user + "' and Password='" + pass + "'";
            SqlCommand cmd = new SqlCommand(sql, con);


            SqlDataReader sdr = cmd.ExecuteReader();
            if (sdr.Read())
            {
                //account exsits
                return true;
            }
            else
            {
                return false;
                //account not exsits
            }
            con.Close();

        }





    }

}