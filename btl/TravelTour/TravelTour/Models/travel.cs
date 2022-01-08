namespace TravelTour.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class travel : DbContext
    {
        public travel()
            : base("name=travel")
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<Passenger> Passengers { get; set; }
        public virtual DbSet<ThueXe> ThueXes { get; set; }
        public virtual DbSet<TinTuc> TinTucs { get; set; }
        public virtual DbSet<Tour> Tours { get; set; }
        public virtual DbSet<TourCategory> TourCategories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .Property(e => e.CustomerMail)
                .IsFixedLength();

            modelBuilder.Entity<Booking>()
                .Property(e => e.CustomerPhone_)
                .IsFixedLength();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Phone_)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .HasMany(e => e.Tours)
                .WithMany(e => e.Employees)
                .Map(m => m.ToTable("GuideTour").MapLeftKey("EmployeeID").MapRightKey("TourCode"));

            modelBuilder.Entity<Member>()
                .Property(e => e.Email)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Member>()
                .Property(e => e.Gender)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Member>()
                .Property(e => e.Phone)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Member>()
                .HasMany(e => e.Bookings)
                .WithOptional(e => e.Member)
                .HasForeignKey(e => e.BookedByMemberID);

            modelBuilder.Entity<Passenger>()
                .Property(e => e.Gender)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Passenger>()
                .Property(e => e.Passport_)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Passenger>()
                .Property(e => e.AgeType)
                .IsFixedLength();

            modelBuilder.Entity<Tour>()
                .HasMany(e => e.Bookings)
                .WithRequired(e => e.Tour)
                .WillCascadeOnDelete(false);
        }
    }
}
