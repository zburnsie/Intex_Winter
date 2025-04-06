using Intex.API.Data;
using Intex.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS setup
var allowedOrigins = "_allowedOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000") // default React dev server
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(allowedOrigins); // Enable CORS
app.UseAuthorization();
app.MapControllers();



using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Intex.API.Data.AppDbContext>();

    if (!db.Items.Any())
    {
        db.Items.AddRange(
            new Intex.API.Models.Item { Name = "Temple Card", Description = "Used for recommend scanning" },
            new Intex.API.Models.Item { Name = "White Towel", Description = "Needed for baptisms" }
        );
        db.SaveChanges();
    }
}

app.Run();