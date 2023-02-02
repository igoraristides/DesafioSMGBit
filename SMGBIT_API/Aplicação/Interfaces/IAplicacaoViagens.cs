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
        Task Salvar(Viagens viagens);

        Task SalvarViagens(Viagens viagens);
    }
}
