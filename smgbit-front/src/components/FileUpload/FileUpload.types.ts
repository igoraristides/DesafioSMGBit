import { IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";

export interface IFileUploadProps {
  styles?: IStyleFunctionOrObject<IFileUploadStylesProps, IFileUploadStyles>;
  theme?: ITheme;
}

export type IFileUploadStylesProps = Pick<IFileUploadProps, "theme">;

export interface IFileUploadStyles {
  root?: IStyle;
  images?: IStyle;
  label?: IStyle;
}

export interface IFileType {
  filetype: string;
  fileImageName: string;
}
