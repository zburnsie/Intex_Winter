using Microsoft.EntityFrameworkCore;

public class RecommendationService : IRecommendationService
{
    private readonly RecommendationContext _context;

    public RecommendationService(RecommendationContext context)
    {
        _context = context;
    }

    public async Task<Recommendation?> GetRecommendationByIdAsync(double itemId)
    {
        return await _context.Recommendations.FindAsync(itemId);
    }

    public async Task<List<Recommendation>> GetSampleRecommendationsAsync(int count = 5)
    {
        return await _context.Recommendations.Take(count).ToListAsync();
    }
}