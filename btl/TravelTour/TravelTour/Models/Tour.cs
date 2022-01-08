namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Tour")]
    public partial class Tour
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tour()
        {
            Bookings = new HashSet<Booking>();
            Employees = new HashSet<Employee>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DisplayName("Mã Tour")]
        [Required(ErrorMessage = "Mã sản phẩm không được để trống")]
        public int TourCode { get; set; }

        [DisplayName("Tên Tour")]
        [Required(ErrorMessage = "Mã sản phẩm không được để trống")]
        public string Name { get; set; }

        [DisplayName("Chi Tiết")]
        public string Detail { get; set; }

        [DisplayName("Chỗ")]
        public int? Slot { get; set; }

        [DisplayName("Thời Gian")]
        public DateTime? DeptTime { get; set; }

        [DisplayName("Ngày")]
        public int? Day { get; set; }


        [StringLength(100)]
        [DisplayName("Phương Tiện")]
        public string Vehicle { get; set; }

        [StringLength(100)]
        [DisplayName("Điểm Đến")]
        public string Destination { get; set; }

        [StringLength(100)]
        [DisplayName("Ảnh 1")]
        public string Image1 { get; set; }

        [StringLength(100)]
        [DisplayName("Ảnh 2")]
        public string Image2 { get; set; }

        [DisplayName("Loại Tour")]
        public int? TourCategoryCode { get; set; }

        [DisplayName("Giá Cũ")]
        public int? oldPrice { get; set; }

        [DisplayName("Giá Mới")]
        public int? newPrice { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Booking> Bookings { get; set; }

        public virtual TourCategory TourCategory { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
