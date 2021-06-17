using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class TienLuong : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            int bacluong = Int32.Parse(TextBox2.Text);
            int ngaycong = Int32.Parse(TextBox3.Text);
            Response.Redirect("XL_TienLuong.aspx?BacLuong="+bacluong +"&NgayCong="+ngaycong+"&MaNV="+TextBox1.Text);

        }
    }
}