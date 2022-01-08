namespace TravelTour.Models
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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [DisplayName("Tiêu Đề")]
        [Required(ErrorMessage = "Tiêu đề không được để trống")]
        public string tieuDe { get; set; }

        [DisplayName("Mô Tả")]
        public string moTa { get; set; }

        [DisplayName("Nội Dung")]
        public string noiDung { get; set; }


        [StringLength(50)]
        [DisplayName("Ảnh 1")]
        public string anh1 { get; set; }

        [StringLength(50)]
        [DisplayName("Ảnh 2")]
        public string anh2 { get; set; }

        [DisplayName("Ngày Đăng")]
        public DateTime? ngayDang { get; set; }
    }
}
