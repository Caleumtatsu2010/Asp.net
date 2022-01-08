
create database [travel.com.vn]
go

USE [travel.com.vn]
GO


CREATE TABLE dbo.Department
(
  ID   INT NOT NULL PRIMARY KEY,
  Name NVARCHAR(MAX)
)



INSERT INTO [travel.com.vn].dbo.Department (ID, Name) VALUES (1, N'Bộ phận Quản lý nội dung');
INSERT INTO [travel.com.vn].dbo.Department (ID, Name) VALUES (2, N'Bộ phận Chăm sóc khách hàng');
INSERT INTO [travel.com.vn].dbo.Department (ID, Name) VALUES (3, N'Bộ phận Kiểm duyệt bình luận');
INSERT INTO [travel.com.vn].dbo.Department (ID, Name) VALUES (4, N'Hướng dẫn viên du lịch');
INSERT INTO [travel.com.vn].dbo.Department (ID, Name) VALUES (5, N'Bộ phận xử lý đơn hàng');




CREATE TABLE dbo.Employee
(
  ID           int NOT NULL PRIMARY KEY,
  Name         NVARCHAR(MAX),
  Address      NVARCHAR(MAX),
  [Phone#]     CHAR(15),
  Image1 NVARCHAR(MAX),
  DepartmentID INT
  CONSTRAINT FK_Employee_Department REFERENCES Department
)





INSERT INTO [travel.com.vn].dbo.Employee  VALUES (1, N'Trần Hướng Dẫn', N'Việt Nam', '02413414514    ', '', 4);
INSERT INTO [travel.com.vn].dbo.Employee  VALUES (2, N'Nguyễn Văn A', N'Việt Nam', '0123456789     ', '', 1);
INSERT INTO [travel.com.vn].dbo.Employee  VALUES (3, N'Nguyễn Thị Hoa', N'Việt Nam', '0141349105     ', '', 2);
INSERT INTO [travel.com.vn].dbo.Employee  VALUES (4, N'Trần Văn C', N'Việt Nam', '014913898      ', '', 5);
INSERT INTO [travel.com.vn].dbo.Employee  VALUES (5, N'Trần Văn B', N'Việt Nam', '0141349898     ', '', 3);




CREATE TABLE Account
(
  Username     NVARCHAR(50) not null primary key,
  Password				NVARCHAR(50),
  Roles NVARCHAR(50),
 )



 INSERT [dbo].[Account] ([Username], [Password], [Roles]) VALUES (N'abc', N'1234', N'user')
  INSERT [dbo].[Account] ([Username], [Password], [Roles]) VALUES (N'abcdef', N'1234', N'admin')




CREATE TABLE dbo.Member
(
  ID         int NOT NULL PRIMARY KEY identity(1,1),
  Username     NVARCHAR(50),
  Email      CHAR(50),
  Name       NVARCHAR(MAX),
  Gender     CHAR,
  DayOfBirth DATE,
  Address    NVARCHAR(MAX),
  Phone   CHAR(15),
  Image1 NVARCHAR(MAX)
  constraint fk_username_account foreign key (Username) references Account(Username) 
)










CREATE TABLE dbo.TourCategory
(
  TourCategoryCode            int   NOT NULL primary key,
  CategoryName				NVARCHAR(300),
  Intro nvarchar(1000)	
 )



INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (1, N'ĐÀ NẴNG', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (2, N'HÀ NỘI', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (3, N'BÀ NÀ', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (4, N'HUẾ', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (5, N'HỘI AN', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (6, N'PHÚ QUỐC', NULL)
INSERT [dbo].[TourCategory] ([TourCategoryCode], [CategoryName], [Intro]) VALUES (7, N'VINPEARL LAND', NULL)









CREATE TABLE dbo.Tour
(
  TourCode                    int NOT NULL PRIMARY KEY,
  Name                    NVARCHAR(MAX),
  Detail                  NVARCHAR(MAX),
  Slot                    INT,
  DeptTime                datetime,
  [Day]      INT,
  Vehicle NVARCHAR(100),
  Destination NVARCHAR(100),
  Image1  NVARCHAR(100),
  Image2  NVARCHAR(100),
  TourCategoryCode int,
  constraint Fk_Sp2 foreign key (TourCategoryCode) references TourCategory(TourCategoryCode)
)
ALTER TABLE Tour
ADD oldPrice int;
ALTER TABLE Tour
ADD newPrice int;







INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (1, N'TOUR BÀ NÀ 1 NGÀY GIÁ RẺ', NULL, 20, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 1, N'Xe Hơi', N'Đà Nẵng - Bà Nà', N'569450798653707104660917868903353466252790n-1080x738-1617070.jpg', NULL, 3, NULL, 850000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (2, N'TOUR ĐÀ NẴNG CITY', NULL, 20, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 2, N'Ô tô', N'Đà Nẵng', N'da-nang-1560236370.jpg', NULL, 1, NULL, 550000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (3, N'TOUR CHÙA HƯƠNG 1 NGÀY', NULL, NULL, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 10, N'Ô tô', N'Hà Nội', N'1-1559727062.jpg', NULL, 2, NULL, 680000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (4, N'TOUR ĐÀ NẴNG TẮM KHOÁNG NÓNG GALINA 1 NGÀY', NULL, NULL, NULL, NULL, NULL, NULL, N'da-nang-1560236993.jpg', NULL, 1, NULL, 640000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (5, N'TOUR LẶN NGẮM SAN HÔ BÁN ĐẢO SƠN TRÀ', NULL, NULL, NULL, 1, N'Ô tô', N'Sơn Trà', N'da-nang-1560235659.jpg', NULL, 1, NULL, 600000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (6, N'TOUR DU LỊCH HÒA PHÚ THÀNH', NULL, NULL, NULL, 1, N'Ôtô', N'Hòa Phú Thành', N'da-nang-1560236091.jpg', NULL, 1, NULL, 650000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (7, N'TOUR ĐẢO NGỌC CÁT BÀ - VỊNH LAN HẠ', NULL, NULL, NULL, 2, N'Ô tô', N' Cát Bà - Vịnh Lan Hạ', N'cat-ba1600677215-1617957803.jpg', NULL, 2, NULL, 1650000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (8, N'Tour Đảo Cô Tô - Thiên Đường Biển', NULL, NULL, NULL, 3, N'Ô tô, tàu cao tốc', N'Cô Tô - Vàn Chảy - Hồng Vàn', N'bai-bien-hong-van-1617962594.jpg', NULL, 2, NULL, 2690000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (9, N'Tour Ngũ Hành Sơn Hội An 1 ngày khởi hành Tết Âm Lịch', NULL, NULL, NULL, 1, N'Ôtô', N'Ngũ Hành Sơn - Hội An', N'hoi-an2-1559794717.jpg', NULL, 5, NULL, 440000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (10, N'Tour Đà Nẵng Bà Nà 1 ngày ăn trưa Buffet tham quan Cầu Vàng', NULL, NULL, NULL, 1, N'Ôtô-Cáp treo', N'Bà Nà-Đà Nẵng', N'Capture.png', NULL, 3, 1249000, 999000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (11, N'Tour Bà Nà Hills - Thiền Viện Trúc Lâm Bạch Mã', NULL, NULL, NULL, 2, N'Ô tô', N'Bà Nà Hills', N'ba-na-3-1559791515.jpg', NULL, 3, NULL, 2040000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (12, N'TOUR BÀ NÀ - SUỐI KHOÁNG NÓNG NÚI THẦN TÀI', NULL, NULL, NULL, 1, N'ô tô, cáp treo', N'BÀ NÀ HILLS - NÚI THẦN TÀI', N'nui-than-tfai-2-1559786329.jpg', NULL, 3, NULL, 1600000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (13, N'TOUR TAM ĐẢO 1 NGÀY', NULL, NULL, NULL, 1, N'Ô tô', N'Tam Đảo', N'da-nang-1560235659.jpg', NULL, 2, NULL, 750000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (14, N'Tour du lịch Quan Lạn 2 ngày 1 đêm | Khám phá miền biển vắng', NULL, NULL, NULL, 2, N'Ô tô - Tàu thủy', N'Hà Nội - Quan Lạng', N'tour-du-lich-quan-lan-2-ngay-1-dem-3-300x194.jpg', NULL, 2, 3098000, 1859000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (15, N'Tour du lịch Đà Lạt Nha Trang 5 ngày 4 đêm từ Hà Nội | Cao nguyên đại ngàn & Biển xanh vẫy gọi', NULL, NULL, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 2, N'Ô tô', N'Hà Nội - Đà Lạt', N'HA-NOI-DA-LAT-NHA-TRANG-5-NGAY-4-DEM-1-300x194.jpg', NULL, 2, 9570000, 6699000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (16, N'Tour du lịch Hà Nội Sapa 4 ngày 3 đêm | Hàm Rồng – Cát Cát – Fansipan – Y Tý – Lũng Pô', NULL, NULL, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 4, NULL, NULL, N'tour-du-lich-ha-noi-sapa-4-ngay-3-dem-300x194.jpg', NULL, 2, 5800000, 4099000)
INSERT [dbo].[Tour] ([TourCode], [Name], [Detail], [Slot], [DeptTime], [Day], [Vehicle], [Destination], [Image1], [Image2], [TourCategoryCode], [oldPrice], [newPrice]) VALUES (17, N'Tour Hà Nội Cửa Lò 4 ngày 3 đêm thăm quê hương Bác Hồ', NULL, NULL, CAST(N'2022-01-01 00:00:00.000' AS DateTime), 3, N'Ô tô', N'Hà Nội', N'tour-ha-noi-cua-lo-4-ngay-3-dem-1-300x194.jpg', NULL, 2, 3099000, 2799000)





CREATE TABLE dbo.Booking
(
  BookingCode       int NOT NULL PRIMARY KEY identity(1,1),
  TourCode          int    NOT NULL,
  CustomerName      NVARCHAR(MAX),
  CustomerMail      NCHAR(50),
  [CustomerPhone#]  NCHAR(15),
  CustomerAddress   NVARCHAR(MAX),
  Note              NVARCHAR(MAX),
  DeptTime                datetime,
  StartDepart		NVARCHAR(MAX),
  Payment			NVARCHAR(MAX),
  TotalPrice		int,
  TotalPeople		int,
  BookedByMemberID  int
  CONSTRAINT FK_Booking_Member FOREIGN KEY (BookedByMemberID) REFERENCES Member(ID),
  CONSTRAINT FK_Booking_Tour FOREIGN KEY (TourCode) REFERENCES Tour(TourCode)
)







CREATE TABLE dbo.GuideTour
(
  EmployeeID int NOT NULL CONSTRAINT FK_GuideTour_Employee REFERENCES Employee,
  TourCode   int    NOT NULL,
  CONSTRAINT PK_GuideTour PRIMARY KEY (EmployeeID, TourCode),
  CONSTRAINT FK_GuideTour_Tour FOREIGN KEY (TourCode) REFERENCES Tour
)














CREATE TABLE dbo.Passenger
(
  PassID                 int NOT NULL PRIMARY KEY identity(1,1),
  BookingCode        int CONSTRAINT FK_Passenger_Booking REFERENCES Booking,
  Name               NVARCHAR(MAX),
  DayOfBirth         DATE,
  Gender             CHAR,
  [Passport#]        DECIMAL(18),
  AgeType    NCHAR(50),
  Image1 NVARCHAR(MAX),

)












create table TinTuc
(ID int primary key,
tieuDe nvarchar(max),
moTa nvarchar(max),
noiDung nvarchar(max),
anh1 nvarchar(50),
anh2 nvarchar(50),
ngayDang datetime,
)




INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (1, N'Gợi ý những địa điểm du lịch biển gần Hà Nội thích hợp đi vào cuối tuần', N'Nếu nói đến những điểm du lịch cách Hà Nội khoảng 200 km thì có khá nhiều bãi biển khá đẹp và chất, là lựa chọn lý tưởng dành cho du khách vào những ngày cuối tuần, dịp nghỉ lễ. Đến với những thiên đường biển gần Hà Nội, du khách không chỉ được tận hưởng không khí trong lành, đắm mình trong làn ...', NULL, N'du-lich-ha-noi-16-8-2017-di-bien-300x194.jpg', NULL, CAST(N'2022-01-01 00:00:00.000' AS DateTime))
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (2, N'Gần ngay Hà Nội có một ngọn đồi Bắc Âu đẹp rụng tim, bạn đã biết chưa?', N'Tuổi trẻ ấy mà, có được bao lâu đâu, cứ tranh thủ lúc chân còn khỏe, máu còn nóng thì hãy tranh thủ đi ngay mà check-in địa điểm đẹp tuyệt vời đang làm mưa làm gió này đi, chẳng đâu xa đâu, chỉ gần ngay Hà Nội thôi nhé. Mang trong mình một vẻ đẹp tựa trời Âu, địa điểm đèo Đá Trắng xuất hiện ...', N'', N'du-lich-hoa-binh-30-11-2017-2-300x200.jpg', N'', CAST(N'1900-01-01 00:00:00.000' AS DateTime))
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (3, N'Kinh nghiệm lựa chọn phương tiện để đi tham quan Hà Nội', N'Hà Nội thủ đô ngàn năm văn hiến luôn là điểm đến cuốn hút du khách bởi nét cổ kính, yên bình lạ kỳ. Một chuyến du lịch đi tham quan quanh Hà Nội sẽ để lại trong lòng du khách những kỷ niệm khó quên về 36 khu phố nghề cổ kính của Hà Nội xưa. Thế nhưng để chuẩn bị cho chuyến du lịch đến với du ...', NULL, N'du-lich-ha-noi-19-8-2017-phuong-tien-4-300x194.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (4, N'Những món quà tạo nên đặc trưng cho du lịch Hội An', N'Du lịch Hội An là điểm đến nổi tiếng thu hút hàng ngàn khách du lịch trong và ngoài nước mỗi năm. Nhiều du khách đã lựa chọn Hội An là điểm đến thú vị cho chuyến du lịch dài ngày của mình nhưng lại chẳng có nhiều kinh nghiệm và hiểu biết về những loại đặc sản của địa danh này. Vậy nên, bài viết ...', NULL, N'du-lich-hoi-an-23-10-2017-4-300x194.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (5, N'2 địa chỉ du lịch gần Hà Nội thích hợp cho kỳ nghỉ dưỡng trong 3 ngày', N'Hà Nội là một thành phố cổ kính và bình yên. Khi đến với du lịch Hà Nội ngoài những điểm du lịch tham quan ở trung tâm Hà Nội như :Lăng Bác, Hồ Hoàn Kiếm, Văn Miếu Quốc Tử Giám, cầu Long Biên thì du khách cũng có thể kết hợp tham quan thêm các địa điểm du lịch nổi tiếng nằm gần Hà Nội được ...', NULL, N'du-lich-ha-noi-18-8-2017-cua-lo-2-300x194.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (6, N'Tết Dương Lịch 2022 | Du xuân ngập tràn ưu đãi cùng Vietnam Booking!', N'Người Việt gọi Tết Dương Lịch để phân biệt với Tết Nguyên Đán (Tết cổ truyền của dân tộc). Tết Dương Lịch là ngày 01/01 và cũng là ngày đầu tiên của năm mới, trong ngày này, người dân Việt Nam hòa ...', NULL, N'tet-duong-lich-09042020-2-300x200.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (7, N'Những món quà nên mua khi đi du lịch Hà Nội', N'Như một nét đặc trưng, khi nói đến Hà Nội là không thể không nhắc đến nền ẩm thực Hà Nội. Ẩm thực Hà Nội là một phần không thể thiếu trong văn hóa của người dân nơi đây. Nếu du khách là người muốn tìm hiểu về Hà Nội nói chung hay thấm nhuần những giá trị văn hóa Hà Nội nói riêng thì phải trải ...', NULL, N'du-lich-ha-noi-18-8-2017-qua-2-300x194.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (8, N'Những điều tạo nên vẻ đẹp của Hà Nội trong mắt du khách nước ngoài', N'Thủ đô Hà Nội, địa điểm du lịch có những điểm khác biệt rõ nét không lẫn với bất cứ đô thị nào trong cả nước và cả khu vực châu Á. Chính những điều khác biệt ấy đã làm nên một Hà Nội đặc trưng, biến du lịch Hà Nội trở thành một điểm đến đáng mơ ước của nhiều du khách trong và ngoài nước.', NULL, N'du-lich-ha-noi-23-8-2017-300x194.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (9, N'Đi chơi 1 mình thì nên đi đâu ở Hà Nội thích hợp nhất?', N'Đã bao giờ giữa những vội vã của Hà Nội, bạn muốn một mình tìm những giây phút bình yên và thư thái trong tâm hồn? Nếu bạn đang tự hỏi đi chơi 1 mình thì nên đi đâu ở Hà Nội ...', NULL, N'di-choi-1-minh-thi-nen-di-dau.jpg', NULL, NULL)
INSERT [dbo].[TinTuc] ([ID], [tieuDe], [moTa], [noiDung], [anh1], [anh2], [ngayDang]) VALUES (10, N'Tết ở Hà Nội đi đâu chơi ? Các địa điểm du lịch Nguyên Đán đầu năm 2021 HOT nhất', N'Tết ở Hà Nội đi chơi đâu? Là câu hỏi được nhiều du khách ở thủ đô phân vân khi Tết Nguyên Đán 2021 sắp đến gần. Tết năm nay với hơn 7 ngày nghỉ, Vietnam Booking gợi ý cho bạn những địa điểm du lịch đầu năm ở Hà Nội hấp dẫn nhất từ nội thành đến ngoại thành và khu vực gần Hà Nội.', NULL, N'Du-lich-Ha-Noi-Ngay-tet-300x173.jpg', NULL, NULL)








select * from Booking
select * from Passenger
select * from Employee
select * from Tour
select * from GuideTour
select * from Department
select * from Member
select * from TourCategory
select * from Account
select * from TinTuc



delete from Booking
delete from Passenger
delete from Comment
delete from Employee
delete from Tour
delete from GuideTour
delete from TourDay
delete from TypeOfPassenger
delete from Price
delete from Department
delete from [Like]

delete from dbo.TourCategory

