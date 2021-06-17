<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TienDien.aspx.cs" Inherits="WebApplication2.tiendien" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 32%;
        }
        .auto-style2 {
            width: 123px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
        <table cellpadding="0" cellspacing="0" class="auto-style1">
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="cuLabel" runat="server" Text="Vào chỉ số cũ"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBoxCu" runat="server"></asp:TextBox>

                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="moiLabel" runat="server" Text="Vào chỉ số mới"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBoxMoi" runat="server"></asp:TextBox>

                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Tính Tiền" 
                        PostBackUrl="~/Xl_TienDien.aspx"/>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
