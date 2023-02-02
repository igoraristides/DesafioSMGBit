using Aplicação.Aplicacoes;
using Aplicação.Interfaces;
using Dominio.Interfaces;
using Dominio.Serviços;
using Infraestrutura.Configuração;
using Infraestrutura.Repositorios;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddDbContext<Contexto>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

//// INTERFACE E REPOSITORIO
builder.Services.AddSingleton<IViagens, RepositorioViagens>();

// SERVIÇO DOMINIO
builder.Services.AddSingleton<IServiçoViagens, ServicoViagens>();

// INTERFACE APLICAÇÃO
builder.Services.AddSingleton<IAplicacaoViagens, AplicacaoViagens>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();
