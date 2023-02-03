using Entidades.Entidades;

namespace Dominio.Interfaces
{
    public interface IServiçoViagens
    {
        Task SalvarViagens(TabelaViagem viagens);
        Task<List<TabelaViagem>> ListarViagens();
        Task<List<TabelaFrete>> ListarFretes();
    }
}
