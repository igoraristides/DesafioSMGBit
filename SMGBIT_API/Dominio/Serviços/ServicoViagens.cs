using Dominio.Interfaces;
using Entidades.Entidades;

namespace Dominio.Serviços
{
    public class ServicoViagens : IServiçoViagens
    {

        private readonly IViagens _IViagens;

        public ServicoViagens(IViagens IViagens)
        {
            _IViagens = IViagens;
        }

        public async Task<List<TabelaFrete>> ListarFretes()
        {
           return await _IViagens.ListarF();
        }

        public async Task<List<TabelaViagem>> ListarViagens()
        {
           return await _IViagens.ListarV();
        }

        public async Task SalvarViagens(TabelaViagem viagens)
        {
            await _IViagens.Salvar(viagens);
        }
    }
}
