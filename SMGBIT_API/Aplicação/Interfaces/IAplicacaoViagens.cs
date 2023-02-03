using Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicação.Interfaces
{
    public interface IAplicacaoViagens
    {
        Task Salvar(TabelaViagem viagens);

        Task SalvarViagens(TabelaViagem viagens);

        Task<List<TabelaViagem>> ListarViagens();

        Task<List<TabelaFrete>> ListarFretes();

        Task<List<TabelaViagem>> ListarV();

        Task<List<TabelaFrete>> ListarF();
    }
}
