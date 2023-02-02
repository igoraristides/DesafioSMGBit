using Aplica��o.Aplicacoes;
using Aplica��o.Interfaces;
using Dominio.Interfaces;
using Dominio.Servi�os;
using Infraestrutura.Configura��o;
using Infraestrutura.Repositorios;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddDbContext<Contexto>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

//// INTERFACE E REPOSITORIO
builder.Services.AddSingleton<IViagens, RepositorioViagens>();

// SERVI�O DOMINIO
builder.Services.AddSingleton<IServi�oViagens, ServicoViagens>();

// INTERFACE APLICA��O
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
