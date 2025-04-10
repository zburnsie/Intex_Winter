using Intex.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;
namespace Intex.API.Data;

public class UserDbContext : IdentityDbContext<ApplicationUser>
{
    public UserDbContext(DbContextOptions<UserDbContext> options)
        : base(options)
    {
    }
}