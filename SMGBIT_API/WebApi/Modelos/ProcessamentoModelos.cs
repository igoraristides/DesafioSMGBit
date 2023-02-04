using Newtonsoft.Json;

namespace WebApi.Modelos
{
    public class ProcessamentoModelos
    {
        public class Viagem
        {
            public DateTime DataViagem { get; set; }

            public int NumeroViagem { get; set; }

            public string Motorista { get; set; }

            public string Placa { get; set; }

            public string TipoVeiculo { get; set; }

            public string Origem { get; set; }

            public string Destino { get; set; }

            public int Caixas { get; set; }

            public int KmRodados { get; set; }

            public string TipoViagem { get; set; }

            public int Entregas { get; set; }

            public Frete TabelaFrete { get; set; }

            public int ValorViagem { get; set; }
        }

        public class Frete
        {
            public Guid Id { get; set; }

            [JsonProperty("value")]
            public int Valor { get; set; }

            [JsonProperty("vehicle_type")]
            public string TipoVeiculo { get; set; }

            [JsonProperty("destination")]
            public string Destino { get; set; }

            [JsonProperty("client")]
            public string Cliente { get; set; }
        }

        public class ResultadoProcessamento
        {
            public ResultadoProcessamento(List<Viagem>? resultado, string? erro)
            {
                Resultado = resultado;
                Erro = erro;
            }

            public List<Viagem>? Resultado { get; set; }

            public string? Erro { get; set; }   
        }
    }
}
