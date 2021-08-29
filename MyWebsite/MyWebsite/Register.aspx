<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="MyWebsite.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Create Account</title>

    <!-- Main css -->
    <link rel="stylesheet" href="css/register.css">
</head>
<body>
 <form id="form1" runat="server">
        <div>
            <div class="main">

        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="form-title">Create account</h2>
                        <div class="form-group">
                            
                            <asp:TextBox ID="TextBoxFirstName" runat="server" class="form-input" name="firstname"  placeholder="First Name" required OnTextChanged="TextBoxName_TextChanged"></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TextBoxLastname" runat="server" class="form-input" name="lastname"  placeholder="Last Name" required></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TextBoxPhone" runat="server" class="form-input" name="phone"  placeholder="Phone Number" required></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TextBoxEmail" runat="server" class="form-input" name="email"  placeholder="Your Email" required></asp:TextBox>
                        </div>
                        <div class="form-group" style="display:flex">
                            <p>Date of Birth</p>
                            <asp:DropDownList ID="DropDownListDay" runat="server" class="form-input" name="Day" style="width:90px;margin-left:30px;height:50px" >
                                <asp:ListItem>Day</asp:ListItem>
                                <asp:ListItem>1</asp:ListItem>
                                <asp:ListItem>2</asp:ListItem>
                                <asp:ListItem>3</asp:ListItem>
                                <asp:ListItem>4</asp:ListItem>
                                <asp:ListItem>5</asp:ListItem>
                                <asp:ListItem>6</asp:ListItem>
                                <asp:ListItem>7</asp:ListItem>
                                <asp:ListItem>8</asp:ListItem>
                            </asp:DropDownList>

                            <asp:DropDownList ID="DropDownListMonth" runat="server" class="form-input" name="Month" style="width:99px;margin-left:30px;height:50px" >
                                <asp:ListItem>Month</asp:ListItem>
                                <asp:ListItem>1</asp:ListItem>
                                <asp:ListItem>2</asp:ListItem>
                                <asp:ListItem>3</asp:ListItem>
                                <asp:ListItem>4</asp:ListItem>
                                <asp:ListItem>5</asp:ListItem>
                                <asp:ListItem>6</asp:ListItem>
                                <asp:ListItem>7</asp:ListItem>
                                <asp:ListItem>8</asp:ListItem>
                            </asp:DropDownList>

                            <asp:DropDownList ID="DropDownListYear" runat="server" class="form-input" name="Year" style="width:131px; margin-left:30px;height:50px" >
                                <asp:ListItem>Year</asp:ListItem>
                                <asp:ListItem>1997</asp:ListItem>
                                <asp:ListItem>1998</asp:ListItem>
                                <asp:ListItem>1999</asp:ListItem>
                                <asp:ListItem>2000</asp:ListItem>
                                <asp:ListItem>2002</asp:ListItem>
                                <asp:ListItem>2003</asp:ListItem>
                                <asp:ListItem>2004</asp:ListItem>
                                <asp:ListItem>2005</asp:ListItem>

                            </asp:DropDownList>

                   
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TextBoxUsername" runat="server" class="form-input" name="accountname"  placeholder="User Name" required></asp:TextBox>
                        </div>
                        <div class="form-group">
  
                            <asp:TextBox ID="TextBoxPass" runat="server" class="form-input" name="password"  placeholder="Password" required></asp:TextBox>

                            <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span>

                        </div>
                        <div class="form-group">

                            <asp:TextBox ID="TextBoxRePass" runat="server" class="form-input" name="re_password"  placeholder="Repeat your password" required></asp:TextBox>

                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                            <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                        </div>
                        <div class="form-group">

                            <asp:Button ID="ButtonCreate" runat="server" Text="Create Account" name="submit" class="form-submit" OnClick="ButtonCreate_Click"  />
                        
                        </div>
                    </form>
                    <p class="loginhere">
                        Have already an account ? <a href="Login.aspx" class="loginhere-link">Login here</a>
                    </p>
                </div>
            </div>
        </section>

    </div>

        </div>
    </form>
</body>
</html>
