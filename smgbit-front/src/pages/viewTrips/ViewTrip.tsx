import { classNamesFunction, FontIcon, IColumn, Stack, styled } from '@fluentui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { consumirViagensProcessadas } from '../../api/api';
import { IResultado, IViagem } from '../../api/api.schema';
import Tabela from '../../components/TabelaViagem/Tabela';
import { formatadorDeData } from '../../Utilidades/helpers';
import { getStyles } from './ViewTrip.styles';
import { IViewTripProps, IViewTripStyles, IViewTripStylesProps } from './ViewTrip.types';

const getClassNames = classNamesFunction<IViewTripStylesProps, IViewTripStyles>();

const ViewTrip: React.FC<IViewTripProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const [viagens, setViagens] = useState<IViagem[]>([]);

  const [carregando, setCarregando] = useState<boolean>(false);

  const ConsumirViagens = () => {
    setCarregando(true);

    consumirViagensProcessadas()
      .then((result) => setViagens(result.data.resultado))
      .catch((error: AxiosError<IResultado>) => toast.error(error.response?.data.erro))
      .finally(() => {
        setCarregando(false);
      });
  };

  useEffect(() => ConsumirViagens(), []);

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

  return (
    <Stack className={classNames.root}>
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <FontIcon iconName="DeliveryTruck" style={{ fontSize: '24px', color: '#000' }} />
        <span className={classNames.label}>Viagens</span>
        <Stack style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 50, width: '100%', padding: '10' }}>
          <Tabela itens={viagens} colunas={colunas} carregando={carregando} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default styled<IViewTripProps, IViewTripStylesProps, IViewTripStyles>(ViewTrip, getStyles);
