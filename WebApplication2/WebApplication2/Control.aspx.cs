using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class Control : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String user = Request.QueryString["User"].ToString();
            String pass = Request.QueryString["Pass"].ToString();
            if (user == pass)
            {
                Label1.Text = "Usename va Password bang nhau";
                Response.Redirect("CalAreal.aspx?User="+user+"&Pass="+pass);
            }
            else
            {
                Response.Redirect("Error.html");

            }
        }
    }
}