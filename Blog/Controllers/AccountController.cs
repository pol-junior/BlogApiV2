using Blog.Config;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [HttpPost]
        public IActionResult Post(UserApiModel user)
        {
            var identity = GetIdentity(user.User.Email, user.Password).Result;


            if (identity == null)
            {
                return BadRequest(new { error = "Invalid login and/or password" });
            }

            var jwt = new JwtSecurityToken(
                issuer: AuthorizeOption.ISSUER,
                audience: AuthorizeOption.AUDIENCE,
                claims: identity.Claims,
                expires: DateTime.Now.AddMinutes(AuthorizeOption.LIFETIME),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(AuthorizeOption.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return Ok(new
            {
                access_token = encodedJwt
            });
        }

        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var res = await signInManager.CheckPasswordSignInAsync(user, password, false);
                if (res.Succeeded)
                {
                    
                    var userRole = await userManager.GetRolesAsync(user);
                    
                    var claims = new List<Claim>
                    {
                      new Claim("userNameClaim", user.UserName),
                      new Claim("userRoleClaim", Newtonsoft.Json.JsonConvert.SerializeObject(userRole)),
                      new Claim("userIdClaim",user.Id)
                    }; 

                    ClaimsIdentity claimsIdentity =
                        new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                    return claimsIdentity;
                }
            }

            return null;
        }
    }
}
