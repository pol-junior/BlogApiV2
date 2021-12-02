using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly BlogContext blogContext;

        public UserController(UserManager<User> userManager, BlogContext blogContext)
        {
            this.userManager = userManager;
            this.blogContext = blogContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get() => await userManager.Users.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await blogContext.Users.Include("UserArticles").FirstOrDefaultAsync(x => x.Id == id);
            user.UserArticles.ToList().ForEach(x =>{ x.UserId = ""; x.User = null; });
            if (user!=null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post(UserApiModel userModel)
        {
            
            if (userModel != null)
            {
                var res = await userManager.CreateAsync(userModel.User, userModel.Password);

                if (res.Succeeded)
                {
                    return Ok(await userManager.FindByNameAsync(userModel.User.UserName));
                }

                return BadRequest(res.Errors);
            }
            return NotFound();
        }

        [HttpPut] 
        public async Task<ActionResult<User>> Put(User user)
        {
            if (user!=null)
            {
                var modelUer = await blogContext.Users.FindAsync(user.Id);
                if (modelUer!=null)
                {
                    modelUer.UserName = user.UserName;
                    modelUer.PasswordHash = user.PasswordHash;
                    modelUer.Email = user.Email;
                    modelUer.ImageUrl = user.ImageUrl;
                    modelUer.FollowedUsers = user.FollowedUsers;
                    blogContext.Users.Update(modelUer);
                    await blogContext.SaveChangesAsync();

                    return Ok(user);
                }
            }
            return NotFound();
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(string id)
        {
            if (id!=null)
            {
                var user = await userManager.FindByIdAsync(id);
                var res = await userManager.DeleteAsync(user);
                if (res.Succeeded)
                {
                    return Ok(user);
                }

                return NotFound(res.Errors);
            }
            return NotFound();
        }

    }
}
