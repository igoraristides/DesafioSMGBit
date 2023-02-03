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

        public async Task<List<TabelaFrete>> ListarF()
        {
            return await _IViagens.ListarF();
        }

        public async Task<List<TabelaFrete>> ListarFretes()
        {
            return await _IServiçoViagens.ListarFretes();
        }


        public async Task<List<TabelaViagem>> ListarV()
        {
            return await _IViagens.ListarV();
        }

        public async Task<List<TabelaViagem>> ListarViagens()
        {
            return await _IServiçoViagens.ListarViagens();
        }

        public async Task Salvar(TabelaViagem viagens)
        {
            await _IViagens.Salvar(viagens);
        }

        public async Task SalvarViagens(TabelaViagem viagens)
        {
            await _IServiçoViagens.SalvarViagens(viagens);
        }
    }
}
