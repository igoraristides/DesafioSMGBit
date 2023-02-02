using Entidades.Entidades;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Modelos
{
    public class ProcessamentoModelos
    {
        public class Viagens
        {
            public DateTime DataViagem { get; set; }

            public int NumeroViagem { get; set; }
   
            public string Motorista { get; set; }

            public string Placa { get; set; }
     
            public string TipoVeiculo { get; set; }
   
            public string Origem { get; set; }
      
            public string Destino { get; set; }
   
            public string Caixas { get; set; }

            public int KmRodados { get; set; }

            public string TipoViagem { get; set; }

            public int Entregas { get; set; }
        }
    }
}
