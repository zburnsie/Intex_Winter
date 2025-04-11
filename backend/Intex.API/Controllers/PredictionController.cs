using Intex.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly RecommendContext _context;
    private readonly MovieDbContext _movieContext;

    public PredictionController(RecommendContext context, MovieDbContext movieContext)
    {
        _context = context;
        _movieContext = movieContext;
    }

    // GET: api/prediction/content-based
    [HttpGet("content-based")]
    public async Task<IActionResult> GetAllContentBased()
    {
        var data = await _context.ContentBasedRecommendations.ToListAsync();
        return Ok(data);
    }

    // GET: api/prediction/content-based/{showId}
    [HttpGet("content-based/{showId}")]
    public async Task<IActionResult> GetContentBasedRecommendationsForShow(string showId)
    {
        var rec = await _context.ContentBasedRecommendations
            .FirstOrDefaultAsync(r => r.ShowId == showId);

        if (rec == null)
        {
            return NotFound(new { Message = $"No recommendations found for showId {showId}" });
        }

        var recommendedIds = new List<string?>
        {
            rec.Rec1, rec.Rec2, rec.Rec3, rec.Rec4, rec.Rec5
        }.Where(id => !string.IsNullOrEmpty(id)).ToList();

        var recommendedMovies = await _movieContext.Movies
            .Where(m => recommendedIds.Contains(m.ShowId))
            .ToListAsync();

        return Ok(recommendedMovies);
    }

   [HttpGet("hybrid-weighted/{showId}")]
    public async Task<IActionResult> GetHybridRecommendations(string showId)
    {
        var rec = await _context.HybridWeightedRecommendations
            .FirstOrDefaultAsync(r => r.ShowId == showId);

        if (rec == null)
        {
            return NotFound(new { Message = $"No hybrid recommendations found for showId {showId}" });
        }

        var recommendedIds = new List<string?>
        {
            rec.Rec1, rec.Rec2, rec.Rec3, rec.Rec4, rec.Rec5
        }.Where(id => !string.IsNullOrEmpty(id)).ToList();

        var recommendedMovies = await _movieContext.Movies
            .Where(m => recommendedIds.Contains(m.ShowId))
            .ToListAsync();

        return Ok(recommendedMovies);
    }





    // GET: api/prediction/item-to-item
    [HttpGet("item-to-item")]
    public async Task<IActionResult> GetAllItemToItem()
    {
        var data = await _context.ItemToItemCollaborativeRecommendations.ToListAsync();
        return Ok(data);
    }

    // GET: api/prediction/popularity
    [HttpGet("popularity")]
    public async Task<IActionResult> GetAllPopularityBased()
    {
        var popularShowIds = await _context.PopularityBasedRecommendations
            .Select(p => p.ShowId)
            .ToListAsync();

        var movies = await _movieContext.Movies
            .Where(m => popularShowIds.Contains(m.ShowId))
            .ToListAsync();

        return Ok(movies);
    }

    [HttpGet("user-based")]
    public async Task<IActionResult> GetUserRecommendations([FromQuery] int recId)
    {
        var recs = await _context.UserBasedCollaborativeRecommendations
            .FirstOrDefaultAsync(r => r.UserId == recId);

        if (recs == null)
            return NotFound();

        var recommendedShowIds = new List<string?>
        {
            recs.Recommendation1,
            recs.Recommendation2,
            recs.Recommendation3,
            recs.Recommendation4,
            recs.Recommendation5
        }
        .Where(id => !string.IsNullOrEmpty(id)) // filter out nulls
        .ToList();

        return Ok(recommendedShowIds);
    }


}
