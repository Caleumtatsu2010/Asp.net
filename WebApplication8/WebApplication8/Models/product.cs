namespace WebApplication8.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DisplayName("Mã Rượu")]
        
        public int ProductID { get; set; }


        [StringLength(50)]
        [DisplayName("Tên Rượu")]
        [Required(ErrorMessage = "Tên Rượu không được để trống")]

        public string ProductName { get; set; }

        [Column(TypeName = "text")]
        [DisplayName("Mô Tả")]
        public string Description { get; set; }

        [Column(TypeName = "numeric")]
        [DisplayName("Giá Nhập")]

        public decimal PurchasePrice { get; set; }

        [Column(TypeName = "numeric")]
        [DisplayName("Giá Bán")]

        public decimal Price { get; set; }
        [DisplayName("Số Lượng")]

        public int Quantity { get; set; }

        [StringLength(20)]
        [DisplayName("Năm Sản XUất")]

        public string Vintage { get; set; }


        [StringLength(10)]
        [Required(ErrorMessage = "Mã danh mục không được để trống")]
        public string CatalogyID { get; set; }

        [Column(TypeName = "text")]
        public string Image { get; set; }


        [StringLength(100)]
        [DisplayName("Vùng")]
        [Required(ErrorMessage = "Vùng không được để trống")]

        public string Region { get; set; }

        public virtual Catalogy Catalogy { get; set; }
    }
}
