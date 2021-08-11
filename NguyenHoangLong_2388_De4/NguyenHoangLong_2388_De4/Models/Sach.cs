namespace NguyenHoangLong_2388_De4.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sach")]
    public partial class Sach
    {
        [Key]
        [StringLength(10)]

        [DisplayName("Mã Sách")]
        [Required(ErrorMessage = "Mã sách không được để trống")]
        public string Masach { get; set; }

        [DisplayName("Tên Sách")]
        [Required(ErrorMessage = "Tên sách không được để trống")]
        [StringLength(50)]
        public string Tensach { get; set; }

        [DisplayName("Tác Giả")]
        [Required(ErrorMessage = "Tác giả không được để trống")]
        [StringLength(50)]
        public string Tacgia { get; set; }

        [DisplayName("Giá")]
        [Required(ErrorMessage = "Giá không được để trống")]
        public int? Gia { get; set; }
    }
}
