namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Passenger")]
    public partial class Passenger
    {
        [Key]
        public int PassID { get; set; }

        public int? BookingCode { get; set; }

        public string Name { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DayOfBirth { get; set; }

        [StringLength(1)]
        public string Gender { get; set; }

        [Column("Passport#")]
        public decimal? Passport_ { get; set; }

        [StringLength(50)]
        public string AgeType { get; set; }

        public string Image1 { get; set; }

        public virtual Booking Booking { get; set; }
    }
}
