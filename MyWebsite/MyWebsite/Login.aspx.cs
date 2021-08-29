using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebsite
{
    public partial class Login : System.Web.UI.Page
    {
        BusinessLogicLayer bll = new BusinessLogicLayer();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonLogin_Click(object sender, EventArgs e)
        {
            //d.checkAccount(TextBoxUsername.Text, TextBoxPassword.Text)
            try
            {
                DataTable dt = bll.Login(TextBoxUsername.Text, TextBoxPassword.Text);
                if (dt != null & dt.Rows.Count > 0)
                {
                    Response.Redirect("HomeMaster.aspx?Username=" + TextBoxUsername.Text);
                }
                else
                {
                    
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}