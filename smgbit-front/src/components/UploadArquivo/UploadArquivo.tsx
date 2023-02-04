import { classNamesFunction, FontIcon, IColumn, IconButton, Image, PrimaryButton, Spinner, SpinnerSize, Stack, styled } from '@fluentui/react';
import { getStyles } from './UploadArquivo.styles';
import { ITiposArquivos, IUploadArquivoProps, IUploadArquivoStyles, IUploadArquivoStylesProps } from './UploadArquivo.types';

import { useState } from 'react';
import { TiposDeArquivos, TiposArquivosPermitidos } from '../../constants/Constantes';
import { toast } from 'react-toastify';
import { processarArquivo } from '../../api/api';
import { IResultado, IViagem } from '../../api/api.schema';
import Tabela from '../TabelaViagem/Tabela';
import { formatadorDeData } from '../../utils/helpers';
import { AxiosError } from 'axios';

const getClassNames = classNamesFunction<IUploadArquivoStylesProps, IUploadArquivoStyles>();

const UploadArquivo: React.FC<IUploadArquivoProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  const [arquivoProcessado, setArquivoProcessado] = useState<IViagem[]>([]);

  const colunas: IColumn[] = [
    { key: 'origem', name: 'Origem', fieldName: 'origem', minWidth: 120 },
    { key: 'entregas', name: 'Entregas', fieldName: 'entregas', minWidth: 80 },
    { key: 'numeroViagem', name: 'N. Viagem', fieldName: 'numeroViagem', minWidth: 80 },
    {
      key: 'dataViagem',
      name: 'Data da Viagem',
      fieldName: 'dataViagem',
      minWidth: 150,
      isResizable: true,
      onRender: (item: IViagem) => {
        return formatadorDeData(item.dataViagem);
      },
    },
    { key: 'destino', name: 'Destino', fieldName: 'destino', minWidth: 140 },
    { key: 'placa', name: 'Placa', fieldName: 'placa', minWidth: 80 },
    { key: 'motorista', name: 'Motorista', fieldName: 'motorista', minWidth: 120 },
    { key: 'tipoVeiculo', name: 'Veículo', fieldName: 'tipoVeiculo', minWidth: 60 },
    {
      key: 'kmRodados',
      name: 'Km(s) Rodados',
      fieldName: 'kmRodados',
      minWidth: 120,
      isResizable: true,
      onRender: (item: IViagem) => {
        return `${item.kmRodados} quilômetros`;
      },
    },
    { key: 'caixas', name: 'Caixas', fieldName: 'caixas', minWidth: 45 },
    { key: 'tipoViagem', name: 'Tipo', fieldName: 'tipoViagem', minWidth: 80 },
    {
      key: 'valorViagem',
      name: 'Valor Total',
      fieldName: 'valorViagem',
      minWidth: 80,
      isResizable: true,
      onRender: (item: IViagem) => {
        return `R$ ${item.valorViagem},00`;
      },
    },
  ];

  const OnChangeArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (VerificarSeExisteViagens()) setArquivoProcessado([]);
    setArquivo(event.target.files?.[0] || null);
  };

  const enviarArquivo = () => {
    if (!arquivo) return;

    setCarregando(true);

    const formData = new FormData();

    formData.append('arquivo', arquivo);

    processarArquivo(formData)
      .then((result) => {
        setArquivoProcessado(result.data.resultado);
        toast.success('Arquivo processado e salvo com sucesso.');
      })
      .catch((error: AxiosError<IResultado>) => toast.error(error.response?.data.erro))
      .finally(() => {
        setArquivo(null);
        setCarregando(false);
      });
  };

  const VerificarSeExisteViagens = (): boolean => (arquivoProcessado.length !== 0 ? true : false);

  const RenderizarTabelaDeViagens = (): React.ReactNode => {
    return (
      <Stack style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 50 }}>
        <Tabela itens={arquivoProcessado} colunas={colunas} titulo="Dados Processados:" />
      </Stack>
    );
  };

  const RenderTipoArquivo = (): React.ReactNode => {
    if (arquivo != null) {
      let extensaoArquivo: string | undefined = arquivo.name.split('.').at(-1);

      let tipoArquivo: ITiposArquivos | undefined = TiposDeArquivos.find((e) => e.tipoArquivo == extensaoArquivo);

      if (tipoArquivo)
        return (
          <Stack className={classNames.imagens} style={{ width: '30%' }}>
            {carregando ? (
              <Spinner label="Processando o arquivo enviado..." ariaLive="assertive" size={SpinnerSize.large} />
            ) : (
              <Stack>
                <span style={{ marginBottom: '15px' }}>Arquivo selecionado:</span>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center" style={{ width: '100%' }}>
                  <Stack horizontal verticalAlign="center">
                    <Image src={tipoArquivo.pathTipoArquivo} alt="logo" width={60} height={70} />
                    <span style={{ marginLeft: '20px' }}>{arquivo.name}</span>
                  </Stack>
                  <Stack horizontal>
                    <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setArquivo(null)} />
                  </Stack>
                </Stack>
                <PrimaryButton style={{ marginTop: '15px' }} iconProps={{ iconName: 'Send' }} onClick={() => enviarArquivo()}>
                  Enviar arquivo
                </PrimaryButton>
              </Stack>
            )}
          </Stack>
        );
    }
  };

  return (
    <Stack className={classNames.root}>
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <FontIcon iconName="Upload" style={{ fontSize: '24px', color: '#000' }} />
        <span className={classNames.label}>Módulo de Upload manual de arquivo</span>

        <input type="file" id="file-input" accept={TiposArquivosPermitidos} onChange={OnChangeArquivo} style={{ display: 'none' }} />
        {!arquivo && (
          <PrimaryButton onClick={() => document.getElementById('file-input')!.click()} iconProps={{ iconName: 'BulkUpload' }} style={{ width: '250px' }}>
            {VerificarSeExisteViagens() ? 'Escolha outro arquivo' : 'Escolha seu arquivo'}
          </PrimaryButton>
        )}
        {RenderTipoArquivo()}
        {VerificarSeExisteViagens() && RenderizarTabelaDeViagens()}
      </Stack>
    </Stack>
  );
};

export default styled<IUploadArquivoProps, IUploadArquivoStylesProps, IUploadArquivoStyles>(UploadArquivo, getStyles);
