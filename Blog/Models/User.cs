using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class User : IdentityUser
    {
        public string ImageUrl { set; get; }
        public virtual IEnumerable<Article> UserArticles { set; get; }

    }
}
