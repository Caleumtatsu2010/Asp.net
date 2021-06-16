<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Vidu15.aspx.cs" Inherits="WebApplication1.Vidu15" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 50%;
        }
        .auto-style2 {
            width: 157px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" class="auto-style1">
            <tr>
                <td class="auto-style2" style="width:30%">
                    <asp:Label ID="Label1" runat="server" Text="Thu Nhập"></asp:Label>
                </td>
                <td>
                    <asp:RadioButtonList ID="RadioButtonList1" runat="server" AutoPostBack="true" RepeatColumns="2" Width="280px" OnSelectedIndexChanged="RadioButtonList1_SelectedIndexChanged">
                        <asp:ListItem>Dưới 1 triệu</asp:ListItem>
                        <asp:ListItem>1-3 triệu</asp:ListItem>
                        <asp:ListItem>Trên 3 triệu</asp:ListItem>
                        <asp:ListItem>Trên 10 triệu</asp:ListItem>
                        <asp:ListItem>Trên 15 triệu</asp:ListItem>
                        <asp:ListItem>Trên 20 triệu</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <asp:Label ID="Lbl_thunhap" runat="server" Text="Lbl_thunhap"></asp:Label>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
