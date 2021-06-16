<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Bai5.aspx.cs" Inherits="WebApplication2.Bai5" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Bai 5</title>
    <style>
                    .labeltext1{width: 100%; height: 20px; background-color: blueviolet;color: aliceblue; text-align: center;}
            .area1{width: 100px; background-color: aqua;}
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 840px;
            background-color: aqua;
        }
        .auto-style3 {
            width: 187px;
        }
        .auto-style4 {
            width: 664px;
        }
        .auto-style3 {text-align:right}
        .auto-style5 {
            margin-right: 0px;
        }
        .auto-style6 {
            width: 229px;
        }
        .auto-style7 {
            width: 141px;
        }
        .auto-style8 {
            width: 48px;
        }
        .auto-style9 {
            width: 98px;
        }
        .auto-style10 {
            margin-left: 0px;
        }
        .auto-style11 {
            width: 69px;
        }
        .auto-style12 {
            width: 229px;
            height: 19px;
        }
        .auto-style13 {
            width: 141px;
            height: 19px;
        }
        .auto-style14 {
            width: 48px;
            height: 19px;
        }
        .auto-style15 {
            width: 98px;
            height: 19px;
        }
        .auto-style16 {
            width: 69px;
            height: 19px;
        }
        .auto-style17 {
            height: 19px;
        }
        .auto-style18 {
            height: 23px;
        }
        .auto-style19 {
            height: 23px;
            width: 228px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <header class="labeltext1"><h3 >THÔNG TIN CÁ NHÂN</h3>
        </header>
        <div class="auto-style2">


            <table cellpadding="0" cellspacing="0" class="auto-style1">
                <tr>
                    <td class="auto-style3" >
                        <asp:Label ID="Label1" runat="server" Text="Họ Và Tên"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="TextBox1" runat="server" Width="665px" CssClass="auto-style5"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style3">
                        <asp:Label ID="Label2" runat="server" Text="Ngày Sinh(ngày\tháng\năm)"></asp:Label>
                    </td>
                    <td class="auto-style4">
                        <asp:DropDownList ID="DropDownList2" runat="server" Height="19px" Width="109px">
                            <asp:ListItem>1</asp:ListItem>
                            <asp:ListItem>2</asp:ListItem>
                            <asp:ListItem>3</asp:ListItem>
                            <asp:ListItem>4</asp:ListItem>
                            <asp:ListItem>5</asp:ListItem>
                            <asp:ListItem>6</asp:ListItem>
                            <asp:ListItem>7</asp:ListItem>
                            <asp:ListItem>8</asp:ListItem>
                            <asp:ListItem>9</asp:ListItem>
                            <asp:ListItem>10</asp:ListItem>
                            <asp:ListItem>11</asp:ListItem>
                            <asp:ListItem>12</asp:ListItem>
                            <asp:ListItem>13</asp:ListItem>
                            <asp:ListItem>14</asp:ListItem>
                            <asp:ListItem></asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label4" runat="server" Text="    /    "></asp:Label>
                        <asp:DropDownList ID="DropDownList1" runat="server">
                            <asp:ListItem>1</asp:ListItem>
                            <asp:ListItem>2</asp:ListItem>
                            <asp:ListItem>3</asp:ListItem>
                            <asp:ListItem>4</asp:ListItem>
                            <asp:ListItem>5</asp:ListItem>
                            <asp:ListItem></asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label5" runat="server" Text="    /    "></asp:Label>
                        <asp:DropDownList ID="DropDownList3" runat="server">
                            <asp:ListItem>2000</asp:ListItem>
                            <asp:ListItem>2001</asp:ListItem>
                            <asp:ListItem>2002</asp:ListItem>
                            <asp:ListItem>2003</asp:ListItem>
                            <asp:ListItem>2004</asp:ListItem>
                            <asp:ListItem>2005</asp:ListItem>
                            <asp:ListItem>2006</asp:ListItem>
                            <asp:ListItem>2007</asp:ListItem>
                            <asp:ListItem>2008</asp:ListItem>
                            <asp:ListItem>2009</asp:ListItem>
                            <asp:ListItem></asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label3" runat="server" Text="Giới Tính"></asp:Label>
                        <asp:RadioButton ID="RadioButton1" runat="server" Text="Nam" />
                        <asp:RadioButton ID="RadioButton2" runat="server" Text="Nữ" />
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="auto-style3">
                        <asp:Label ID="Label6" runat="server" Text="Quê Quán"></asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="TextBox2" runat="server" Width="660px"></asp:TextBox>
                    </td>
                </tr>
            </table>


        </div>
        <div class="labeltext1"><h3>TRÌNH ĐỘ HỌC VẤN</h3></div>
        <table cellpadding="0" cellspacing="0" class="auto-style1">
            <tr>
                <td class="auto-style6">
                    <asp:Label ID="Label7" runat="server" Text="Trình độ văn hóa"></asp:Label>
                </td>
                <td class="auto-style7">
                    <asp:TextBox ID="TextBox3" runat="server" Width="138px"></asp:TextBox>
                </td>
                <td class="auto-style8">
                    <asp:Label ID="Label8" runat="server" Text="Học vị"></asp:Label>
                </td>
                <td class="auto-style9">
                    <asp:TextBox ID="TextBox4" runat="server" Width="91px"></asp:TextBox>
                </td>
                <td class="auto-style11">
                    <asp:Label ID="Label9" runat="server" Text="Học hàm"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TextBox5" runat="server" CssClass="auto-style10"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style12">
                    <asp:Label ID="Label10" runat="server" Text="Lý luận chính trị:"></asp:Label>
                </td>
                <td class="auto-style13">
                    <asp:DropDownList ID="DropDownList4" runat="server" Height="18px" Width="143px">
                    </asp:DropDownList>
                </td>
                <td class="auto-style14"></td>
                <td class="auto-style15"></td>
                <td class="auto-style16"></td>
                <td class="auto-style17"></td>
            </tr>
            <tr>
                <td class="auto-style6">
                    <asp:Label ID="Label11" runat="server" Text="Ngoại ngữ"></asp:Label>
                </td>
                <td colspan="5">
                    <asp:CheckBox ID="CheckBox1" runat="server" />
                    <asp:CheckBox ID="CheckBox2" runat="server" />
                    <asp:CheckBox ID="CheckBox3" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="auto-style6">
                    <asp:Label ID="Label12" runat="server" Text="Ghi rõ thời gian, tên trường, loại hình , văn bằng"></asp:Label>
                </td>
                <td colspan="5">
                    <asp:TextBox ID="TextBox6" runat="server" CssClass="auto-style10" Height="72px" Width="480px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <asp:Label ID="Label13" runat="server" Text="Loại hình: chính quy, tại chức, chuyên tu, bồi dưỡng, văn bằng, cử nhân, thạc sĩ, "></asp:Label>
                </td>
            </tr>
        </table>

        <div class="labeltext1"><h3>TÓM TẮT QUÁ TRÌNH CÔNG TÁC</h3></div>
        <table class="auto-style1">
            <tr>
                <td class="auto-style19">
                    <asp:Label ID="Label14" runat="server" Text="Ghi rõ thời gian bắt đầu và kết thúc, chức vụ chức danh"></asp:Label>
                </td>
                <td class="auto-style18">
                    <asp:TextBox ID="TextBox7" runat="server" Height="48px" Width="472px"></asp:TextBox>
                    <br />
                    <asp:Button ID="Button1" runat="server" Text="Cập nhật" Width="97px" />
                    <asp:Button ID="Button2" runat="server" Text="Nhập mới" Width="91px" />
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
