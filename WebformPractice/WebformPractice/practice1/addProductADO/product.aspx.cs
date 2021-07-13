using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebformPractice.practice1.addProductADO
{
    public partial class product : System.Web.UI.Page
    {
        String str = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";

        SqlConnection con = null;
        SqlDataAdapter da = null;
        DataTable dt = null;
        SqlCommand cmd = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            con = new SqlConnection(str);
            con.Open();
            String sql = "select * from product";
            da = new SqlDataAdapter(sql, con);
            dt = new DataTable();
            da.Fill(dt);
            GridView1.DataSource = dt;
            GridView1.DataBind();

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            
            String sql = "insert into product values('" + TextBox6.Text + "', '~/images/products/"+FileUpload1.FileName+"', N'"+TextBox1.Text+"', '"+TextBox2.Text+"' , '"+DropDownList1.SelectedValue+"', '"+TextBox4.Text+"',N'"+TextBox5.Text+"')";
            cmd = new SqlCommand(sql, con);
            cmd.ExecuteNonQuery();
        }
    }
}