namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KhoHang")]
    public partial class KhoHang
    {
        [Key]
        [StringLength(50)]
        [DisplayName("Mã sản phẩm")]
        public string maSanPham { get; set; }

        [DisplayName("Số lượng tồn")]
        public int? soLuongTon { get; set; }

        [StringLength(1000)]
        [DisplayName("Ghi chú")]
        public string ghiChu { get; set; }

        public virtual SanPham SanPham { get; set; }
    }
}
