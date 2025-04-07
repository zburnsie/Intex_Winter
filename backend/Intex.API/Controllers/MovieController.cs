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
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieGenres = null, [FromQuery] string? search = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(m => m.Title != null && m.Title.ToLower().Contains(lowerSearch));
            }

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

        [HttpPut("updateMovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
            {
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });
            }

            // Update fields
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.AnimeSeriesInternationalTvShows = updatedMovie.AnimeSeriesInternationalTvShows;
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows = updatedMovie.BritishTvShowsDocuseriesInternationalTvShows;
            existingMovie.Children = updatedMovie.Children;
            existingMovie.Comedies = updatedMovie.Comedies;
            existingMovie.ComediesDramasInternationalMovies = updatedMovie.ComediesDramasInternationalMovies;
            existingMovie.ComediesInternationalMovies = updatedMovie.ComediesInternationalMovies;
            existingMovie.ComediesRomanticMovies = updatedMovie.ComediesRomanticMovies;
            existingMovie.CrimeTvShowsDocuseries = updatedMovie.CrimeTvShowsDocuseries;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            existingMovie.DocumentariesInternationalMovies = updatedMovie.DocumentariesInternationalMovies;
            existingMovie.Docuseries = updatedMovie.Docuseries;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.DramasInternationalMovies = updatedMovie.DramasInternationalMovies;
            existingMovie.DramasRomanticMovies = updatedMovie.DramasRomanticMovies;
            existingMovie.FamilyMovies = updatedMovie.FamilyMovies;
            existingMovie.Fantasy = updatedMovie.Fantasy;
            existingMovie.HorrorMovies = updatedMovie.HorrorMovies;
            existingMovie.InternationalMoviesThrillers = updatedMovie.InternationalMoviesThrillers;
            existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = updatedMovie.InternationalTvShowsRomanticTvShowsTvDramas;
            existingMovie.KidsTv = updatedMovie.KidsTv;
            existingMovie.LanguageTvShows = updatedMovie.LanguageTvShows;
            existingMovie.Musicals = updatedMovie.Musicals;
            existingMovie.NatureTv = updatedMovie.NatureTv;
            existingMovie.RealityTv = updatedMovie.RealityTv;
            existingMovie.Spirituality = updatedMovie.Spirituality;
            existingMovie.TvAction = updatedMovie.TvAction;
            existingMovie.TvComedies = updatedMovie.TvComedies;
            existingMovie.TvDramas = updatedMovie.TvDramas;
            existingMovie.TalkShowsTvComedies = updatedMovie.TalkShowsTvComedies;
            existingMovie.Thrillers = updatedMovie.Thrillers;

            _movieContext.SaveChanges();

            return Ok(new { Message = $"Movie with ShowId {showId} updated successfully." });
        }

        [HttpDelete("deleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _movieContext.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
            {
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });
            }

            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return Ok(new { Message = $"Movie with ShowId {showId} deleted successfully." });
        }
    }
}