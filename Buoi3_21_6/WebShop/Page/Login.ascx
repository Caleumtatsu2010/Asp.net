<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Login.ascx.cs" Inherits="WebShop.Page.Login" %>
<style type="text/css">
    .auto-style1 {
        width: 200px;
    }
    .auto-style2 {
        height: 26px;
    }
</style>

<table class="auto-style1">
    <tr>
        <td align ="center" style="background-color:Purple; color: White; front-weight:bold">
            Đăng nhập
        </td>
    </tr>
    <tr>
        <td>User name:<asp:TextBox ID="txtUserName" Width="92%" runat="server"></asp:TextBox>
            <br />
            Password: 
            <asp:TextBox ID="txtPassWord" Width="92%" runat="server"></asp:TextBox>
            <br />
        </td>
    </tr>
    <tr>
        <td class="auto-style2" align="center">

            <asp:Button ID="cmdLogin" runat="server" Text="Đăng nhập" />

        </td>
    </tr>
</table>

