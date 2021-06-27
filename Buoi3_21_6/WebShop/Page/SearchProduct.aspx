<%@ Page Title="" Language="C#" MasterPageFile="~/Page/FrontEnd.Master" AutoEventWireup="true" CodeBehind="SearchProduct.aspx.cs" Inherits="WebShop.Page.SearchProduct" %>
<asp:Content ID="Content1" ContentPlaceHolderID="main_body" runat="server">
    <asp:DataList ID="DataList1" runat="server" Width="535px" RepeatColumns="2">
        <ItemTemplate>
             <table cellpadding="0" cellspacing="0" style="width: 55%; height: 160px; padding: 10px; margin: 10px; border: 1px solid">
                <tr>
                    <td rowspan="4" style="width: 178px">
                        <asp:HyperLink ID="HyperLink1" runat="server" ImageUrl='<%# Eval("Photo") %>'
                            ImageWidth="100px" ImageHeight="100px">
                    HyperLink
                    

                        </asp:HyperLink>
                    </td>
                    <td>
                        <asp:HyperLink ID="HyperLink2" runat="server"
                            Text='<%# Eval("Title") %>'
                            NavigateUrl='<%# "~/Page/DetailsProducts.aspx?Id="+ Eval("Id").ToString() %>'>

                        </asp:HyperLink>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" Text='<%# Eval("Price") %>'>
                   
                        </asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:HyperLink ID="HyperLink3" runat="server"
                            NavigateUrl='<%# "~/Page/DetailsProducts.aspx?Id="+ Eval("Id").ToString() %>'>Xem chi tiết

                        </asp:HyperLink>

                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Button ID="Button1" runat="server" Height="16px" Text="add to cart" OnClick="Button1_Click" />
                    </td>
                </tr>
            </table>
        </ItemTemplate>
    </asp:DataList>
</asp:Content>
