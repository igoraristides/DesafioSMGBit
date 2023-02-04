import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IUploadProps {
  styles?: IStyleFunctionOrObject<IUploadStylesProps, IUploadStyles>;
  theme?: ITheme;
}

export type IUploadStylesProps = Pick<IUploadProps, 'theme'>;

export interface IUploadStyles {
  root?: IStyle;
}
