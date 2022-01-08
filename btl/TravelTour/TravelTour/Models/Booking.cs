namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Booking")]
    public partial class Booking
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Booking()
        {
            Passengers = new HashSet<Passenger>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Mã Booking")]
        public int BookingCode { get; set; }

        [DisplayName("Mã Tour")]
        public int TourCode { get; set; }

        [DisplayName("Tên Khách Hàng")]
        public string CustomerName { get; set; }

        [StringLength(50)]
        [DisplayName("Email")]
        public string CustomerMail { get; set; }

        [Column("CustomerPhone#")]
        [StringLength(15)]
        [DisplayName("SDT")]
        public string CustomerPhone_ { get; set; }

        [DisplayName("Địa Chỉ")]
        public string CustomerAddress { get; set; }

        [DisplayName("Ghi Chú")]
        public string Note { get; set; }

        [DisplayName("Thời Gian")]
        public DateTime? DeptTime { get; set; }

        [DisplayName("Điểm Đón")]
        public string StartDepart { get; set; }

        [DisplayName("Hình Thức")]
        public string Payment { get; set; }

        [DisplayName("Tổng Giá")]
        public int? TotalPrice { get; set; }

        [DisplayName("Tổng Người")]
        public int? TotalPeople { get; set; }

        [DisplayName("Mã Thành Viên")]
        public int? BookedByMemberID { get; set; }

        public virtual Member Member { get; set; }

        public virtual Tour Tour { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Passenger> Passengers { get; set; }
    }
}
