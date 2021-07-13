<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="displayStudents.aspx.cs" Inherits="WebformPractice.practice1.displayStudents" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }

        .auto-style2 {
            height: 23px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>

            <table class="auto-style1">
                <tr>
                    <td class="auto-style2">
                        <asp:Label ID="Label1" runat="server" Text="ID"></asp:Label>
                    </td>
                    <td class="auto-style2">
                        <asp:Label ID="Label2" runat="server" Text="Name"></asp:Label>
                    </td>
                    <td class="auto-style2">
                        <asp:Label ID="Label3" runat="server" Text="Age"></asp:Label>
                    </td>
                    <td class="auto-style2">
                        <asp:Label ID="Label4" runat="server" Text="Address"></asp:Label>
                    </td>
                </tr>

                <% foreach (WebformPractice.practice1.Student s in studentList)
                    {
                %>
                <tr>
                    <td><% =s.Id %></td>
                    <td><% =s.Name %></td>
                    <td><% =s.Age %></td>
                    <td><% =s.Address%></td>
                </tr>
                <% 
                    }
                %>


                <tr>
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Add Again" Width="108px" />
                </tr>

            </table>

        </div>

    </form>
</body>
</html>
