import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IFreteProps {
  styles?: IStyleFunctionOrObject<IFreteStylesProps, IFreteStyles>;
  theme?: ITheme;
}

export type IFreteStylesProps = Pick<IFreteProps, 'theme'>;

export interface IFreteStyles {
  root?: IStyle;
  label?: IStyle;
  card?: IStyle;
}
