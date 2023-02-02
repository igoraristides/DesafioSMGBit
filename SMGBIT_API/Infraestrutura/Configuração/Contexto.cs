using Entidades.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Infraestrutura.Configuração
{
    public class Contexto : DbContext
    {
        public DbSet<Viagens> Viagens { get; set; }
        public DbSet<Frete> Fretes { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes): base(opcoes) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Frete>()
                        .HasOne(f => f.Viagem)
                        .WithOne(v => v.Frete)
                        .HasForeignKey<Frete>(f => f.ViagemId);

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=localhost;Database=smgbit_igor;Integrated Security=False;User ID=sa;Password=aristides09;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False");
            }
        }
    }
}
