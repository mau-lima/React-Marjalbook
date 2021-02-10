using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccesor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccesor;
        public UserAccesor(IHttpContextAccessor httpContextAccesor)
        {
            this._httpContextAccesor = httpContextAccesor;

        }

        public string GetCurrentUsername()
        {
            var username = _httpContextAccesor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            
            return username;
        }
    }
}