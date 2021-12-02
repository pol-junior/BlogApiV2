using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Controllers
{

    public class SignInModel
    {
        public string UserName { get; set; }
        public string Password { set; get; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;

        public SignInController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post (SignInModel signInModel)
        {
            if (signInModel!=null)
            {
                var user = await userManager.FindByNameAsync(signInModel.UserName);
                if (user!=null)
                {
                    var res = await signInManager.CheckPasswordSignInAsync(user, signInModel.Password, false);
                    if (res.Succeeded)
                    {
                        return Ok(user);
                    }
                }
            }

            return NotFound();
        }
    }
}
