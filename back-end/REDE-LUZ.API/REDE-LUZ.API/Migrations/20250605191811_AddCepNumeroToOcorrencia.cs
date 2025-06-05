using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace REDE_LUZ_API.Migrations
{
    /// <inheritdoc />
    public partial class AddCepNumeroToOcorrencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Localizacao",
                table: "Ocorrencias",
                newName: "Numero");

            migrationBuilder.AddColumn<string>(
                name: "Cep",
                table: "Ocorrencias",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Ocorrencias");

            migrationBuilder.RenameColumn(
                name: "Numero",
                table: "Ocorrencias",
                newName: "Localizacao");
        }
    }
}
