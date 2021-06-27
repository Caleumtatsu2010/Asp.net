<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Search.ascx.cs" Inherits="WebShop.Page.Search" %>
<table width="200px">
    <tr>
        <td align ="center" style="background-color:Purple; color: White; front-weight:bold">
            Tìm kiếm
        </td>
    </tr>
    <tr>
        <td>
            Tên sản phẩm cần tìm: 
            <asp:TextBox ID="txtTen" Width="92%" runat="server"></asp:TextBox>
            <br />

        </td>
    </tr>
    <tr>
        <td class="auto-style2" align="center">

            <asp:Button ID="cmdLogin" runat="server" Text="Tìm kiếm" OnClick="cmdLogin_Click" />

        </td>
    </tr>
</table>