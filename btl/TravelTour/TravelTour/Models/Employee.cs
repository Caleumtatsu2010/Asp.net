namespace TravelTour.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Employee")]
    public partial class Employee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Employee()
        {
            Tours = new HashSet<Tour>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DisplayName("Mã Nhân Viên")]
        public int ID { get; set; }

        [DisplayName("Tên Nhân Viên")]
        public string Name { get; set; }

        [DisplayName("Địa Chỉ")]
        public string Address { get; set; }

        [Column("Phone#")]
        [StringLength(15)]
        [DisplayName("Điện Thoại")]
        public string Phone_ { get; set; }

        [DisplayName("Ảnh 1")]
        public string Image1 { get; set; }

        [DisplayName("Mã Khoa")]
        public int? DepartmentID { get; set; }

        public virtual Department Department { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tour> Tours { get; set; }
    }
}
