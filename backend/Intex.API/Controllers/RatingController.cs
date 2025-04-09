using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Intex.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Text;
using System.Globalization;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private MovieDbContext _context;

        public RatingController(MovieDbContext temp) => _context = temp;

        [HttpGet("AllRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _context.Ratings.ToList();
            return Ok(ratings);
        }
    }
}