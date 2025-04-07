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

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("Model state is invalid.");
                    return BadRequest(ModelState);
                }

                // Generate the next ShowId
                var lastId = _movieContext.Movies
                    .AsEnumerable()
                    .Where(m => m.ShowId != null && m.ShowId.StartsWith("s"))
                    .Select(m =>
                    {
                        var success = int.TryParse(m.ShowId.Substring(1), out var n);
                        return success ? n : 0;
                    })
                    .DefaultIfEmpty(0)
                    .Max();

                movie.ShowId = "s" + (lastId + 1);

                Console.WriteLine("Assigned ShowId: " + movie.ShowId);
                Console.WriteLine("Final Movie Object: " + System.Text.Json.JsonSerializer.Serialize(movie));

                _movieContext.Movies.Add(movie);
                _movieContext.SaveChanges();

                return CreatedAtAction(nameof(GetMovieById), new { id = movie.ShowId }, movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding movie: " + ex.ToString());
                return StatusCode(500, "An error occurred while saving the movie.");
            }
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