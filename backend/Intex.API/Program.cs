using System.Security.Claims;
using Intex.API;
using Intex.API.Data;
using Intex.API.Models;
using Intex.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
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
var userConnection = builder.Configuration.GetConnectionString("IdentityConnection");

// -----------------------------
// Database Contexts
// -----------------------------
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(movieConnection));

builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseSqlite(userConnection));

builder.Services.AddAuthorization();


builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<UserDbContext>()
    .AddDefaultTokenProviders();

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//    .AddEntityFrameworkStores<UserDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Better Password Policy
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 3;

    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddScoped<RecommendationService>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None; // change after adding https for production
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    
});

// -----------------------------
// CORS Policy
var allowedOrigins = "_allowedOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000","https://nice-meadow-0d2951b1e.6.azurestaticapps.net")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDbContext<RecommendContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// -----------------------------
// Middleware Pipeline
// -----------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(allowedOrigins);         // ✅ MUST come after UseRouting, BEFORE anything else needing CORS

app.UseAuthentication();
app.UseAuthorization();
app.UseDeveloperExceptionPage();


// 👇 These must come AFTER the middleware
app.MapControllers();
app.MapIdentityApi<IdentityUser>()
    .RequireCors(allowedOrigins); // 👈 ADD this to apply CORS to /login


// -----------------------------
// Custom Identity Endpoints
// -----------------------------
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        SameSite = SameSiteMode.None,
        Secure = true
    });
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<IdentityUser> userManager) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var identityUser = await userManager.FindByEmailAsync(email);
    var roles = identityUser != null ? await userManager.GetRolesAsync(identityUser) : new List<string>();

    return Results.Json(new
    {
        email = email,
        roles = roles
    });
}).RequireAuthorization();


// ... your endpoints and static files

app.Run();

