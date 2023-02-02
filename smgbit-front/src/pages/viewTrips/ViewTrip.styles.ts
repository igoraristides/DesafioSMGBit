import { IStyleFunction } from "@fluentui/react";
import { IViewTripStyles, IViewTripStylesProps } from "./ViewTrip.types";

export const GetStyles: IStyleFunction<
  IViewTripStylesProps,
  IViewTripStyles
> = (props) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
});
