namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TaiKhoan")]
    public partial class TaiKhoan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TaiKhoan()
        {
            ThongTinKhachHangs = new HashSet<ThongTinKhachHang>();
        }

        [Key]
        [StringLength(50)]
        [DisplayName("Tên đăng nhập")]
        public string tenDangNhap { get; set; }

        [Required]
        [StringLength(30)]
        [DisplayName("Mật khẩu")]
        public string matKhau { get; set; }

        [Required]
        [StringLength(20)]
        [DisplayName("Loại")]
        public string loai { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ThongTinKhachHang> ThongTinKhachHangs { get; set; }
    }
}
