<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Bai1.aspx.cs" Inherits="WebApplication1.Bai1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 62%;
        }
        .auto-style2 {
            width: 226px;
        }
        .auto-style3 {
            margin-left: 0px;
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
                    <asp:Label ID="txtA" runat="server" Text="Nhập số A:"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBoxA" runat="server" Width="203px" CssClass="auto-style3"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="txtB" runat="server" Text="Nhập số B: "></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBoxB" runat="server" Width="205px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="kq" runat="server" Text="Kết Quả"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBoxkq" runat="server" Width="205px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2"  >
                    <asp:Button ID="Buttoncong" runat="server" Text="Cộng" OnClick="Buttoncong_Click" Width="53px" />
                    <asp:Button ID="Buttontru" runat="server" Text="Trừ" OnClick="Buttontru_Click" Width="52px" />
                    <asp:Button ID="Buttonnhan" runat="server" Text="Nhân" OnClick="Buttonnhan_Click" Width="56px" />
                    <asp:Button ID="Buttonchia" runat="server" Text="Chia" OnClick="Buttonchia_Click" Width="59px" />
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
