using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostersController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public PostersController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult GetPosterFileNames()
        {
            var postersPath = Path.Combine(_env.WebRootPath, "Movie Posters");
            if (!Directory.Exists(postersPath))
                return NotFound("Posters folder not found.");

            var fileNames = Directory.GetFiles(postersPath)
                .Select(f => Path.GetFileName(f)) // returns full filename WITH extension
                .ToList();

            return Ok(fileNames);
        }
    }
}
