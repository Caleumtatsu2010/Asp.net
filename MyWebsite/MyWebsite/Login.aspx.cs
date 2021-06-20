using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebsite
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonLogin_Click(object sender, EventArgs e)
        {
            DataConnect d = new DataConnect();
            if (d.checkAccount(TextBoxUsername.Text, TextBoxPassword.Text))
            {
                Response.Redirect("Home.aspx?Username=" + TextBoxUsername.Text);
            }
            else
            {

            }
        }
    }
}