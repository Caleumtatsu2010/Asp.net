using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class CalAreal : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String user = Request.QueryString["User"].ToString();
            String pass = Request.QueryString["Pass"].ToString();
            Label1.Text = "Welcome" + user;


        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            TextBox3.Text = (Int32.Parse(TextBox1.Text) * Int32.Parse(TextBox2.Text)).ToString();
        }
    }
}