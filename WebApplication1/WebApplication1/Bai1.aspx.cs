using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Bai1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Buttoncong_Click(object sender, EventArgs e)
        {
            if(TextBoxA.Text != "" & TextBoxB.Text !="")
            {
                TextBoxkq.Text = (Int32.Parse(TextBoxA.Text) + Int32.Parse(TextBoxB.Text)).ToString();
                
            }

        }

        protected void Buttontru_Click(object sender, EventArgs e)
        {
            if (TextBoxA.Text != "" & TextBoxB.Text != "")
            {
                TextBoxkq.Text = (Int32.Parse(TextBoxA.Text) - Int32.Parse(TextBoxB.Text)).ToString();
            }
        }

        protected void Buttonnhan_Click(object sender, EventArgs e)
        {
            if (TextBoxA.Text != "" & TextBoxB.Text != "")
            {
                TextBoxkq.Text = (Int32.Parse(TextBoxA.Text) * Int32.Parse(TextBoxB.Text)).ToString();
            }

        }

        protected void Buttonchia_Click(object sender, EventArgs e)
        {
            if (TextBoxA.Text != "" & TextBoxB.Text != "")
            {
                TextBoxkq.Text = (Int32.Parse(TextBoxA.Text) / Int32.Parse(TextBoxB.Text)).ToString();
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            
        }
    }
}