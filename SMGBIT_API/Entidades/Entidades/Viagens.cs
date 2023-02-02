using System.ComponentModel.DataAnnotations;

namespace Entidades.Entidades
{

    public class Frete
    {
        public Guid Id { get; set; }

        public int Valor { get; set; }

        [MaxLength(255)]
        public string TipoVeiculo { get; set; }

        [MaxLength(255)]
        public string Cliente { get; set; }

        public Guid ViagemId { get; set; }

        public Viagens Viagem { get; set; }
    }

    public class Viagens
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

        [MaxLength(255)]
        public string Caixas { get; set; }


        public int KmRodados { get; set; }

        [MaxLength(255)]
        public string TipoViagem { get; set; }

        public Guid FreteId { get; set; }

        public Frete Frete { get; set; }

        public int Entregas { get; set; }
    }
}
