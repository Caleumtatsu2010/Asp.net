<%@ Page Title="" Language="C#" MasterPageFile="~/Page/FrontEnd.Master" AutoEventWireup="true" CodeBehind="SanPham.aspx.cs" Inherits="WebShop.Page.SanPham" %>

<asp:Content ID="Content1" ContentPlaceHolderID="main_body" runat="server">
    <asp:DataList ID="DataList1" runat="server" DataKeyField="Id" RepeatColumns="2"
        Width="520px">
        <ItemTemplate>
            <table class="myBox">
                <tr>
                    <td style="width: 97px">
                        <asp:HyperLink ID="HyperLink1" runat="server"
                            NavigateUrl='<%# "DetailsProducts.aspx?Id=" + Eval("Id").ToString() %>'
                            ImageUrl='<%# Eval("Photo") %>'
                            ToolTip="Xem chi tiết...">
                        </asp:HyperLink>
                    </td>
                    <td class="name" style="width: 150px">
                        <h3>
                            <asp:HyperLink ID="HyperLink2" runat="server"
                                NavigateUrl='<%# "DetailsProducts.aspx?Id=" + Eval("Id").ToString() %>'
                                Text='<%# Eval("Title") %>'
                                ToolTip="Xem chi tiết...">
                            </asp:HyperLink>
                        </h3>
                        <br />
                        <br />
                        Giá:
 <asp:Literal ID="Literal1" runat="server"
     Text='<%# Eval("Price") %>' />
                        đ
 <br />
                        <br />
                        <asp:HyperLink ID="hyperLink3" runat="server"
                            NavigateUrl='<%# "DetailsProducts.aspx?Id=" + Eval("Id").ToString() %>'>
 Xem chi tiết...
                        </asp:HyperLink>
                        <asp:Button ID="ButCart" runat="server" CommandName="AddToCart"
                            Text="Add Cart" />
                    </td>
                </tr>
            </table>
            <br />
        </ItemTemplate>
    </asp:DataList>
</asp:Content>
