using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebformPractice.practice1
{
    public partial class displayStudents : System.Web.UI.Page
    {
        public static List<Student> studentList;
        protected void Page_Load(object sender, EventArgs e)
        {
            List<Student> listSession = (List<Student>)Session["listStudent"];

            studentList = new List<Student>(listSession);

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("addStudent.aspx");
        }
    }
}