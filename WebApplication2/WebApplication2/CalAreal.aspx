<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CalAreal.aspx.cs" Inherits="WebApplication2.CalAreal" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        label{font-size:larger}
        .auto-style1 {
            width: 40%;
        }
        .auto-style2 {
            height: 151px;
        }
        .auto-style3 {
            width: 156px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="auto-style2">
            <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
            <table cellpadding="0" cellspacing="0" class="auto-style1">
                <tr>
                    <td class="auto-style3">
                        <asp:Label ID="lblChieudai" runat="server" Text="Chieu dai"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox1" runat="server" Width="147px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style3">
                        <asp:Label ID="LabelChieurong" runat="server" Text="Chieu rong"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox2" runat="server" Width="148px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style3">
                        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Tính" />
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox3" runat="server" Width="146px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
