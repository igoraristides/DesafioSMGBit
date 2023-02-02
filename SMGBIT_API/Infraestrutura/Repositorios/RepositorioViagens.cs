using Dominio.Interfaces;
using Entidades.Entidades;
using Infraestrutura.Configuração;
using Microsoft.EntityFrameworkCore;

namespace Infraestrutura.Repositorios
{
    public class RepositorioViagens : Viagens, IViagens
    {

        private readonly DbContextOptions<Contexto> _optionsbuilder;

        public RepositorioViagens()
        {
            _optionsbuilder = new DbContextOptions<Contexto>();
        }


        public async Task Salvar(Viagens viagens)
        {
            using Contexto banco = new(_optionsbuilder);
            await banco.Set<Viagens>().AddAsync(viagens);
            await banco.SaveChangesAsync();
        }
    }
}
