import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IVisualizarProps {
  styles?: IStyleFunctionOrObject<IVisualizarStylesProps, IVisualizarStyles>;
  theme?: ITheme;
}

export type IVisualizarStylesProps = Pick<IVisualizarProps, 'theme'>;

export interface IVisualizarStyles {
  root?: IStyle;
  label?: IStyle;
  card?: IStyle;
}
