<%@ Page Title="" Language="C#" MasterPageFile="~/Page/FrontEnd.Master" AutoEventWireup="true" CodeBehind="DetailsProducts.aspx.cs" Inherits="WebShop.Page.DetailsProducts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="main_body" runat="server">

    <asp:DataList ID="DataList1" runat="server" >
        <ItemTemplate>
            <table cellpadding="0" cellspacing="0" style="border-style: solid; border-color: inherit; border-width: 1px; width: 96%; height: 303px; padding:10px; margin:10px; " >
                <tr>
                    <td style="width: 290px">
                        <asp:Label ID="Label1" runat="server" Text='<%# Eval("Title") %>'></asp:Label>
                    </td>
                    <td rowspan="4">
                        <asp:HyperLink ID="HyperLink1" runat="server" ImageUrl='<%# Eval("Photo") %>'
                            >HyperLink</asp:HyperLink>
                    </td>
                </tr>
                <tr>
                    <td style="width: 290px">
                        <asp:Label ID="Label2" runat="server" Text='<%# Eval("Title") %>'></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td style="width: 290px">
                        <asp:Label ID="Label3" runat="server" Text='<%# Eval("Price") %>' ></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td style="width: 290px">
                        <asp:Button ID="Button1" runat="server" Text="Trở về" Width="83px" OnClick="Button1_Click" />
                        <asp:Button ID="Button2" runat="server" Text="add to cart" Width="80px" OnClick="Button2_Click" />
                    </td>
                </tr>
            </table>
        </ItemTemplate>
    </asp:DataList>

</asp:Content>
