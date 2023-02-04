using Dominio.Interfaces;
using Entidades.Entidades;
using Infraestrutura.Configuração;
using Microsoft.EntityFrameworkCore;

namespace Infraestrutura.Repositorios
{
    public class RepositorioViagens : TabelaViagem, IViagens
    {

        private readonly DbContextOptions<Contexto> _optionsbuilder;

        public RepositorioViagens()
        {
            _optionsbuilder = new DbContextOptions<Contexto>();
        }

        public async Task<List<TabelaFrete>> ListarF()
        {
            using Contexto banco = new(_optionsbuilder);

            return await banco.Set<TabelaFrete>().ToListAsync();
        }

        public async Task<List<TabelaViagem>> ListarV()
        {
            using Contexto banco = new(_optionsbuilder);

            return await banco.Set<TabelaViagem>().ToListAsync();
        }

        public async Task Salvar(TabelaViagem viagens)
        {
            using Contexto banco = new(_optionsbuilder);

            //Validação retirada pois como os dados são gerados randomicamente pela função RANDBETWEEN, acabam por se tornar novos dados


            ////"Entregas/Paradas" e "KmRodados" retirados da comparação devido o fato de possuir numeros randomicos graças a função RANDBETWEEN

            //var viagemExisteNaBase = await banco.Set<TabelaViagem>().FirstOrDefaultAsync(v =>
            //    v.DataViagem == viagens.DataViagem &&
            //    v.NumeroViagem == viagens.NumeroViagem &&
            //    v.Motorista == viagens.Motorista &&
            //    v.Placa == viagens.Placa &&
            //    v.TipoVeiculo == viagens.TipoVeiculo &&
            //    v.Origem == viagens.Origem &&
            //    v.Destino == viagens.Destino &&
            //    v.Caixas == viagens.Caixas &&
            //    v.TipoViagem == viagens.TipoViagem &&
            //    v.ValorViagem == viagens.ValorViagem);

            //if (viagemExisteNaBase == null)
            //{
            await banco.Set<TabelaViagem>().AddAsync(viagens);
                await banco.SaveChangesAsync();
            //}
        }
    }
}
