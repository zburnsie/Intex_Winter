using Intex.API.Models;
using Microsoft.EntityFrameworkCore;

public class LocalSqliteContext : DbContext
{
    public LocalSqliteContext(DbContextOptions<LocalSqliteContext> options) : base(options) { }

    public DbSet<MoviesTitle> Movies { get; set; }
    public DbSet<MoviesRating> Ratings { get; set; }
    public DbSet<MoviesUser> Users { get; set; }
}