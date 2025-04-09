using Intex.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Intex.API;

public class RecommendationService
{
    private readonly RecommendContext _context;

    public RecommendationService(RecommendContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ContentBasedRecommendation>> GetContentRecommendationsAsync(int showId)
    {
        return await _context.ContentBasedRecommendations
            .Where(r => r.ShowId == showId.ToString())
            .ToListAsync();
    }

    public async Task<IEnumerable<UserBasedCollaborativeRecommendation>> GetUserRecommendationsAsync(int userId)
    {
        return await _context.UserBasedCollaborativeRecommendations
            .Where(r => r.UserId == userId)
            .ToListAsync();
    }

    public async Task<IEnumerable<HybridWeightedRecommendation>> GetHybridRecommendationsAsync(int showId)
    {
        return await _context.HybridWeightedRecommendations
            .Where(r => r.ShowId == showId.ToString())
            .ToListAsync();
    }

    public async Task<IEnumerable<PopularityBasedRecommendation>> GetPopularityRecommendationsAsync(int showId)
    {
        return await _context.PopularityBasedRecommendations
            .Where(r => r.ShowId == showId.ToString())
            .ToListAsync();
    }

    public async Task<IEnumerable<ItemToItemCollaborativeRecommendation>> GetItemToItemRecommendationsAsync(int showId)
    {
        return await _context.ItemToItemCollaborativeRecommendations
            .Where(r => r.BaseShowId == showId.ToString())
            .ToListAsync();
    }
}