<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Login.ascx.cs" Inherits="WebShop.Pages.Login" %>
<style type="text/css">
    .auto-style1 {
        width: 34%;
        height: 153px;
    }
    .auto-style2 {
        width: 169px;
    }
    .auto-style3 {
        width: 169px;
        height: 27px;
    }
    .auto-style4 {
        height: 27px;
    }
</style>

<table cellpadding="0" cellspacing="0" class="auto-style1">
    <tr >
        <td colspan="2" style="background-color: #800080; text-align:center;">
            <asp:Label ID="Label3" runat="server" Text="Đăng Nhập" ForeColor="White"></asp:Label>
        </td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:Label ID="Label1" runat="server" Text="Username"></asp:Label>
        </td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:TextBox ID="TextBox1" runat="server" Width="158px"></asp:TextBox>
        </td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:Label ID="Label2" runat="server" Text="Password"></asp:Label>
        </td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="auto-style3">
            <asp:TextBox ID="TextBox2" runat="server" Width="159px"></asp:TextBox>
        </td>
        <td class="auto-style4"></td>
    </tr>
    <tr>
        <td colspan="2" style=" text-align:center;">
            <asp:Button ID="Button1" runat="server" Text="Đăng Nhập" Width="94px" />
        </td>
    </tr>
</table>

