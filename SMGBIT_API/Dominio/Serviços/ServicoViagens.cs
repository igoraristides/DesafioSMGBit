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

        public async Task SalvarViagens(Viagens viagens)
        {
            await _IViagens.Salvar(viagens);
        }
    }
}
