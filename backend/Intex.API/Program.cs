using Intex.API;
using Intex.API.Data;
using Intex.API.Models;
using Intex.API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// Controller and API Services
// -----------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// -----------------------------
// Connection Strings
// -----------------------------
var movieConnection = builder.Configuration.GetConnectionString("DefaultConnection");

// -----------------------------
// Database Contexts
// -----------------------------
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(movieConnection));

builder.Services.AddDbContext<RecommendContext>(options =>
    options.UseSqlite(movieConnection));

// -----------------------------
// CORS Policy
// -----------------------------
var allowedOrigins = "_allowedOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
              // .AllowCredentials(); // Enable only if needed for auth
    });
});

var app = builder.Build();

// -----------------------------
// Middleware Pipeline
// -----------------------------
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Good to have early
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(allowedOrigins); // ✅ CORS must go between UseRouting and UseAuthorization (if used)

app.UseAuthorization(); // Only needed if you’re using [Authorize] attributes

// -----------------------------
// Endpoint Mapping
// -----------------------------
app.MapControllers().RequireCors(allowedOrigins);

app.Run();




