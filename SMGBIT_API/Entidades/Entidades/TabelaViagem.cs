using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Entidades.Entidades
{

    public class TabelaFrete
    {
        public Guid Id { get; set; }

        public int Valor { get; set; }

        [MaxLength(255)]
        public string TipoVeiculo { get; set; }

        [MaxLength(255)]
        public string Cliente { get; set; }

        [MaxLength(255)]
        public string? Destino { get; set; }

        public Guid ViagemId { get; set; }

        public TabelaViagem Viagem { get; set; }
    }

    public class TabelaViagem
    {
        public Guid Id { get; set; }

        public DateTime DataViagem { get; set; }

        public int NumeroViagem { get; set; }

        [MaxLength(255)]
        public string Motorista { get; set; }

        [MaxLength(255)]
        public string Placa { get; set; }

        [MaxLength(255)]
        public string TipoVeiculo { get; set; }

        [MaxLength(255)]
        public string Origem { get; set; }

        [MaxLength(255)]
        public string Destino { get; set; }

        public int Caixas { get; set; }

        public int KmRodados { get; set; }

        [MaxLength(255)]
        public string TipoViagem { get; set; }

        public int Entregas { get; set; }

        public int ValorViagem { get; set; }

        public Guid FreteId { get; set; }

        public TabelaFrete TabelaFrete { get; set; }

    }
}
