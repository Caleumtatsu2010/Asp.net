using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication4
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        string connString = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=QLBanHang;Integrated Security=True";
        SqlConnection conn;
        SqlDataAdapter da;
        DataTable dt;
        SqlCommand smd;
        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(connString);
            conn.Open();
            loadData();

        }
        public void loadData()
        {
            da = new SqlDataAdapter("select * from SanPham", conn);
            dt = new DataTable();
            da.Fill(dt);
            GridView1.DataSource = dt;
            GridView1.DataBind();
        }
        public void loadCombo()
        {




        }
        protected void Button3_Click(object sender, EventArgs e)
        {
            try
            {
                string sql = "update SanPham set TenSP = '"+TextBox2.Text+"', MaLoai='"+DropDownList1.SelectedValue+"', DonGia='"+TextBox4.Text+"' where MaSP = '"+TextBox1.Text+"'";
                smd = new SqlCommand(sql, conn);
                smd.ExecuteNonQuery();
                loadData();
            }
            catch (Exception ex)
            {
                Label5.Text = "Loi!";
            }
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            try
            {
                string sql = "delete SanPham where MaSP = '" + TextBox1.Text + "'";
                smd = new SqlCommand(sql, conn);
                smd.ExecuteNonQuery();
                loadData();
            }
            catch (Exception ex)
            {
                Label5.Text = "Loi!";
            }
        }

        protected void Button4_Click(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {

            try
            {
                string loaisp = DropDownList1.SelectedValue;
                string sql = "insert into SanPham values ('" + TextBox1.Text + "', N'" + TextBox2.Text + "', '" + loaisp + "', '" + TextBox4.Text + "')";
                smd = new SqlCommand(sql, conn);
                smd.ExecuteNonQuery();
                loadData();
            }
            catch (Exception ex)
            {
                Label5.Text = "Loi!";
            }


        }

        protected void GridView1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        protected void Button1_Click1(object sender, EventArgs e)
        {
            try
            {
                string loaisp = DropDownList1.SelectedValue;
                string sql = "insert into SanPham values ('" + TextBox1.Text + "', N'" + TextBox2.Text + "', '" + loaisp + "', '" + TextBox4.Text + "')";
                smd = new SqlCommand(sql, conn);
                smd.ExecuteNonQuery();
                loadData();
            }
            catch (Exception ex)
            {
                Label5.Text = "Loi!";
            }
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "Select")
            {
                int index = Convert.ToInt32(e.CommandArgument);
                GridViewRow clickedRow = GridView1.Rows[index];

                TextBox myTextBox = (TextBox)clickedRow.Cells[0].FindControl("TextBox1");
                
                TextBox1.Text = myTextBox.Text;
            }
        }
    }
}