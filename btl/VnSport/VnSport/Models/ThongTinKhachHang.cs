namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ThongTinKhachHang")]
    public partial class ThongTinKhachHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ThongTinKhachHang()
        {
            HoaDons = new HashSet<HoaDon>();
            PhanHois = new HashSet<PhanHoi>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Mã Khách Hàng")]
        public int maKhachHang { get; set; }

        [StringLength(50)]
        [DisplayName("Tên Đăng Nhập")]
        public string tenDangNhap { get; set; }

        [StringLength(40)]
        [DisplayName("Họ Tên")]
        public string hoTen { get; set; }

        [Required]
        [StringLength(10)]
        [DisplayName("SDT")]
        public string sdt { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Tỉnh")]
        public string tinh { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Huyện")]
        public string huyen { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Xã")]
        public string xa { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Địa Chỉ")]
        public string diaChi { get; set; }

        [StringLength(100)]
        [DisplayName("Ghi Chú")]
        public string ghiChu { get; set; }

        [StringLength(100)]
        [DisplayName("Hình Ảnh")]
        public string hinhAnh { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HoaDon> HoaDons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PhanHoi> PhanHois { get; set; }

        public virtual TaiKhoan TaiKhoan { get; set; }
    }
}
