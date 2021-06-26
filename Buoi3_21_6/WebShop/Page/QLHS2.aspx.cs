using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebShop.Page
{
    public partial class QLHS2 : System.Web.UI.Page
    {
        String Strcon = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
        SqlConnection conn;
        SqlDataAdapter da; 
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(Strcon);
            conn.Open();

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string sqlMaLop = DropDownList1.SelectedValue;
            String sql = "select MaHocSinh , TenHocSInh, NgaySinh from HOCSINH where MaLop = " + sqlMaLop+"";
            da = new SqlDataAdapter(sql, conn);
            dt = new DataTable();
            da.Fill(dt);
            GridView1.DataSource = dt;
            GridView1.DataBind();

        }


    }
}