import { classNamesFunction, FontIcon, IColumn, IconButton, Image, PrimaryButton, Spinner, SpinnerSize, Stack, styled } from '@fluentui/react';
import { getStyles } from './FileUpload.styles';
import { IFileType, IFileUploadProps, IFileUploadStyles, IFileUploadStylesProps } from './FileUpload.types';

import { useState } from 'react';
import { FileTypes, TiposArquivosPermitidos } from '../../Constants/constants';
import { toast } from 'react-toastify';
import { processarArquivo } from '../../api/api';
import { IResultado, IViagem } from '../../api/api.schema';
import Tabela from '../TabelaViagem/Tabela';
import { formatadorDeData } from '../../Utilidades/helpers';
import { AxiosError } from 'axios';

const getClassNames = classNamesFunction<IFileUploadStylesProps, IFileUploadStyles>();

const FileUpload: React.FC<IFileUploadProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [arquivoProcessado, setArquivoProcessado] = useState<IViagem[]>([]);

  console.log(arquivoProcessado);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (VerificarSeExisteViagens()) setArquivoProcessado([]);
    setFile(event.target.files?.[0] || null);
  };

  const enviarArquivo = () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append('arquivo', file);

    processarArquivo(formData)
      .then((result) => {
        setArquivoProcessado(result.data.resultado);
        toast.success('Arquivo Processado e salvo com sucesso.');
      })
      .catch((error: AxiosError<IResultado>) => toast.error(error.response?.data.erro))
      .finally(() => {
        setFile(null);
        setLoading(false);
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

  const OnRenderFileType = (): React.ReactNode => {
    if (file != null) {
      let fileExtension: string | undefined = file.name.split('.').at(-1);

      let fileType: IFileType | undefined = FileTypes.find((e) => e.filetype == fileExtension);

      if (fileType)
        return (
          <Stack className={classNames.images} style={{ width: '30%' }}>
            {loading ? (
              <Spinner label="Processando o arquivo enviado..." ariaLive="assertive" size={SpinnerSize.large} />
            ) : (
              <Stack>
                <span style={{ marginBottom: '15px' }}>Arquivo selecionado:</span>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center" style={{ width: '100%' }}>
                  <Stack horizontal verticalAlign="center">
                    <Image src={fileType.fileImageName} alt="logo" width={60} height={70} />
                    <span style={{ marginLeft: '20px' }}>{file.name}</span>
                  </Stack>
                  <Stack horizontal>
                    <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setFile(null)} />
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

        <input type="file" id="file-input" accept={TiposArquivosPermitidos} onChange={handleFileChange} style={{ display: 'none' }} />
        {!file && (
          <PrimaryButton onClick={() => document.getElementById('file-input')!.click()} iconProps={{ iconName: 'BulkUpload' }} style={{ width: '250px' }}>
            {VerificarSeExisteViagens() ? 'Escolha outro arquivo' : 'Escolha seu arquivo'}
          </PrimaryButton>
        )}
        {OnRenderFileType()}
        {VerificarSeExisteViagens() && RenderizarTabelaDeViagens()}
      </Stack>
    </Stack>
  );
};

export default styled<IFileUploadProps, IFileUploadStylesProps, IFileUploadStyles>(FileUpload, getStyles);
