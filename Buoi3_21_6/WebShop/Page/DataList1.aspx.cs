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
    public partial class DataList1 : System.Web.UI.Page
    {
        String Strcon = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
        SqlConnection conn=null;
        SqlDataAdapter da=null;
        DataTable dt=null;
        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(Strcon);
            conn.Open();
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string sqlMaLop = DropDownList1.SelectedValue;
            
            string sql = "select * from HOCSINH where MaLop = " + sqlMaLop + "";
            da = new SqlDataAdapter(sql, conn);
            dt = new DataTable();
            da.Fill(dt);
            DataList2.DataSource = dt;
            DataList2.DataBind();
        }
    }
}