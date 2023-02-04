import { classNamesFunction, FontIcon, IColumn, Stack, styled } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { consumirFretes } from '../../api/api';
import { IFrete, IResultado, IViagem } from '../../api/api.schema';
import Tabela from '../../components/TabelaViagem/Tabela';
import { formatadorDeData } from '../../utils/helpers';
import { getStyles } from './Frete.styles';

import { IFreteProps, IFreteStyles, IFreteStylesProps } from './Frete.types';

const getClassNames = classNamesFunction<IFreteStylesProps, IFreteStyles>();

const Frete: React.FC<IFreteProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const [frete, setFrete] = useState<IFrete[]>([]);

  const [carregando, setCarregando] = useState<boolean>(false);

  const ConsumirFretes = () => {
    setCarregando(true);

    consumirFretes()
      .then((result) => setFrete(result.data))
      .finally(() => {
        setCarregando(false);
      });
  };

  useEffect(() => ConsumirFretes(), []);

  const colunas: IColumn[] = [
    { key: 'cliente', name: 'Cliente', fieldName: 'cliente', minWidth: 130 },
    { key: 'tipoVeiculo', name: 'Tipo de veículo  ', fieldName: 'tipoVeiculo', minWidth: 130 },
    {
      key: 'destino',
      name: 'Destino',
      fieldName: 'destino',
      minWidth: 130,
      onRender: (item: IFrete) => {
        if (item.destino) return <span>{item.destino}</span>;
        else {
          return <FontIcon iconName="Blocked" style={{ fontSize: '16px', color: '#000' }} />;
        }
      },
    },
    {
      key: 'valor',
      name: 'Valor do Frete',
      fieldName: 'valor',
      minWidth: 130,
      onRender: (item: IFrete) => {
        return `R$ ${item.valor},00`;
      },
    },
  ];

  return (
    <Stack className={classNames.root}>
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <FontIcon iconName="Money" style={{ fontSize: '24px', color: '#000' }} />
        <span className={classNames.label}>Frete</span>
        <Stack className={classNames.card}>
          <Tabela itens={frete} colunas={colunas} carregando={carregando} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default styled<IFreteProps, IFreteStylesProps, IFreteStyles>(Frete, getStyles);
