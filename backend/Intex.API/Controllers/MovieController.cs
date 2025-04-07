using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Intex.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp) => _movieContext = temp;

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieGenres = null)
        {
            var query = _movieContext.Movies.AsQueryable();
            // if (movieGenres != null && movieGenres.Any())
            // {
            //     query = query.Where(m => movieGenres.Contains(m.Genre));
            // }
            var totalMovies = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someObject = new
            {
                Movies = something,
                TotalMovies = totalMovies,
            };
            return Ok(someObject);
        }


        [HttpGet("{id}")]
        public IActionResult GetMovieById(int id)
        {
            return Ok(new { Message = $"Details for movie with ID {id} will go here." });
        }

        [HttpPost]
        public IActionResult CreateMovie([FromBody] object movie)
        {
            return Created("", new { Message = "Movie created successfully." });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMovie(int id, [FromBody] object movie)
        {
            return Ok(new { Message = $"Movie with ID {id} updated successfully." });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            return Ok(new { Message = $"Movie with ID {id} deleted successfully." });
        }
    }
}