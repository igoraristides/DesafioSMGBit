import { IStyleFunction } from '@fluentui/react';
import { IFreteStyles, IFreteStylesProps } from './Frete.types';

export const getStyles: IStyleFunction<IFreteStylesProps, IFreteStyles> = (props) => ({
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
});
