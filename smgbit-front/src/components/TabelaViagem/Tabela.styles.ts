import { IStyleFunction } from '@fluentui/react';
import { ITabelaStyles, ITabelaStylesProps } from './Tabela.types';

export const getStyles: IStyleFunction<ITabelaStylesProps, ITabelaStyles> = (props) => ({
  root: {},

  tableLabel: {
    fontSize: '16px',
    marginTop: '30px',
    marginBottom: '30px',
    color: '#000',
  },
  filtro: {
    padding: '0 50px',
    width: '99%',
    marginBottom: '20px',
  },
  tabelaB: {
    maxHeight: 600,
  },
  imagem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
