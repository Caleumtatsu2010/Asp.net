<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Search.ascx.cs" Inherits="WebShop.Pages.Search" %>
<style type="text/css">
    .auto-style1 {
        width: 35%;
        text-align:center;
    }
    .auto-style2 {
        width: 292px;
    }
</style>

<table cellpadding="0" cellspacing="0" class="auto-style1">
    <tr>
        <td class="auto-style2" style="background-color:blueviolet;">
            <asp:Label ID="Label1" runat="server" ForeColor="White" Text="Tìm Kiếm"></asp:Label>
        </td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:Label ID="Label2" runat="server" Text="Viết Tên Sản phẩm cần tìm"></asp:Label>
        </td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:TextBox ID="TextBox1" runat="server" Width="228px"></asp:TextBox>
        </td>
    </tr>
    <tr>
        <td class="auto-style2">
            <asp:Button ID="Button1" runat="server" Text="Tìm Kiếm" />
        </td>
    </tr>
</table>

