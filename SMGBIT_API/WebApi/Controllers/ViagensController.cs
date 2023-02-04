using Aplicação.Interfaces;
using AutoMapper;
using ClosedXML.Excel;
using Entidades.Entidades;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static WebApi.Modelos.ProcessamentoModelos;

namespace WebApi.Controllers
{
    public class ViagensController : ControllerBase
    {
        private readonly IAplicacaoViagens _IAplicacaoViagens;

        private readonly IMapper _mapper;

        public ViagensController(IAplicacaoViagens iAplicacaoViagens, IMapper mapper)
        {
            _IAplicacaoViagens = iAplicacaoViagens;
            _mapper = mapper;
        }

        [HttpPost("api/processar-arquivo")]
        public async Task<IActionResult> ProcessarArquivo([FromForm] IFormFile arquivo)
        {
            string extensao = arquivo.FileName.Split('.').Last();

            List<string> listaDeExtensoesValidas = new() { "xlsx" };

            if (listaDeExtensoesValidas.Contains(extensao))
            {
                try
                {
                    List<Viagem> listaDeViagens = new();
                    using (var stream = arquivo.OpenReadStream())
                    {
                        using var workbook = new XLWorkbook(stream);
                        var worksheet = workbook.Worksheet(1);
                        var primeiraLinha = worksheet.FirstRowUsed();
                        var ultimaLinha = worksheet.LastRowUsed();

                        string pathFretes = "Utils/tabela-frete.json";

                        string fretes = System.IO.File.ReadAllText(pathFretes);


                        for (var row = primeiraLinha.RowNumber() + 1; row <= ultimaLinha.RowNumber(); row++)
                        {

                            Dictionary<string, Frete> dicionarioFrete = JsonConvert.DeserializeObject<Dictionary<string, Frete>>(fretes);

                            if (dicionarioFrete != null)
                            {
                                string cliente = worksheet.Cell(row, 1).Value.ToString();

                                string tipoVeiculo = worksheet.Cell(row, 8).Value.ToString();

                                string destino = worksheet.Cell(row, 5).Value.ToString();

                                Frete frete = dicionarioFrete.Values.FirstOrDefault(t =>
                                     (t.Cliente == "CDD São Paulo" && t.TipoVeiculo == tipoVeiculo && t.Destino == destino && t.Cliente == cliente) ||
                                     (t.Cliente == "CDD Ribeirão Preto" && t.TipoVeiculo == tipoVeiculo && t.Cliente == cliente));

                                if (frete == null)
                                {
                                    continue;
                                }

                                frete.Id = Guid.NewGuid();

                                var dadosDaViagem = new Viagem
                                {
                                    Origem = worksheet.Cell(row, 1).Value.ToString(),
                                    Entregas = worksheet.Cell(row, 2).GetValue<int>(),
                                    NumeroViagem = worksheet.Cell(row, 3).GetValue<int>(),
                                    DataViagem = worksheet.Cell(row, 4).GetDateTime(),
                                    Destino = destino,
                                    Placa = worksheet.Cell(row, 6).Value.ToString(),
                                    Motorista = worksheet.Cell(row, 7).Value.ToString(),
                                    TipoVeiculo = tipoVeiculo,
                                    KmRodados = worksheet.Cell(row, 9).GetValue<int>(),
                                    Caixas = worksheet.Cell(row, 10).GetValue<int>(),
                                    TipoViagem = worksheet.Cell(row, 11).Value.ToString(),
                                    TabelaFrete = frete,
                                    ValorViagem = frete.Valor
                                };

                                listaDeViagens.Add(dadosDaViagem);
                            }
                        }


                        foreach (var item in listaDeViagens)
                        {
                            var freteId = Guid.NewGuid();

                            var viagemId = Guid.NewGuid();

                            TabelaFrete tabelaFrete = new()
                            {
                                Id = freteId,
                                Valor = item.TabelaFrete.Valor,
                                TipoVeiculo = item.TabelaFrete.TipoVeiculo,
                                Cliente = item.TabelaFrete.TipoVeiculo,
                                Destino = item.TabelaFrete.Destino,
                                ViagemId = viagemId,
                            };

                            TabelaViagem tabelaViagem = new()
                            {
                                Id = viagemId,
                                DataViagem = item.DataViagem,
                                NumeroViagem = item.NumeroViagem,
                                Motorista = item.Motorista,
                                Placa = item.Placa,
                                TipoVeiculo = item.TipoVeiculo,
                                Origem = item.Origem,
                                Destino = item.Destino,
                                Caixas = item.Caixas,
                                KmRodados = item.KmRodados,
                                TipoViagem = item.TipoViagem,
                                Entregas = item.Entregas,
                                ValorViagem = item.ValorViagem,
                                FreteId = freteId,
                                TabelaFrete = tabelaFrete
                            };

                            tabelaViagem.TabelaFrete.ViagemId = viagemId;


                            //Persistir dados processados no banco
                            await _IAplicacaoViagens.SalvarViagens(tabelaViagem);
                        }
                    }

                    return Ok(new ResultadoProcessamento(listaDeViagens, null));

                }
                catch
                {
                    return BadRequest(new ResultadoProcessamento(null, "Erro ao proccessar o arquivo, por favor verifique o arquivo fornecido ou sua conexão com o banco de dados"));
                }
            }
            else
            {
                return BadRequest(new ResultadoProcessamento(null, $"O formato de arquivo '{extensao}' ainda não é permitido, por favor insira um arquivo com extensão xlsx"));
            }

        }
        [HttpGet("api/viagens-processadas")]
        public async Task<IActionResult> ConsumirViagensProcessadas()
        {

            List<Viagem> listaDeViagens = new();

            var resultadoViagens = await _IAplicacaoViagens.ListarViagens();

            var resultadoFrete = await _IAplicacaoViagens.ListarFretes();

            foreach (var item in resultadoViagens)
            {
                var frete = resultadoFrete.First(e => e.Id == item.FreteId);

                item.TabelaFrete = frete;
            }

            foreach (var item in resultadoViagens)
            {
                Frete frete = new()
                {
                    Id = item.TabelaFrete.Id,
                    Valor = item.TabelaFrete.Valor,
                    TipoVeiculo = item.TabelaFrete.TipoVeiculo,
                    Destino = item.TabelaFrete.Destino,
                    Cliente = item.TabelaFrete.Cliente,
                };


                Viagem viagem = new()
                {
                    DataViagem = item.DataViagem,
                    NumeroViagem = item.NumeroViagem,
                    Motorista = item.Motorista,
                    Placa = item.Placa,
                    TipoVeiculo = item.TipoVeiculo,
                    Origem = item.Origem,
                    Destino = item.Destino,
                    Caixas = item.Caixas,
                    KmRodados = item.KmRodados,
                    TipoViagem = item.TipoViagem,
                    Entregas = item.Entregas,
                    TabelaFrete = frete,
                    ValorViagem = item.ValorViagem

                };

                listaDeViagens.Add(viagem);
            }
            return Ok(new ResultadoProcessamento(listaDeViagens, null));
        }

        [HttpGet("api/fretes")]

        public async Task<ActionResult> ConsumirFretes()
        {
            string pathFretes = "Utils/tabela-frete.json";

            string fretes = System.IO.File.ReadAllText(pathFretes);

            Dictionary<string, Frete> dicionarioFrete = JsonConvert.DeserializeObject<Dictionary<string, Frete>>(fretes);

            List<Frete> frete = dicionarioFrete.Values.ToList();

            return Ok(frete);
        }
    }
}
