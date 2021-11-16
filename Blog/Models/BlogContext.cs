using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class BlogContext : IdentityDbContext
    {
        public BlogContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Article> Articles { set; get; }

        public virtual DbSet<Paragraph> Paragraphs { get; set; }

    }
}
