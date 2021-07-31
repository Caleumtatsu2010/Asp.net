namespace WebApplication9.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Nha_CC
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Nha_CC()
        {
            Hangs = new HashSet<Hang>();
        }

        [Key]
        [StringLength(10)]
        [Required(ErrorMessage = "Mã nhà cung cấp không được để trống")]
        public string MaNCC { get; set; }


        [StringLength(50)]
        [Required(ErrorMessage = "Tên nhà cung cấp không được để trống")]

        public string TenNCC { get; set; }

        [StringLength(50)]
        [DisplayName("Địa Chỉ")]
        public string DiaChi { get; set; }

        [StringLength(15)]
        [DisplayName("Điện Thoại")]

        public string DienThoai { get; set; }

        [StringLength(50)]
        [DisplayName("Email")]

        public string Email { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Hang> Hangs { get; set; }
    }
}
