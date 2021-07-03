using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication5
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            load_sanpham();
            load_combo();
        }
        public void load_sanpham()
        {
            dbDataContext data = new dbDataContext();
            var sp = from p in data.SanPhams select p;

            GridView1.DataSource = sp;
            GridView1.DataBind();
        }
        public void load_combo()
        {
            dbDataContext data = new dbDataContext();
            var lsp = from p in data.LoaiSPs select p;
            DropDownList1.DataSource = lsp;
            DropDownList1.DataTextField = "TenLoai";
            DropDownList1.DataValueField = "MaLoai";
            DropDownList1.DataBind();
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            try
            {
                dbDataContext data = new dbDataContext();
                SanPham sanpham = new SanPham();//doi tuong san pham
                sanpham.MaSP = TextBox1.Text.Trim();
                sanpham.TenSP = TextBox2.Text.Trim();
                sanpham.MaLoai = DropDownList1.SelectedValue.ToString();
                sanpham.DonGia = Int32.Parse(TextBox3.Text);

                data.SanPhams.InsertOnSubmit(sanpham);//them doi tuong san pham vao csdl bang sanpham
                data.SubmitChanges();
                Page_Load(sender, e);
            }
            catch(Exception ex)
            {
                if(ex.Message.Contains("PRIMARY KEY"))
                {
                    Label5.Text = "ma san pham da ton tai";
                }
                else
                {
                    Label5.Text = "don gia phai la so hoac chua nhap";
                }
               
            }
            
        }

        protected void Button3_Click(object sender, EventArgs e)
        {
            dbDataContext data = new dbDataContext();
        }
    }
}