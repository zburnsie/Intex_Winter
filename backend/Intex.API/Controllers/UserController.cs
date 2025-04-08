using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex.API.Models;
using Intex.API.Data;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private MovieDbContext _context;

        public UserController(MovieDbContext temp) => _context = temp;

        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }
    }
}