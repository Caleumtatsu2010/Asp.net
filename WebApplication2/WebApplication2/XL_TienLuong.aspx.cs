using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class XL_TienLuong : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int ngaycong = Int32.Parse(Request.QueryString["NgayCong"]);
            int bacluong = Int32.Parse(Request.QueryString["BacLuong"]);
            TextBox1.Text = Request.QueryString["MaNV"].ToString();
            TextBox2.Text = ngaycong.ToString();
            TextBox3.Text = (ngaycong * bacluong).ToString();
            
        }
    }
}