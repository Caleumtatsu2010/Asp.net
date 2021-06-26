<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QLHS.aspx.cs" Inherits="WebShop.Page.QLHS" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            height: 731px;
        }

        .auto-style2 {
            height: 659px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" class="auto-style1">
        <div class="auto-style2">
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
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" CellPadding="4" DataKeyNames="MaLop" DataSourceID="SqlDataSource1" ForeColor="#333333" GridLines="None" Width="721px">
                <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                <Columns>
                    <asp:BoundField DataField="MaLop" HeaderText="Mã Lớp" ReadOnly="True" SortExpression="MaLop" />
                    <asp:BoundField DataField="TenLop" HeaderText="Tên Lớp" SortExpression="TenLop" />
                    <asp:BoundField DataField="DienGiai" HeaderText="Diễn Giải" SortExpression="DienGiai" />
                    <asp:CheckBoxField DataField="LopChuyen" HeaderText="LopChuyen" SortExpression="LopChuyen" />
                    <asp:BoundField DataField="HoTenGVCN" HeaderText="HoTenGVCN" SortExpression="HoTenGVCN" />
                    <asp:CommandField ButtonType="Button" ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
                </Columns>
                <EditRowStyle BackColor="#999999" />
                <FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
                <HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
                <RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
                <SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
                <SortedAscendingCellStyle BackColor="#E9E7E2" />
                <SortedAscendingHeaderStyle BackColor="#506C8C" />
                <SortedDescendingCellStyle BackColor="#FFFDF8" />
                <SortedDescendingHeaderStyle BackColor="#6F8DAE" />
            </asp:GridView>
            <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:QLHSConnectionString %>" DeleteCommand="DELETE FROM [HOCSINH] WHERE [MaHocSinh] = @MaHocSinh" InsertCommand="INSERT INTO [HOCSINH] ([MaHocSinh], [TenHocSInh], [NgaySinh], [MaLop]) VALUES (@MaHocSinh, @TenHocSInh, @NgaySinh, @MaLop)" SelectCommand="SELECT * FROM [HOCSINH] WHERE MaLop=@MaLop" UpdateCommand="UPDATE [HOCSINH] SET [TenHocSInh] = @TenHocSInh, [NgaySinh] = @NgaySinh, [MaLop] = @MaLop WHERE [MaHocSinh] = @MaHocSinh">
                <SelectParameters>
                    <asp:ControlParameter Name="MaLop" ControlID="GridView1"
                        PropertyName="SelectedDataKey.Value" DefaultValue="1" />

                </SelectParameters>
                <DeleteParameters>
                    <asp:Parameter Name="MaHocSinh" Type="Int32" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="MaHocSinh" Type="Int32" />
                    <asp:Parameter Name="TenHocSInh" Type="String" />
                    <asp:Parameter DbType="Date" Name="NgaySinh" />
                    <asp:Parameter Name="MaLop" Type="Int32" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="TenHocSInh" Type="String" />
                    <asp:Parameter DbType="Date" Name="NgaySinh" />
                    <asp:Parameter Name="MaLop" Type="Int32" />
                    <asp:Parameter Name="MaHocSinh" Type="Int32" />
                </UpdateParameters>
            </asp:SqlDataSource>
            <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="MaHocSinh" DataSourceID="SqlDataSource2" Width="587px">
                <Columns>
                    <asp:BoundField DataField="MaHocSinh" HeaderText="MaHocSinh" ReadOnly="True" SortExpression="MaHocSinh" />
                    <asp:BoundField DataField="TenHocSInh" HeaderText="TenHocSInh" SortExpression="TenHocSInh" />
                    <asp:BoundField DataField="NgaySinh" HeaderText="NgaySinh" SortExpression="NgaySinh" />
                    <asp:BoundField DataField="MaLop" HeaderText="MaLop" SortExpression="MaLop" />
                    <asp:CommandField ButtonType="Button" ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                <RowStyle ForeColor="#000066" />
                <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
                <SortedAscendingCellStyle BackColor="#F1F1F1" />
                <SortedAscendingHeaderStyle BackColor="#007DBB" />
                <SortedDescendingCellStyle BackColor="#CAC9C9" />
                <SortedDescendingHeaderStyle BackColor="#00547E" />
            </asp:GridView>
        </div>
    </form>
</body>
</html>
