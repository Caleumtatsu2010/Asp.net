using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SqlServer
{
    
    public partial class QLLH : System.Web.UI.Page
    {
        string strCon = @"Data Source=DESKTOP-5166AF8\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
        SqlConnection conn = null;
        SqlDataAdapter da = null;
        DataTable dt = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            conn = new SqlConnection(strCon);
            conn.Open();
        }

        protected void btnTim_Click(object sender, EventArgs e)
        {
            GridView3.Visible = true;
            String strMaLop = DropDownList1.SelectedValue;
            String sql = "Select MaHocSinh, TenHocSinh, NgaySinh from HOCSINH where MaLop='" + strMaLop + "'";
            da = new SqlDataAdapter(sql, conn);
            dt = new DataTable();
            da.Fill(dt);
            GridView3.DataSource = dt;
            GridView3.DataBind();
        }

        protected void btnBoTim_Click(object sender, EventArgs e)
        {
            GridView3.Visible = false;
        }
    }
}