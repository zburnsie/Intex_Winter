using Intex.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Item> Items { get; set; } = null!;
}