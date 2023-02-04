import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IUploadArquivoProps {
  styles?: IStyleFunctionOrObject<IUploadArquivoStylesProps, IUploadArquivoStyles>;
  theme?: ITheme;
}

export type IUploadArquivoStylesProps = Pick<IUploadArquivoProps, 'theme'>;

export interface IUploadArquivoStyles {
  root?: IStyle;
  imagens?: IStyle;
  label?: IStyle;
}

export interface ITiposArquivos {
  tipoArquivo: string;
  pathTipoArquivo: string;
}
