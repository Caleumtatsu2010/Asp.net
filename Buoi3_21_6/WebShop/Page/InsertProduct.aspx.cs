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
    public partial class InsertProduct : System.Web.UI.Page
    {
        String Strcon = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
        SqlConnection conn;
        SqlDataAdapter da;
        DataTable dt;
        SqlCommand cmd;

        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(Strcon);
            conn.Open();

           
        }

        protected void Button2_Click(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string image = "~/images/products/" + FileUpload1.FileName;
            string title = TextBoxTitle.Text;
            int price = Int32.Parse(TextBoxPrice.Text);

            string sql = "insert into product values('id8','" + image + "', N'" + title + "', '" + price + "')";

            cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
    }
}