using Blog.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : Controller
    {
        private readonly BlogContext blogContext;
        private readonly UserManager<User> userManager;

        public ArticleController(BlogContext blogContext, UserManager<User> userManager)
        {
            this.blogContext = blogContext;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> Get() => await blogContext.Articles.Include(x => x.Paragraphs).ToListAsync();


        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> Get(int id)
        {
            var res = await blogContext.Articles.Include(x=>x.Paragraphs).FirstOrDefaultAsync(x => x.Id == id);
            return res == null ? NotFound() : Ok(res);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult<Article>> Post (Article article)
        {
            if (article!=null)
            {
                var res = await blogContext.Articles.AddAsync(article);
                await blogContext.SaveChangesAsync();
                return Ok(res.Entity);
            }

            return NotFound();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<ActionResult<Article>> Put(Article article)
        {
            var art = await blogContext.Articles.FindAsync(article.Id);
            if (art!=null)  
            {
                art.ImageUrl = article.ImageUrl;
                art.Title = article.Title;
                art.Views = article.Views;
                art.Paragraphs = article.Paragraphs;
                art.Id = article.Id;
                art.UserId = article.UserId;
                art.CategoryName = article.CategoryName;
                art.Date = article.Date;
                var res = blogContext.Articles.Update(art).Entity;
                await blogContext.SaveChangesAsync();
                return Ok(res);
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> Delete(string id)
        {
            var article = await blogContext.Articles.FindAsync(id);
            if (article!=null)
            {
                blogContext.Articles.Remove(article);
                await blogContext.SaveChangesAsync();
                return Ok(article);
            }
            return NotFound();
        }
        

    }
}
