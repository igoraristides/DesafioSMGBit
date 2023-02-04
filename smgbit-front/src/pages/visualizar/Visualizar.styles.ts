import { IStyleFunction } from '@fluentui/react';
import { IVisualizarStyles, IVisualizarStylesProps } from './Visualizar.types';

export const getStyles: IStyleFunction<IVisualizarStylesProps, IVisualizarStyles> = (props) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '20px',
    marginBottom: '30px',
    color: '#000',
  },
  card: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginTop: 50,
    width: '100%',
    padding: '10',
  },
});
