namespace WebApplication10.Models
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
        public int ProductID { get; set; }

        [Required(ErrorMessage ="Tên rượu không được để trống")]
        [StringLength(50)]
        [DisplayName("Tên rượu")]
        public string ProductName { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [Column(TypeName = "numeric")]
        [Required(ErrorMessage = "Giá nhập không được để trống")]

        public decimal PurchasePrice { get; set; }

        [Column(TypeName = "numeric")]
        [DisplayName("Giá Bán")]
        [Required(ErrorMessage = "Giá bán không được để trống")]

        public decimal Price { get; set; }


        [Required(ErrorMessage = "Số lượng không được để trống")]
        public int Quantity { get; set; }

        [StringLength(20)]
        [Required(ErrorMessage = "Năm sản xuất không được để trống")]
        [DisplayName("Năm sản xuất")]
        public string Vintage { get; set; }


        [StringLength(10)]
        public string CatalogyID { get; set; }

        [Column(TypeName = "text")]
        public string Image { get; set; }


        [StringLength(100)]
        [Required(ErrorMessage = "Vùng không được để trống")]
        [DisplayName("Vùng")]
        public string Region { get; set; }

        public virtual Catalogy Catalogy { get; set; }
    }
}
