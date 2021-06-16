using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Bai3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            int result = Int32.Parse(TextBox2.Text) - Int32.Parse(TextBox1.Text);
            if(result >=0 & result<100)
            {
                TextBox3.Text = (result * 2000).ToString();
            }
            if (result >= 100 & result < 150)
            {
                TextBox3.Text = (result * 2500).ToString();
            }
            if (result >= 150 & result < 200)
            {
                TextBox3.Text = (result * 2800).ToString();
            }
            if (result > 200)
            {
                TextBox3.Text = (result * 3500).ToString();
            }
        }
    }
}