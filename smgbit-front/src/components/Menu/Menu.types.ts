import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IMenuProps {
  styles?: IStyleFunctionOrObject<IMenuStylesProps, IMenuStyles>;
  theme?: ITheme;
}

export type IMenuStylesProps = Pick<IMenuProps, 'theme'>;

export interface IMenuStyles {
  root?: IStyle;
  logo?: IStyle;
}

export enum NavKeys {
  UPLOAD = 'upload',
  VISUALIZAR = 'visualizar',
  FRETE = 'fretes',
}
