using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace REDE_LUZ_API.Migrations
{
    /// <inheritdoc />
    public partial class AddBairroECidadeEmOcorrencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Ocorrencias",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Ocorrencias",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Ocorrencias");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Ocorrencias");
        }
    }
}
