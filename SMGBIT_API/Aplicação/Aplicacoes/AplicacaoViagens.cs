using Aplicação.Interfaces;
using Dominio.Interfaces;
using Entidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicação.Aplicacoes
{
    public class AplicacaoViagens : IAplicacaoViagens
    {

        IViagens _IViagens;
        IServiçoViagens _IServiçoViagens;

        public AplicacaoViagens(IViagens IViagens, IServiçoViagens IServiçoViagens)
        {
            _IViagens = IViagens;
            _IServiçoViagens = IServiçoViagens;
        }

        public async Task Salvar(Viagens viagens)
        {
            await _IViagens.Salvar(viagens);
        }

        public async Task SalvarViagens(Viagens viagens)
        {
            await _IServiçoViagens.SalvarViagens(viagens);
        }
    }
}
