using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class WebForm3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //LabelKetQua.Text = "UserName: " + Request.Form.Get("usenameTxt") + "<br>Password: " + Request.Form.Get("passwordTxt");
            LabelKetQua.Text = "UserName: " + Request.QueryString["Name"].ToString() + "<br>Password: " + Request.QueryString["Pass"].ToString();
        }
    }
}