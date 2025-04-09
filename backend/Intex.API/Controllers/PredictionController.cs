using Intex.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly RecommendContext _context;

    public PredictionController(RecommendContext context)
    {
        _context = context;
    }

    // GET: api/prediction/content-based
    [HttpGet("content-based")]
    public async Task<IActionResult> GetAllContentBased()
    {
        var data = await _context.ContentBasedRecommendations.ToListAsync();
        return Ok(data);
    }

    // GET: api/prediction/hybrid
    [HttpGet("hybrid")]
    public async Task<IActionResult> GetAllHybridWeighted()
    {
        var data = await _context.HybridWeightedRecommendations.ToListAsync();
        return Ok(data);
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
        var data = await _context.PopularityBasedRecommendations.ToListAsync();
        return Ok(data);
    }

    // GET: api/prediction/user-based
    [HttpGet("user-based")]
    public async Task<IActionResult> GetAllUserBased()
    {
        var data = await _context.UserBasedCollaborativeRecommendations.ToListAsync();
        return Ok(data);
    }
}