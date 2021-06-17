<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="WebApplication2.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            height: 106px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" class="auto-style1">
        <div>
            <asp:Label ID="usenameLbl" runat="server" Text="User Name:"></asp:Label>
            <asp:TextBox ID="usenameTxt" runat="server"></asp:TextBox>
        </div>
        <asp:Label ID="passwordLbl" runat="server" Text="Password:"></asp:Label>
        <asp:TextBox ID="passwordTxt" runat="server"></asp:TextBox><br />
        <asp:Button ID="Button1" runat="server" Text="Submit" 
          OnClick="Button1_Click"   />
    </form>
</body>
</html>
