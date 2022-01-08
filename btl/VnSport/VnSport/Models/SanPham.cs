namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SanPham")]
    public partial class SanPham
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SanPham()
        {
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        [Key]
        [StringLength(50)]
        [DisplayName("Mã sản phẩm")]
        public string maSanPham { get; set; }

        [StringLength(100)]
        [DisplayName("Tên sản phẩm")]
        public string tenSanPham { get; set; }

        [StringLength(50)]
        [DisplayName("Màu")]
        public string mau { get; set; }

        [StringLength(200)]
        [DisplayName("Kích thước")]
        public string kichThuoc { get; set; }

        [StringLength(100)]
        [DisplayName("Chất liệu")]
        public string chatLieu { get; set; }

        [StringLength(50)]
        [DisplayName("Thương hiệu")]
        public string thuongHieu { get; set; }

        [DisplayName("Giới thiệu")]
        public string gioiThieu { get; set; }

        [DisplayName("Mô tả")]
        public string moTa { get; set; }

        [DisplayName("Giá cũ")]
        public int? giaCu { get; set; }

        [DisplayName("Giá mới")]
        public int? giaMoi { get; set; }

        [DisplayName("Ảnh 1")]
        [StringLength(100)]
        public string anh1 { get; set; }

        [DisplayName("Ảnh 2")]
        [StringLength(100)]
        public string anh2 { get; set; }

        [DisplayName("Ảnh 3")]
        [StringLength(100)]
        public string anh3 { get; set; }

        [DisplayName("Mã loại")]
        public int? maLoai { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }

        public virtual KhoHang KhoHang { get; set; }

        public virtual LoaiSanPham LoaiSanPham { get; set; }
    }
}
