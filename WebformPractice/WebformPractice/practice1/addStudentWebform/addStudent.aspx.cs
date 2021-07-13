using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebformPractice.practice1
{
    public partial class addStudent : System.Web.UI.Page
    {
        List<Student> listStudent = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["listStudent"] == null)//if session doesn't exsits , create new list student
            {
                listStudent = new List<Student>();
            }
            else//if exsits , pass to exsitence listStudent
            {
                listStudent = (List<Student>) Session["listStudent"];
            }
        }
        public Student getData()
        {
            string id = TextBox1.Text;
            string name = TextBox2.Text;
            int age = Int32.Parse(TextBox3.Text);
            string address = TextBox4.Text;
            return new Student(id, name, age, address);
        }
        protected void Button1_Click(object sender, EventArgs e)
        {

            Student s = getData();
            listStudent.Add(s);
            Session["listStudent"] = listStudent;
            Response.Redirect("displayStudents.aspx");
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            TextBox1.Text = "";
            TextBox2.Text = "";
            TextBox3.Text = "";
            TextBox4.Text = "";

        }
    }
}