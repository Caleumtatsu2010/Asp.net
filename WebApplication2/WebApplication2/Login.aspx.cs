using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if(TextBoxUsename.Text=="abc" & TextBoxPassword.Text=="123")
            {
                Session["Status"] = "yes";
                Response.Redirect("Home.aspx");
            }
            else
            {
                Session["Status"] = "no";
                Response.Write("Ban dang nhap sai");
            }
        }
    }
}