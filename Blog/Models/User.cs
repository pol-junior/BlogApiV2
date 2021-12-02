using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class User : IdentityUser
    {
       
        public string ImageUrl { set; get; }
        public ICollection<Article> UserArticles { set; get; }

        public ICollection<User> FollowedUsers { set; get; }


    }
}
