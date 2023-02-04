import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IUploadPageProps {
  styles?: IStyleFunctionOrObject<IUploadPageStylesProps, IUploadPageStyles>;
  theme?: ITheme;
}

export type IUploadPageStylesProps = Pick<IUploadPageProps, 'theme'>;

export interface IUploadPageStyles {
  root?: IStyle;
}
