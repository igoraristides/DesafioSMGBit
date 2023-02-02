import { IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";

export interface IViewTripProps {
  styles?: IStyleFunctionOrObject<IViewTripStylesProps, IViewTripStyles>;
  theme?: ITheme;
}

export type IViewTripStylesProps = Pick<IViewTripProps, "theme">;

export interface IViewTripStyles {
  root?: IStyle;
}
