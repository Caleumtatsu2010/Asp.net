<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Vidu13.aspx.cs" Inherits="WebApplication1.Vidu13" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 41%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" class="auto-style1">
            <tr>
                <td style="width:40%">
                    <asp:Label ID="Label1" runat="server" Text="Khu Du Lịch:"></asp:Label>
                </td>
                <td>
                    <asp:ListBox ID="Lbl_khudl" runat="server" Width="250px"></asp:ListBox>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <asp:Button ID="Button1" runat="server" Text="Chọn địa điểm" Width="93px" OnClick="Button1_Click" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <asp:Label ID="Lbl_diadiem" runat="server" Text="LblDia_diem"></asp:Label>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
