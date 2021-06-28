<%@ Page Title="" Language="C#" MasterPageFile="~/Page/FrontEnd.Master" AutoEventWireup="true" CodeBehind="InsertProduct.aspx.cs" Inherits="WebShop.Page.InsertProduct" %>
<asp:Content ID="Content1" ContentPlaceHolderID="main_body" runat="server">
    <table style="width: 100%; height: 236px">
        <tr>
            <td style="height: 38px; width: 157px">
                <asp:Label ID="Label1" runat="server" Text="Tiêu đế sách"></asp:Label>
            </td>
            <td style="height: 38px">
                <asp:TextBox ID="TextBoxTitle" runat="server" Width="280px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 157px">
                <asp:Label ID="Label2" runat="server" Text="Nội dung tóm tắt"></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="TextBox2" runat="server" Width="277px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 157px">
                <asp:Label ID="Label3" runat="server" Text="Giá sách"></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="TextBoxPrice" runat="server" Width="276px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 157px">
                <asp:Label ID="Label4" runat="server" Text="Số lượng"></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="TextBox4" runat="server" Width="276px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 157px">
                <asp:Label ID="Label5" runat="server" Text="Loại sách"></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="TextBox5" runat="server" Width="274px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 157px">
                <asp:Label ID="Label6" runat="server" Text="Hình ảnh"></asp:Label>
            </td>
            <td>
                <asp:FileUpload ID="FileUpload1" runat="server" Width="222px" />
            </td>
        </tr>
    </table>
    <table style="width: 100%; height: 204px">
        <tr>
            <td style="height: 41px; width: 234px"></td>
            <td style="height: 41px; width: 99px;" class="auto-style2">
                <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" style="height: 26px" Text="Thêm" Width="60px" />
            </td>
            <td style="height: 41px; width: 96px;" class="auto-style2">
                <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Text="Nhập lại" />
            </td>
            <td style="height: 41px" class="auto-style2"></td>
        </tr>
        <tr>
            <td style="height: 21px; width: 234px"></td>
            <td style="height: 21px; width: 99px;" class="auto-style2"></td>
            <td style="height: 21px; width: 96px;" class="auto-style2"></td>
            <td style="height: 21px" class="auto-style2"></td>
        </tr>
        <tr>
            <td style="width: 234px"></td>
            <td style="width: 99px;"></td>
            <td style="width: 96px;"></td>
            <td></td>
        </tr>
        <tr>
            <td class="auto-style1" style="width: 234px">&nbsp;</td>
            <td style="width: 99px">&nbsp;</td>
            <td style="width: 96px">&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        </table>
</asp:Content>
