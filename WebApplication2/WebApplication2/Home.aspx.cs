using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["Status"] == "yes")
            {
                Label1.Text = "chao mung den voi trang web cua chung toi";
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }
    }
}