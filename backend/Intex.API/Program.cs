using System.Security.Claims;
using Intex.API;
using Intex.API.Data;
using Intex.API.Models;
using Intex.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;

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

builder.Services.AddDbContext<RecommendContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthorization();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<UserDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 3;

    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddScoped<RecommendationService>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("_allowedOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "https://nice-meadow-0d2951b1e.6.azurestaticapps.net")
              .AllowAnyHeader()
              .AllowAnyMethod();
              // .AllowCredentials(); // Enable only if needed for auth
    });
});

builder.Services.AddSingleton<IEmailSender<ApplicationUser>, NoOpEmailSender<ApplicationUser>>();

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

if (!app.Environment.IsDevelopment())
{
    app.UseHsts(); // enables HSTS for production
}


app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("_allowedOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.UseDeveloperExceptionPage();

app.MapControllers();
app.MapIdentityApi<ApplicationUser>()
   .RequireCors("_allowedOrigins");

app.MapPost("/logout", async (HttpContext context, SignInManager<ApplicationUser> signInManager) =>
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

app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<ApplicationUser> userManager) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var identityUser = await userManager.FindByEmailAsync(email);
    var roles = identityUser != null ? await userManager.GetRolesAsync(identityUser) : new List<string>();
    var recId = identityUser?.Rec_Id ?? -1;
    Console.WriteLine($"PingAuth for {email}: recId = {identityUser?.Rec_Id}");

    return Results.Json(new
    {
        email = email,
        roles = roles,
        recId = recId
    });
}).RequireAuthorization();

app.Run();
