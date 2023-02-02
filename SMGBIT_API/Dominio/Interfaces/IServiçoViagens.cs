using Entidades.Entidades;

namespace Dominio.Interfaces
{
    public interface IServiçoViagens
    {
        Task SalvarViagens(Viagens viagens);
    }
}
