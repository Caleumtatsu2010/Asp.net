namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ThueXe")]
    public partial class ThueXe
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [StringLength(50)]
        public string Anh { get; set; }

        [StringLength(200)]
        public string HangXe { get; set; }

        public int? socho { get; set; }

        public string ThongTin { get; set; }
    }
}
