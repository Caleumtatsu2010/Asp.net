<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataList1.aspx.cs" Inherits="WebShop.Page.DataList1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            height: 300px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="auto-style1">
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
            <asp:DropDownList ID="DropDownList1" runat="server" DataSourceID="SqlDataSource1" DataTextField="TenLop" DataValueField="MaLop" Height="24px" Width="173px">
            </asp:DropDownList>
            <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" />
            <asp:DataList ID="DataList2" runat="server" RepeatColumns="4" Width="487px">
                <ItemTemplate>
                   <asp:Label ID="Label1" runat="server" Text='<%# Eval("MaHocSinh")%>'
Width="220px"></asp:Label> <br />
 <asp:Label ID="Label2" runat="server" Text='<%# Eval("TenHocSinh")%>'
Width="220px"></asp:Label> <br />
 <asp:Label ID="Label3" runat="server" Text='<%# Eval ("NgaySinh")%>'
Width="220px"></asp:Label> <br />
 <asp:Label ID="Label4" runat="server" Text='<%# Eval ("MaLop")%>'
Width="220px"></asp:Label>
                </ItemTemplate>
            </asp:DataList>
        </div>
    </form>
</body>
</html>
