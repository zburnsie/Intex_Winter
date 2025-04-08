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
    public class MovieController : Controller
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp) => _movieContext = temp;

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieGenres = null)
        {
            var query = _movieContext.Movies.AsQueryable();

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

            var totalMovies = query.Count(); // Get total BEFORE converting to list

            var something = query
                .OrderBy(m => m.Title) // Add this line
                .Skip((pageNum - 1) * pageSize)
                .Take(100)
                .ToList()
                .Select(m => new
                {
                    m.Title,
                    m.ShowId,
                    Genre = GetFirstGenre(m),
                    NormalizedTitle = NormalizeTitle(m.Title)
                })
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