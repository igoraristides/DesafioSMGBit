import axios, { AxiosPromise } from 'axios';
import { IFrete, IResultado } from './api.schema';

export const api = axios.create({
  baseURL: 'https://localhost:7097',
  withCredentials: false,
});

export function processarArquivo(arquivo: FormData): AxiosPromise<IResultado> {
  return api.post('api/processar-arquivo', arquivo);
}

export function consumirViagensProcessadas(): AxiosPromise<IResultado> {
  return api.get('api/viagens-processadas');
}

export function consumirFretes(): AxiosPromise<IFrete[]> {
  return api.get('api/fretes');
}
