using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Bai4 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            int nctl=0;
            int ngaycong = Int32.Parse(TextBox3.Text);
            int bacluong = Int32.Parse(TextBox2.Text);
            int phucap=0;
            if (ngaycong>=25)
            {
                nctl = (ngaycong - 25) * 2 + 25;
            }
            if(DropDownList1.SelectedItem.Text == "Trưởng Phòng")
            {
                phucap = 500000;
            }
            if (DropDownList1.SelectedItem.Text == "Phó Phòng")
            {
                phucap = 300000;
            }
            if (DropDownList1.SelectedItem.Text == "Nhân Viên")
            {
                phucap = 100000;
            }
            TextBox4.Text = ((bacluong * 650000 * nctl) + phucap).ToString();
        }
    }
}