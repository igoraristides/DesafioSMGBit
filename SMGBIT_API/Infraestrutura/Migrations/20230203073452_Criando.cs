using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraestrutura.Migrations
{
    /// <inheritdoc />
    public partial class Criando : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Viagens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataViagem = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NumeroViagem = table.Column<int>(type: "int", nullable: false),
                    Motorista = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Placa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TipoVeiculo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Origem = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Destino = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Caixas = table.Column<int>(type: "int", nullable: false),
                    KmRodados = table.Column<int>(type: "int", nullable: false),
                    TipoViagem = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Entregas = table.Column<int>(type: "int", nullable: false),
                    ValorViagem = table.Column<int>(type: "int", nullable: false),
                    FreteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viagens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fretes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Valor = table.Column<int>(type: "int", nullable: false),
                    TipoVeiculo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Cliente = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Destino = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ViagemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fretes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fretes_Viagens_ViagemId",
                        column: x => x.ViagemId,
                        principalTable: "Viagens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Fretes_ViagemId",
                table: "Fretes",
                column: "ViagemId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fretes");

            migrationBuilder.DropTable(
                name: "Viagens");
        }
    }
}
