using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : Controller
    {
        private readonly BlogContext blogContext;

        public ArticleController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> Get() => await blogContext.Articles.Include(x => x.Paragraphs).ToListAsync();


        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> Get(int id)
        {
            var res = await blogContext.Articles.Include(x=>x.Paragraphs).FirstOrDefaultAsync(x => x.Id == id);
            
            if (res!=null)
            {
                return Ok(res);
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<ActionResult<Article>> Post (Article article)
        {
            if (article!=null)
            {
                var res =  await blogContext.Articles.AddAsync(article);
                await blogContext.SaveChangesAsync();
                return Ok(res.Entity);
            }

            return NotFound();
        }


        [HttpPut]
        public async Task<ActionResult<Article>> Put(Article article)
        {
            var art = await blogContext.Articles.FindAsync(article.Id);
            if (art!=null)  
            {
                var res = blogContext.Articles.Update(article).Entity;
                await blogContext.SaveChangesAsync();
                return Ok(res);
            }
            return NotFound();
        }
        

    }
}
