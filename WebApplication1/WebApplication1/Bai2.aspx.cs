using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Bai2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {

            if (TextBox1.Text != "" & TextBox2.Text != "" & TextBox3.Text != "")
            {
                int a = Int32.Parse(TextBox1.Text);
                int b = Int32.Parse(TextBox2.Text);
                int c = Int32.Parse(TextBox3.Text);

                float delta = b * b - 4 * a * c;
                if (delta > 0)
                {
                    Label5.Text = "Phuong trinh co hai nghiem : ";
                    TextBox4.Text = "X1 = " + (-b - Math.Sqrt(delta)) / 2 * a + "X2 = " + (-b + Math.Sqrt(delta)) / 2 * a;

                }
                else if (delta == 0)
                {
                    Label5.Text = "Phuong trinh co nghiem kep : ";
                    TextBox4.Text = "X1 = X2" + (-b / 2 * a);

                }
                else if (delta < 0)
                {
                    Label5.Text = "Phuong trinh vo nghiem : ";
                }
            }
        }
    }
}