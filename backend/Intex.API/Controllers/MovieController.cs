using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Intex.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Text;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private MovieDbContext _context;

        public MovieController(MovieDbContext temp) => _context = temp;

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieGenres = null, [FromQuery] string? search = null)
        {
            var query = _context.Movies.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(m => m.Title != null && m.Title.ToLower().Contains(lowerSearch));
            }

            if (movieGenres != null && movieGenres.Any())
            {
                query = query.Where(m =>
                    (movieGenres.Contains("Action") && m.Action == 1) ||
                    (movieGenres.Contains("Adventure") && m.Adventure == 1) ||
                    (movieGenres.Contains("AnimeSeriesInternationalTvShows") && m.AnimeSeriesInternationalTvShows == 1) ||
                    (movieGenres.Contains("BritishTvShowsDocuseriesInternationalTvShows") && m.BritishTvShowsDocuseriesInternationalTvShows == 1) ||
                    (movieGenres.Contains("Children") && m.Children == 1) ||
                    (movieGenres.Contains("Comedies") && m.Comedies == 1) ||
                    (movieGenres.Contains("ComediesDramasInternationalMovies") && m.ComediesDramasInternationalMovies == 1) ||
                    (movieGenres.Contains("ComediesInternationalMovies") && m.ComediesInternationalMovies == 1) ||
                    (movieGenres.Contains("ComediesRomanticMovies") && m.ComediesRomanticMovies == 1) ||
                    (movieGenres.Contains("CrimeTvShowsDocuseries") && m.CrimeTvShowsDocuseries == 1) ||
                    (movieGenres.Contains("Documentaries") && m.Documentaries == 1) ||
                    (movieGenres.Contains("DocumentariesInternationalMovies") && m.DocumentariesInternationalMovies == 1) ||
                    (movieGenres.Contains("Docuseries") && m.Docuseries == 1) ||
                    (movieGenres.Contains("Dramas") && m.Dramas == 1) ||
                    (movieGenres.Contains("DramasInternationalMovies") && m.DramasInternationalMovies == 1) ||
                    (movieGenres.Contains("DramasRomanticMovies") && m.DramasRomanticMovies == 1) ||
                    (movieGenres.Contains("FamilyMovies") && m.FamilyMovies == 1) ||
                    (movieGenres.Contains("Fantasy") && m.Fantasy == 1) ||
                    (movieGenres.Contains("HorrorMovies") && m.HorrorMovies == 1) ||
                    (movieGenres.Contains("InternationalMoviesThrillers") && m.InternationalMoviesThrillers == 1) ||
                    (movieGenres.Contains("InternationalTvShowsRomanticTvShowsTvDramas") && m.InternationalTvShowsRomanticTvShowsTvDramas == 1) ||
                    (movieGenres.Contains("KidsTv") && m.KidsTv == 1) ||
                    (movieGenres.Contains("LanguageTvShows") && m.LanguageTvShows == 1) ||
                    (movieGenres.Contains("Musicals") && m.Musicals == 1) ||
                    (movieGenres.Contains("NatureTv") && m.NatureTv == 1) ||
                    (movieGenres.Contains("RealityTv") && m.RealityTv == 1) ||
                    (movieGenres.Contains("Spirituality") && m.Spirituality == 1) ||
                    (movieGenres.Contains("TvAction") && m.TvAction == 1) ||
                    (movieGenres.Contains("TvComedies") && m.TvComedies == 1) ||
                    (movieGenres.Contains("TvDramas") && m.TvDramas == 1) ||
                    (movieGenres.Contains("TalkShowsTvComedies") && m.TalkShowsTvComedies == 1) ||
                    (movieGenres.Contains("Thrillers") && m.Thrillers == 1)
                );
            }

            var allFilteredMovies = query.ToList();
            var totalMovies = allFilteredMovies.Count;

            var random = new Random();
            var paged = allFilteredMovies
                .OrderBy(x => random.Next())
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Movies = paged,
                TotalMovies = totalMovies,
            };

            return Ok(result);
        }

        [HttpGet("{showId}")]
        public IActionResult GetMovieById(string showId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });

            return Ok(movie);
        }

        [HttpPost("AddMovie")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lastId = _context.Movies
                .AsEnumerable()
                .Where(m => m.ShowId != null && m.ShowId.StartsWith("s"))
                .Select(m => int.TryParse(m.ShowId!.Substring(1), out var n) ? n : 0)
                .DefaultIfEmpty(0)
                .Max();

            movie.ShowId = "s" + (lastId + 1);

            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetMovieById), new { showId = movie.ShowId }, movie);
        }

        [HttpPut("updateMovie/{showId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });

            foreach (var prop in typeof(MoviesTitle).GetProperties())
            {
                var newValue = prop.GetValue(updatedMovie);
                prop.SetValue(existingMovie, newValue);
            }

            _context.SaveChanges();
            return Ok(new { Message = $"Movie with ShowId {showId} updated successfully." });
        }

        [HttpDelete("deleteMovie/{showId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return Ok(new { Message = $"Movie with ShowId {showId} deleted successfully." });
        }
    }
}