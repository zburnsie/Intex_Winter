using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intex.API.Migrations
{
    /// <inheritdoc />
    public partial class RecIdFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rec_Id",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rec_Id",
                table: "AspNetUsers");
        }
    }
}
