namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Account()
        {
            Members = new HashSet<Member>();
        }

        [Key]
        [StringLength(50)]
        [DisplayName("Tên Đăng Nhập")]
        public string Username { get; set; }

        [StringLength(50)]
        [DisplayName("Mật Khẩu")]
        public string Password { get; set; }

        [StringLength(50)]
        [DisplayName("Quyền Hạn")]
        public string Roles { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Member> Members { get; set; }
    }
}
