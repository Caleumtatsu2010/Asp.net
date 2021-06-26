<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QLHS2.aspx.cs" Inherits="WebShop.Page.QLHS2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style2 {
            width: 100%;
        }
        .auto-style3 {
            width: 153px;
        }
        .auto-style4 {
            width: 187px;
        }
        .auto-style5 {
            width: 233px;
        }
        .auto-style6 {
            width: 335px;
        }
        .auto-style7 {
            width: 100%;
            height: 363px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" class="auto-style2">
            <tr>
                <td class="auto-style3">
                    <asp:Label ID="Label1" runat="server" Text="Lựa chọn"></asp:Label>
                </td>
                <td class="auto-style4">
                    <asp:DropDownList ID="DropDownList1" runat="server" DataSourceID="SqlDataSource1" DataTextField="TenLop" DataValueField="MaLop" Height="18px" Width="151px">
                    </asp:DropDownList>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:QLHSConnectionString %>" DeleteCommand="DELETE FROM [LOPHOC] WHERE [MaLop] = @MaLop" InsertCommand="INSERT INTO [LOPHOC] ([MaLop], [TenLop], [DienGiai], [LopChuyen], [HoTenGVCN]) VALUES (@MaLop, @TenLop, @DienGiai, @LopChuyen, @HoTenGVCN)" SelectCommand="SELECT * FROM [LOPHOC]" UpdateCommand="UPDATE [LOPHOC] SET [TenLop] = @TenLop, [DienGiai] = @DienGiai, [LopChuyen] = @LopChuyen, [HoTenGVCN] = @HoTenGVCN WHERE [MaLop] = @MaLop">
                        <DeleteParameters>
                            <asp:Parameter Name="MaLop" Type="Int32" />
                        </DeleteParameters>
                        <InsertParameters>
                            <asp:Parameter Name="MaLop" Type="Int32" />
                            <asp:Parameter Name="TenLop" Type="String" />
                            <asp:Parameter Name="DienGiai" Type="String" />
                            <asp:Parameter Name="LopChuyen" Type="Boolean" />
                            <asp:Parameter Name="HoTenGVCN" Type="String" />
                        </InsertParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="TenLop" Type="String" />
                            <asp:Parameter Name="DienGiai" Type="String" />
                            <asp:Parameter Name="LopChuyen" Type="Boolean" />
                            <asp:Parameter Name="HoTenGVCN" Type="String" />
                            <asp:Parameter Name="MaLop" Type="Int32" />
                        </UpdateParameters>
                    </asp:SqlDataSource>
                </td>
                <td class="auto-style5">
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Tim" Width="105px" />
                </td>
                <td>
                    <asp:Button ID="Button2" runat="server" Text="Bo Tim" Width="105px" />
                </td>
            </tr>
        </table>
        <div>
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" PageSize="4" Width="380px">
                <Columns>
                    <asp:BoundField DataField="MaHocSinh" HeaderText="Mã Học Sinh" />
                    <asp:BoundField DataField="TenHocSInh" HeaderText="Tên Học Sinh" />
                    <asp:BoundField DataField="NgaySinh" HeaderText="Ngày Sinh" />
                </Columns>
            </asp:GridView>
        </div>
        
    </form>
</body>
</html>
