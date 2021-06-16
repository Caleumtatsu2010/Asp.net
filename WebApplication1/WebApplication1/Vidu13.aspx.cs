using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Vidu13 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                Lbl_khudl.Items.Add("Vịnh Hạ Long");
                Lbl_khudl.Items.Add("Phan Thiết-Mũi Né");
                Lbl_khudl.Items.Add("Nha Trang");
                Lbl_khudl.Items.Add("Đà Lạt");

            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Lbl_diadiem.Text = "";
            if(Lbl_khudl.SelectedItem.Selected)
            {
                Lbl_diadiem.Text = "Bạn đã chọn " + Lbl_khudl.SelectedValue;
            }
        }
    }
}