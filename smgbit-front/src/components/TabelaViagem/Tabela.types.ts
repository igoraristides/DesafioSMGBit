import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface ITabelaProps {
  styles?: IStyleFunctionOrObject<ITabelaStylesProps, ITabelaStyles>;
  theme?: ITheme;
  itens: any[];
  colunas: any[];
  titulo?: string;
  carregando?: boolean;
}

export type ITabelaStylesProps = Pick<ITabelaProps, 'theme'>;

export interface ITabelaStyles {
  root?: IStyle;
  labelTabela?: IStyle;
  filtro?: IStyle;
  tabelaB?: IStyle;
  imagem?: IStyle;
}
