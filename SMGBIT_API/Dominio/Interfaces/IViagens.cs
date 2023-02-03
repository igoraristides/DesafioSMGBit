using Entidades.Entidades;

namespace Dominio.Interfaces
{
    public interface IViagens
    {
        Task Salvar(TabelaViagem viagens);
        Task<List<TabelaViagem>> ListarV();

        Task<List<TabelaFrete>> ListarF();
    }
}
