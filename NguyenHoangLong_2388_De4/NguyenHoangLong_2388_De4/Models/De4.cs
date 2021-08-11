namespace NguyenHoangLong_2388_De4.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class De4 : DbContext
    {
        public De4()
            : base("name=De4")
        {
        }

        public virtual DbSet<Sach> Saches { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sach>()
                .Property(e => e.Masach)
                .IsFixedLength();
        }
    }
}
