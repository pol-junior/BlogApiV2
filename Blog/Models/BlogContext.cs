using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class BlogContext : IdentityDbContext<User>
    {
        public BlogContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //    modelBuilder.Entity<User>()
        //    .HasKey("UserId");
        //    modelBuilder.Entity<User>()
        //            .HasMany(c => c.FollowedUsers)
        //            .WithMany(s => s.FollowedUsers)
        //            .UsingEntity(j => j.ToTable("FollowinUsers"));
        //}


        public virtual DbSet<Article> Articles { set; get; }

        public virtual DbSet<Paragraph> Paragraphs { get; set; }



    }
}
