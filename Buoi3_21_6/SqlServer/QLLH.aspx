<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QLLH.aspx.cs" Inherits="SqlServer.QLLH" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
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
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:QLHSConnectionString %>" SelectCommand="SELECT * FROM [HOCSINH] WHERE ([MaLop] = @MaLop)">
            <SelectParameters>
                <asp:ControlParameter ControlID="GridView1" DefaultValue="2" Name="MaLop" PropertyName="SelectedValue" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <div>
            <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#CC9966" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="MaLop" DataSourceID="SqlDataSource1" PageSize="3" Width="728px">
                <Columns>
                    <asp:CommandField SelectText="Chọn dòng" ShowSelectButton="True" />
                    <asp:BoundField DataField="MaLop" HeaderText="Mã lớp" ReadOnly="True" SortExpression="MaLop" />
                    <asp:BoundField DataField="TenLop" HeaderText="Tên lớp" SortExpression="TenLop" />
                    <asp:BoundField DataField="DienGiai" HeaderText="Diễn giải" SortExpression="DienGiai" />
                    <asp:CheckBoxField DataField="LopChuyen" HeaderText="Lớp chuyên" SortExpression="LopChuyen" />
                    <asp:BoundField DataField="HoTenGVCN" HeaderText="Giáo viên chủ nhiệm" SortExpression="HoTenGVCN" />
                    <asp:CommandField CancelText="Bỏ qua" EditText="Sửa" ShowEditButton="True" UpdateText="Cập nhật" />
                    <asp:CommandField DeleteText="Xóa" ShowDeleteButton="True" />
                </Columns>
                <EmptyDataTemplate>
                    Mã lớp
                </EmptyDataTemplate>
                <FooterStyle BackColor="#FFFFCC" ForeColor="#330099" />
                <HeaderStyle BackColor="#990000" Font-Bold="True" ForeColor="#FFFFCC" />
                <PagerStyle BackColor="#FFFFCC" ForeColor="#330099" HorizontalAlign="Center" />
                <RowStyle BackColor="White" ForeColor="#330099" />
                <SelectedRowStyle BackColor="#FFCC66" Font-Bold="True" ForeColor="#663399" />
                <SortedAscendingCellStyle BackColor="#FEFCEB" />
                <SortedAscendingHeaderStyle BackColor="#AF0101" />
                <SortedDescendingCellStyle BackColor="#F6F0C0" />
                <SortedDescendingHeaderStyle BackColor="#7E0000" />
            </asp:GridView>
            <br />
            <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#CC9966" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataKeyNames="MaHocSinh" DataSourceID="SqlDataSource2" Width="513px">
                <Columns>
                    <asp:BoundField DataField="MaHocSinh" HeaderText="Mã học sinh" ReadOnly="True" SortExpression="MaHocSinh" />
                    <asp:BoundField DataField="TenHocSinh" HeaderText="Tên học sinh" SortExpression="TenHocSinh" />
                    <asp:BoundField DataField="NgaySinh" HeaderText="Ngày sinh" SortExpression="NgaySinh" />
                    <asp:BoundField DataField="MaLop" HeaderText="Mã lớp" SortExpression="MaLop" />
                </Columns>
                <FooterStyle BackColor="#FFFFCC" ForeColor="#330099" />
                <HeaderStyle BackColor="#990000" Font-Bold="True" ForeColor="#FFFFCC" />
                <PagerStyle BackColor="#FFFFCC" ForeColor="#330099" HorizontalAlign="Center" />
                <RowStyle BackColor="White" ForeColor="#330099" />
                <SelectedRowStyle BackColor="#FFCC66" Font-Bold="True" ForeColor="#663399" />
                <SortedAscendingCellStyle BackColor="#FEFCEB" />
                <SortedAscendingHeaderStyle BackColor="#AF0101" />
                <SortedDescendingCellStyle BackColor="#F6F0C0" />
                <SortedDescendingHeaderStyle BackColor="#7E0000" />
            </asp:GridView>
            <br />
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chọn lớp học:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b>  
            <asp:DropDownList ID="DropDownList1" runat="server" Height="27px" Width="203px" DataSourceID="SqlDataSource1" DataTextField="TenLop" DataValueField="MaLop">
            </asp:DropDownList>
        &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnTim" runat="server" Text="Tìm" OnClick="btnTim_Click"  />
&nbsp;&nbsp;&nbsp;
            <asp:Button ID="btnBoTim" runat="server" Text="Bỏ tìm" OnClick="btnBoTim_Click"  />
            <br />
            <br />
            <asp:GridView ID="GridView3" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#3366CC" BorderStyle="None" BorderWidth="1px" CellPadding="4" PageSize="3">
                <Columns>
                    <asp:BoundField DataField="MaHocSinh" HeaderText="Mã học sinh" />
                    <asp:BoundField DataField="TenHocSinh" HeaderText="Họ tên học sinh" />
                    <asp:BoundField DataField="NgaySinh" HeaderText="Ngày sinh" />
                </Columns>
                <FooterStyle BackColor="#99CCCC" ForeColor="#003399" />
                <HeaderStyle BackColor="#003399" Font-Bold="True" ForeColor="#CCCCFF" />
                <PagerStyle BackColor="#99CCCC" ForeColor="#003399" HorizontalAlign="Left" />
                <RowStyle BackColor="White" ForeColor="#003399" />
                <SelectedRowStyle BackColor="#009999" Font-Bold="True" ForeColor="#CCFF99" />
                <SortedAscendingCellStyle BackColor="#EDF6F6" />
                <SortedAscendingHeaderStyle BackColor="#0D4AC4" />
                <SortedDescendingCellStyle BackColor="#D6DFDF" />
                <SortedDescendingHeaderStyle BackColor="#002876" />
            </asp:GridView>
        </div>
    </form>
</body>
</html>
