namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Member")]
    public partial class Member
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Member()
        {
            Bookings = new HashSet<Booking>();
        }

        [DisplayName("Mã")]
        public int ID { get; set; }

        [StringLength(50)]
        [DisplayName("Tên")]
        public string Username { get; set; }

        [StringLength(50)]
        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Tên")]
        public string Name { get; set; }

        [StringLength(1)]
        [DisplayName("Giới Tính")]
        public string Gender { get; set; }

        [Column(TypeName = "date")]
        [DisplayName("Ngày Sinh")]
        public DateTime? DayOfBirth { get; set; }

        [DisplayName("Địa CHỉ")]
        public string Address { get; set; }

        [StringLength(15)]
        [DisplayName("SDT")]
        public string Phone { get; set; }

        [DisplayName("Ảnh 1")]
        public string Image1 { get; set; }

        public virtual Account Account { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
