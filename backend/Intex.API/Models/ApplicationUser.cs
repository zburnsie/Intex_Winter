using Microsoft.AspNetCore.Identity;

namespace Intex.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int? Rec_Id { get; set; } // Nullable to allow for users without a Rec_Id
    }
}
