namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ChiTietHoaDon")]
    public partial class ChiTietHoaDon
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Mã Chi Tiết")]
        public int maChiTietHoaDon { get; set; }

        [StringLength(50)]
        [DisplayName("Mã Sản Phẩm")]
        public string maSanPham { get; set; }

        [DisplayName("Số Lượng")]
        public int? soLuong { get; set; }

        [DisplayName("Đơn Giá")]
        public int? donGia { get; set; }

        [DisplayName("Mã Hóa Đơn")]
        public int? maHoaDon { get; set; }

        public virtual SanPham SanPham { get; set; }

        public virtual HoaDon HoaDon { get; set; }
    }
}
