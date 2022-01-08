namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HoaDon")]
    public partial class HoaDon
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HoaDon()
        {
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("MÃ Hóa Đơn")]
        public int maHoaDon { get; set; }

        [DisplayName("Mã Khách Hàng")]
        public int? maKhachHang { get; set; }

        [DisplayName("Ngày Bán")]
        public DateTime? ngayBan { get; set; }

        [DisplayName("Tổng Số Lượng")]
        public int? tongSoLuong { get; set; }

        [DisplayName("Giảm Giá")]
        public int? giamGia { get; set; }

        [DisplayName("Thành Tiền")]
        public int? thanhTien { get; set; }

        [StringLength(100)]
        [DisplayName("Hình Thức")]
        public string hinhThucThanhToan { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }

        public virtual ThongTinKhachHang ThongTinKhachHang { get; set; }
    }
}
