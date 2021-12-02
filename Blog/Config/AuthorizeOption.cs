using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Config
{
    public class AuthorizeOption
    {
        public const string ISSUER = "BlogApiAuthorize";
        public const string AUDIENCE = "MeDear";
        const string KEY = "IamBOSSOFTheGymleatherMan";
        public const int LIFETIME = 120;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
        }
    }
}
