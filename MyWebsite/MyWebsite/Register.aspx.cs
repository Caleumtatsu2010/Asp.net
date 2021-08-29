using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebsite
{
    public partial class Register : System.Web.UI.Page
    {
        BusinessLogicLayer bll = new BusinessLogicLayer();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonCreate_Click(object sender, EventArgs e)
        {
            if(TextBoxPass.Text == TextBoxRePass.Text)
            {
                string day = DropDownListYear.Text +"-"+ DropDownListMonth.Text +"-"+ DropDownListDay.Text;
                bll.register(TextBoxFirstName.Text, TextBoxLastname.Text, Int32.Parse(TextBoxPhone.Text), TextBoxEmail.Text, day, TextBoxUsername.Text, TextBoxPass.Text);
            }

        }

        protected void TextBoxName_TextChanged(object sender, EventArgs e)
        {

        }
    }
}