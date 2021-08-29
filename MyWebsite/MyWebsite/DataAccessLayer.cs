using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MyWebsite
{
    public class DataAccessLayer
    {
        public SqlConnection GetConnection()
        {
            String sqlConn = @"Data Source=DESKTOP-7BD77N3\SQLEXPRESS;Initial Catalog=Account;Integrated Security=True";
            SqlConnection conn = new SqlConnection(sqlConn);
            return conn;
        }
        public void Disconnect(SqlConnection conDis)
        {
            if (conDis != null)
            {
                conDis.Close();
                conDis = null;
            }
        }

        public DataTable GetTable(String sql)
        {
            SqlConnection con = GetConnection();
            SqlDataAdapter adapter = new SqlDataAdapter(sql, con);
            DataTable datatable = new DataTable();
            adapter.Fill(datatable);
            return datatable;
        }

        public void ExecuteNonQuery(String sql)
        {
            SqlConnection con = GetConnection();
            con.Open();
            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.ExecuteNonQuery();
        }
    }
}