using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Intex.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Text;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

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

            var totalMovies = query.Count();

            var something = query
                .OrderBy(m => m.Title)
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

        [HttpGet("{showId}")]
        public IActionResult GetMovieById(string showId)
        {
            Console.WriteLine($"Movie detail request received for: {showId}");

            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
            {
                Console.WriteLine($"Movie not found: {showId}");
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });
            }

            Console.WriteLine($"Movie found: {movie.Title}");
            return Ok(movie);
        }



        [HttpPost("AddMovie")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("Model state is invalid.");
                    return BadRequest(ModelState);
                }

                var lastId = _context.Movies
                    .AsEnumerable()
                    .Where(m => m.ShowId != null && m.ShowId.StartsWith("s"))
                    .Select(m =>
                    {
                        var success = int.TryParse(m.ShowId!.Substring(1), out var n);
                        return success ? n : 0;
                    })
                    .DefaultIfEmpty(0)
                    .Max();

                movie.ShowId = "s" + (lastId + 1);

                Console.WriteLine("Assigned ShowId: " + movie.ShowId);
                Console.WriteLine("Final Movie Object: " + System.Text.Json.JsonSerializer.Serialize(movie));

                _context.Movies.Add(movie);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetMovieById), new { showId = movie.ShowId }, movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding movie: " + ex.ToString());
                Console.WriteLine("Error adding movie: " + ex.Message);
                Console.WriteLine("Stack Trace: " + ex.StackTrace);
                return StatusCode(500, $"Internal server error: { JsonSerializer.Serialize(movie)}");
            }
        }

        [HttpPut("updateMovie/{showId}")]
        [Authorize(Roles = "Admin")]

        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
            {
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });
            }

            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Type = updatedMovie.Type;
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

            _context.SaveChanges();

            return Ok(new { Message = $"Movie with ShowId {showId} updated successfully." });
        }

        [HttpDelete("deleteMovie/{showId}")]
        [Authorize(Roles = "Admin")]

        public IActionResult DeleteMovie(string showId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
            {
                return NotFound(new { Message = $"Movie with ShowId {showId} not found." });
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return Ok(new { Message = $"Movie with ShowId {showId} deleted successfully." });
        }

        private string NormalizeTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title)) return "";

            var normalized = title.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();

            foreach (var c in normalized)
            {
                var uc = CharUnicodeInfo.GetUnicodeCategory(c);
                if (uc != UnicodeCategory.NonSpacingMark && (char.IsLetterOrDigit(c) || char.IsWhiteSpace(c)))
                    sb.Append(c);
            }

            var cleaned = Regex.Replace(sb.ToString(), "[^A-Za-z0-9 ]+", "");
            cleaned = Regex.Replace(cleaned, @"\s+", " ").Trim();

            return cleaned;
        }

        private static string GetFirstGenre(MoviesTitle movie)
        {
            var genreMap = new Dictionary<string, int?>
            {
                {"Action", movie.Action},
                {"Adventure", movie.Adventure},
                {"AnimeSeriesInternationalTvShows", movie.AnimeSeriesInternationalTvShows},
                {"BritishTvShowsDocuseriesInternationalTvShows", movie.BritishTvShowsDocuseriesInternationalTvShows},
                {"Children", movie.Children},
                {"Comedies", movie.Comedies},
                {"ComediesDramasInternationalMovies", movie.ComediesDramasInternationalMovies},
                {"ComediesInternationalMovies", movie.ComediesInternationalMovies},
                {"ComediesRomanticMovies", movie.ComediesRomanticMovies},
                {"CrimeTvShowsDocuseries", movie.CrimeTvShowsDocuseries},
                {"Documentaries", movie.Documentaries},
                {"DocumentariesInternationalMovies", movie.DocumentariesInternationalMovies},
                {"Docuseries", movie.Docuseries},
                {"Dramas", movie.Dramas},
                {"DramasInternationalMovies", movie.DramasInternationalMovies},
                {"DramasRomanticMovies", movie.DramasRomanticMovies},
                {"FamilyMovies", movie.FamilyMovies},
                {"Fantasy", movie.Fantasy},
                {"HorrorMovies", movie.HorrorMovies},
                {"InternationalMoviesThrillers", movie.InternationalMoviesThrillers},
                {"InternationalTvShowsRomanticTvShowsTvDramas", movie.InternationalTvShowsRomanticTvShowsTvDramas},
                {"KidsTv", movie.KidsTv},
                {"LanguageTvShows", movie.LanguageTvShows},
                {"Musicals", movie.Musicals},
                {"NatureTv", movie.NatureTv},
                {"RealityTv", movie.RealityTv},
                {"Spirituality", movie.Spirituality},
                {"TvAction", movie.TvAction},
                {"TvComedies", movie.TvComedies},
                {"TvDramas", movie.TvDramas},
                {"TalkShowsTvComedies", movie.TalkShowsTvComedies},
                {"Thrillers", movie.Thrillers},
            };

            return genreMap.FirstOrDefault(g => g.Value == 1).Key ?? "Unknown";
        }
    }
}