using Aplicação.Aplicacoes;
using Aplicação.Interfaces;
using AutoMapper;
using Dominio.Interfaces;
using Dominio.Serviços;
using Entidades.Entidades;
using Infraestrutura.Configuração;
using Infraestrutura.Repositorios;
using Microsoft.EntityFrameworkCore;
using static WebApi.Modelos.ProcessamentoModelos;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddDbContext<Contexto>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

//REPOSITORIO
builder.Services.AddSingleton<IViagens, RepositorioViagens>();

//DOMINIO
builder.Services.AddSingleton<IServiçoViagens, ServicoViagens>();

//APLICAÇÃO
builder.Services.AddSingleton<IAplicacaoViagens, AplicacaoViagens>();

var config = new MapperConfiguration(cfg => {


    cfg.CreateMap<Viagem, TabelaViagem>()
        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
        .ForMember(dest => dest.FreteId, opt => opt.MapFrom(src => src.TabelaFrete.Id))
        .ForMember(dest => dest.TabelaFrete, opt => opt.MapFrom(src => src.TabelaFrete));

    cfg.CreateMap<Frete, TabelaFrete>()
        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
});

var mapper = config.CreateMapper();

builder.Services.AddSingleton(mapper);

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
