<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Bai5.aspx.cs" Inherits="WebApplication2.Bai5" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
           <style>
        div {
            width: 900px;

            align-items: center;
        }

        table {
            width: 100%;
            margin-left: 200px;
            text-align: center;
            border: 1px solid black;

        }

        td {
            
            font-size: small;
        }

        .headtitle1 {
            background-color: blueviolet;
            height:fit-content;
        }

        .headtitle1 h4 {
            color: aliceblue;
        }
               .auto-style1 {
                   margin-left: 0px;
               }
               .auto-style2 {
                   height: 28px;
               }
               .auto-style3 {
                   height: 19px;
               }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table>
                <tr ><td class="headtitle1" colspan="9" ><h4 >THONG TIN CA NHAN</h4></td></tr>
                <tr>
                    <td ><p>Ho va ten</p></td>
                    <td colspan="7">
                        <asp:TextBox ID="TextBox1" runat="server" Width="469px" CssClass="auto-style1"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Ngay sinh(ngay/thang/nam)</td>
                    <td>
                        <asp:DropDownList ID="DropDownList1" runat="server" Width="64px">
                            <asp:ListItem>1</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td>
                        <asp:DropDownList ID="DropDownList2" runat="server" Width="64px">
                            <asp:ListItem>1</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td>
                        <asp:DropDownList ID="DropDownList3" runat="server" Width="64px">
                            <asp:ListItem>1</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td><p>Gioi tinh</p></td>
                    <td>
                        <asp:RadioButton ID="RadioButton1" runat="server" Text="Nam" />
                    </td>
                    <td>
                        <asp:RadioButton ID="RadioButton2" runat="server" Text="Nu" />
                    </td>
                </tr>
                <tr>
                    <td class="auto-style2"><p>Que quan</p></td>
                    <td colspan="7" class="auto-style2"><p>
                        <asp:TextBox ID="TextBox2" runat="server" Width="470px" CssClass="auto-style1"></asp:TextBox>
                        </p></td>
                </tr>
                <tr><td class="headtitle1" colspan="8"><h4>TRINH DO HOC VAN</h4></td></tr>
                <tr>
                    <td colspan="2"><p>Trinh do van hoa</p>></td>
                    <td>
                        <asp:DropDownList ID="DropDownList4" runat="server" Width="64px">
                            <asp:ListItem>1</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td><p>Hoc vi</p></td>
                    <td>Hoc Ham</td>
                    <td colspan="2">
                        <asp:DropDownList ID="DropDownList5" runat="server" Width="64px">
                            <asp:ListItem>1</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><p>Ly Luan trinh tri</p></td>
                    <td colspan="8">
                        <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><p>ngoai ngu </p></td>
                    <td colspan="8">
                        <asp:CheckBox ID="CheckBox1" Text="Anh" runat="server" />
                        <asp:CheckBox ID="CheckBox2" Text="Phap" runat="server" />
                        <asp:CheckBox ID="CheckBox3" Text="Nga" runat="server" />
                    </td>

                </tr>
                <tr>
                    <td colspan="2"><p>Ghi ro ten truong nganh hoc, thoi gian, loai hinh, van bang</p></td>
                    <td colspan="7">
                        <asp:TextBox ID="TextBox4" runat="server" Height="73px" Width="380px"></asp:TextBox>
                    </td>
                </tr>
                <tr><td colspan="8">Loai hinh, chinh quy, tai chuc, chuyen tu, boi duong, van bang, tien si</td></tr>
                <tr><td class="headtitle1" colspan="8"><h4>TOM TAT QUA TRINH CONG TAC</h4></td></tr>
                <tr>
                    <td colspan="2"><p>Ghi ro thoi gian bat dau va ket thuc: chuc danh, chuc vu, don vi, cong tac tuong ung</p></td>
                    <td colspan="7">
                        <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                    </td>
                </tr>
            <tr>
                <td></td>
                <td>
                         <asp:Button ID="Button1" runat="server" Text="Cap Nhat" />      
                </td>
                <td>      
                    <asp:Button ID="Button2" runat="server" Text="Nhap moi" />
                </td>

            </tr>
            </table>
        </div>
    </form>
</body>
</html>
