using Microsoft.AspNetCore.Mvc;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionController : ControllerBase
    {
        private readonly IRecommendationService _recommendationService;

        public PredictionController(IRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        [HttpGet("recommendations-db/{ShowId}")]
        public async Task<IActionResult> GetDbRecommendation(string ShowId)
        {
            var result = await _recommendationService.GetRecommendationByIdAsync(ShowId);

            if (result is null)
            {
                return NotFound($"No recommendation found for ID: {ShowId}");
            }

            return Ok(new
                        {
                            result.ShowId,
                            result.Title,
                            result.Recommendation1,
                            result.Recommendation2,
                            result.Recommendation3,
                            result.Recommendation4,
                            result.Recommendation5
                        });
        }
        [HttpGet("recommendations-db-preview")]
        public async Task<IActionResult> GetDbRecommendationsPreview()
        {
            var sample = await _recommendationService.GetSampleRecommendationsAsync();

            return Ok(new
            {
                message = "Database recommendations loaded successfully",
                count = sample.Count,
                sample
            });
        }
    }
}