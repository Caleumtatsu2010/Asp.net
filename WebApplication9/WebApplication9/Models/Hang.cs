namespace WebApplication9.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Hang")]
    public partial class Hang
    {
        [Key]
        [StringLength(10)]
        [Required(ErrorMessage = "Mã hàng không được để trống")]
        public string MaHang { get; set; }

        [Required]
        [StringLength(10)]
        public string MaNCC { get; set; }

        [Required(ErrorMessage = "Tên hàng không được để trống")]
        [DisplayName("Tên Hàng")]
        [StringLength(255)]
        public string TenHang { get; set; }
        [DisplayName("Giá")]
        public decimal? Gia { get; set; }
        [DisplayName("Lượng Có")]
        public decimal LuongCo { get; set; }

        [StringLength(1000)]
        [DisplayName("Mô Tả")]
        public string MoTa { get; set; }
        [DisplayName("Chiết Khấu")]
        public decimal? ChietKhau { get; set; }

        [StringLength(100)]
        [DisplayName("Hình Ảnh")]
        public string HinhAnh { get; set; }

        public virtual Nha_CC Nha_CC { get; set; }
    }
}
