using Aplicação.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using static WebApi.Modelos.ProcessamentoModelos;
using Newtonsoft.Json;
using Entidades.Entidades;
using AutoMapper;
using DocumentFormat.OpenXml.Bibliography;

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

                        //Persistir dados processados no banco

                        foreach (var item in listaDeViagens)
                        {
                            TabelaViagem tabelaViagens = _mapper.Map<TabelaViagem>(item);

                            await _IAplicacaoViagens.SalvarViagens(tabelaViagens);
                        }
                    }

                    return Ok(listaDeViagens);

                }
                catch
                {
                    return BadRequest($"Erro ao proccessar o arquivo, por favor verifique o arquivo fornecido");
                }
            }
            else
            {
                return BadRequest($"O formato de arquivo '{extensao}'ainda não é permitido, por favor insira um arquivo com extensão xlsx");
            }

        }
        [HttpGet("api/viagens-processadas")]
        public async Task<IActionResult> ConsumirViagensProcessadas()
        {
            var resultadoViagens = await _IAplicacaoViagens.ListarViagens();

            var resultadoFrete = await _IAplicacaoViagens.ListarFretes();

            foreach (var item in resultadoViagens)
            {
                var frete = resultadoFrete.First(e => e.Id == item.FreteId);

                item.TabelaFrete = frete;
            }
            
            return Ok (resultadoViagens);
        }
    }
}
