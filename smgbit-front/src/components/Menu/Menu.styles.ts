import { INavStyles, IStyleFunction } from '@fluentui/react';
import { IMenuStyles, IMenuStylesProps } from './Menu.types';

export const getStyles: IStyleFunction<IMenuStylesProps, IMenuStyles> = (props) => ({
  root: {
    width: 210,
    boxSizing: 'border-box',
    overflowY: 'auto',
    marginTop: '20px',
  },
  logo: {
    paddingTop: '20px',
  },
});
