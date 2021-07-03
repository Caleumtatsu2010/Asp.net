<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication5.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 59%;
        }
        .auto-style3 {
            height: 47px;
        }
        .auto-style5 {
            height: 45px;
        }
        .auto-style6 {
            height: 34px;
        }
        .auto-style7 {
            height: 47px;
            width: 264px;
        }
        .auto-style9 {
            height: 45px;
            width: 264px;
        }
        .auto-style10 {
            height: 34px;
            width: 264px;
        }
        .auto-style11 {
            height: 47px;
            width: 365px;

        }
        .auto-style13 {
            height: 45px;
            width: 365px;
        }
        .auto-style14 {
            height: 34px;
            width: 365px;
        }
        td
        {
            border: 1px solid black;
        }
        .auto-style15 {
            height: 31px;
            width: 264px;
        }
        .auto-style16 {
            height: 31px;
            width: 365px;
        }
        .auto-style17 {
            height: 31px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table cellpadding="0" cellspacing="0" class="auto-style1">
                <tr>
                    <td class="auto-style7">
                        <asp:Label ID="Label1" runat="server" Text="Mã sản phẩm"></asp:Label>
                    </td>
                    <td class="auto-style11">
                        <asp:TextBox ID="TextBox1" runat="server" Width="205px"></asp:TextBox>
                    </td>
                    <td class="auto-style3">
                        <asp:Button ID="Button1" runat="server" Text="Thêm" OnClick="Button1_Click" />
                    </td>
                </tr>
                <tr>
                    <td class="auto-style15">
                        <asp:Label ID="Label4" runat="server" Text="Tên sản phẩm"></asp:Label>
                    </td>
                    <td class="auto-style16">
                        <asp:TextBox ID="TextBox2" runat="server" Width="203px"></asp:TextBox>
                    </td>
                    <td class="auto-style17">
                        <asp:Button ID="Button2" runat="server" Text="Sửa" />
                    </td>
                </tr>
                <tr>
                    <td class="auto-style9">
                        <asp:Label ID="Label2" runat="server" Text="Loại sản phẩm"></asp:Label>
                    </td>
                    <td class="auto-style13">
                        <asp:DropDownList ID="DropDownList1" runat="server" Height="98px" Width="237px">
                        </asp:DropDownList>
                    </td>
                    <td class="auto-style5">
                        <asp:Button ID="Button3" runat="server" Text="Xóa" OnClick="Button3_Click" />
                    </td>
                </tr>
                <tr>
                    <td class="auto-style10">
                        <asp:Label ID="Label3" runat="server" Text="Đơn giá"></asp:Label>
                    </td>
                    <td class="auto-style14">
                        <asp:TextBox ID="TextBox3" runat="server" Width="203px"></asp:TextBox>
                    </td>
                    <td class="auto-style6">
                        <asp:Button ID="Button4" runat="server" Text="Tìm" />
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" CellPadding="4" DataKeyNames="MaSP" ForeColor="#333333" GridLines="None" Height="223px" Width="781px">
                            <AlternatingRowStyle BackColor="White" />
                            <Columns>
                                <asp:BoundField DataField="MaSP" HeaderText="MaSP" ReadOnly="True" SortExpression="MaSP" />
                                <asp:BoundField DataField="TenSP" HeaderText="TenSP" SortExpression="TenSP" />
                                <asp:BoundField DataField="MaLoai" HeaderText="MaLoai" SortExpression="MaLoai" />
                                <asp:BoundField DataField="DonGia" HeaderText="DonGia" SortExpression="DonGia" />
                            </Columns>
                            <FooterStyle BackColor="#990000" Font-Bold="True" ForeColor="White" />
                            <HeaderStyle BackColor="#990000" Font-Bold="True" ForeColor="White" />
                            <PagerStyle BackColor="#FFCC66" ForeColor="#333333" HorizontalAlign="Center" />
                            <RowStyle BackColor="#FFFBD6" ForeColor="#333333" />
                            <SelectedRowStyle BackColor="#FFCC66" Font-Bold="True" ForeColor="Navy" />
                            <SortedAscendingCellStyle BackColor="#FDF5AC" />
                            <SortedAscendingHeaderStyle BackColor="#4D0000" />
                            <SortedDescendingCellStyle BackColor="#FCF6C0" />
                            <SortedDescendingHeaderStyle BackColor="#820000" />
                        </asp:GridView>
                    </td>
                </tr>
            </table>
        </div>
        <asp:Label ID="Label5" runat="server" Text="Label"></asp:Label>
    </form>
</body>
</html>
