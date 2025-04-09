using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Intex.API.Data;

namespace Intex.API.Controllers;

[Route("[controller]")]
[ApiController]
//[Authorize(Roles = "Admin")]
public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
            return BadRequest("Role name cannot be empty.");

        roleName = roleName.Trim();
        if (await _roleManager.RoleExistsAsync(roleName))
            return Conflict("Role already exists.");

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
            return Ok($"Role '{roleName}' created successfully.");

        return StatusCode(500, string.Join(", ", result.Errors.Select(e => e.Description)));
    }

    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser(string userEmail, string roleName)
    {
        if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
            return BadRequest("User email and role name are required.");

        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
            return NotFound("User not found.");

        if (!await _roleManager.RoleExistsAsync(roleName))
            return NotFound("Role does not exist.");

        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (result.Succeeded)
            return Ok($"Role '{roleName}' assigned to user '{userEmail}'.");

        return StatusCode(500, string.Join(", ", result.Errors.Select(e => e.Description)));
    }

    [HttpPut("UpdateRoleName")]
    public async Task<IActionResult> UpdateRoleName(string currentRoleName, string newRoleName)
    {
        if (string.IsNullOrWhiteSpace(currentRoleName) || string.IsNullOrWhiteSpace(newRoleName))
            return BadRequest("Both current and new role names are required.");

        var role = await _roleManager.FindByNameAsync(currentRoleName);
        if (role == null)
            return NotFound("Original role not found.");

        role.Name = newRoleName;
        role.NormalizedName = newRoleName.ToUpperInvariant();

        var result = await _roleManager.UpdateAsync(role);
        if (result.Succeeded)
            return Ok($"Role name changed from '{currentRoleName}' to '{newRoleName}'.");

        return StatusCode(500, string.Join(", ", result.Errors.Select(e => e.Description)));
    }

    [HttpDelete("DeleteRole")]
    public async Task<IActionResult> DeleteRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
            return BadRequest("Role name is required.");

        var role = await _roleManager.FindByNameAsync(roleName);
        if (role == null)
            return NotFound("Role not found.");

        var result = await _roleManager.DeleteAsync(role);
        if (result.Succeeded)
            return Ok($"Role '{roleName}' deleted successfully.");

        return StatusCode(500, string.Join(", ", result.Errors.Select(e => e.Description)));
    }


    //debug
    [HttpGet("checkUserRoles")]
    public async Task<IActionResult> CheckRoles(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return NotFound("User not found");

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }
}
