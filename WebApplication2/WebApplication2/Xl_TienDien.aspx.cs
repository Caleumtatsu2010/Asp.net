using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class Xl_TienDien : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int kq= Int32.Parse(Request.Form.Get("TextBoxMoi")) - Int32.Parse(Request.Form.Get("TextBoxCu"));
            if(kq > 0 & kq < 100)
            {
                Label1.Text = "Số tiền: " + (kq*2000).ToString() ;
            }
            if (kq > 100 & kq < 150)
            {
                Label1.Text = "Số tiền: " + (kq*2500).ToString();
            }
            if (kq > 150 & kq < 200)
            {
                Label1.Text = "Số tiền: " + (kq * 2800).ToString();
            }
            if (kq > 200)
            {
                Label1.Text = "Số tiền: " + (kq * 3500).ToString();
            }

        }
    }
}