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
    public partial class DetailsProducts : System.Web.UI.Page
    {
        String Strcon = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
        SqlConnection conn;
        SqlDataAdapter da;
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(Strcon);
            conn.Open();

            string sql = "select * from product where Id='"+ Request.QueryString["Id"].ToString() + "'";
           
            da = new SqlDataAdapter(sql, conn);
            dt = new DataTable();
            da.Fill(dt);

            DataList1.DataSource = dt;
            DataList1.DataBind();
        }

        protected void Button2_Click(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("Products.aspx");
        }
    }
}