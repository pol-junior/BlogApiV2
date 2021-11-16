using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParagraphController : Controller
    {
        private readonly BlogContext blogContext;

        public ParagraphController(BlogContext blogContext)
        {
            this.blogContext = blogContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Paragraph>> Get() => blogContext.Paragraphs.ToList();

        [HttpPost]
        public async Task<ActionResult<Paragraph>> Post(Paragraph paragraph)
        {

            if (paragraph!=null)
            {
                var res = await blogContext.Paragraphs.AddAsync(paragraph);
                await blogContext.SaveChangesAsync();
                return Ok(res.Entity);
            }
                
            return BadRequest();
        }


    }
}
