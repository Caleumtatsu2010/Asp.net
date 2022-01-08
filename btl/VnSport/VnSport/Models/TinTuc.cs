namespace VnSport.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TinTuc")]
    public partial class TinTuc
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DisplayName("Mã Tin Tức")]
        public int maTinTuc { get; set; }

        [Required]
        [DisplayName("Tiêu Đề")]
        public string tieuDe { get; set; }

        [DisplayName("Nội Dung")]
        public string noiDung { get; set; }

        [StringLength(50)]
        [DisplayName("Ảnh 1")]
        public string anh1 { get; set; }

        [StringLength(50)]
        [DisplayName("Ảnh 1")]
        public string anh2 { get; set; }

        [StringLength(50)]
        [DisplayName("Ảnh 1")]
        public string anh3 { get; set; }

        [DisplayName("Ngày Đăng")]
        public DateTime? ngayDang { get; set; }
    }
}
