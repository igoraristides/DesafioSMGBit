export interface IResultado {
  resultado: IViagem[];
  erro: string;
}

export interface IViagem {
  id: string;
  dataViagem: Date;
  numeroViagem: number;
  motorista: string;
  placa: string;
  tipoVeiculo: string;
  origem: string; //
  destino: string;
  caixas: number;
  kmRodados: number;
  tipoViagem: string;
  entregas: number;
  valorViagem: number;
  freteId: string;
  tabelaFrete: IFrete;
}

export interface IFrete {
  id: string;
  valor: number;
  tipoVeiculo: string;
  cliente: string;
  destino: string | null;
  viagemId: string;
  //viagem: null
}
