import { classNamesFunction } from "@fluentui/react";
import {
  IViewTripProps,
  IViewTripStyles,
  IViewTripStylesProps,
} from "./ViewTrip.types";

const getClassNames = classNamesFunction<
  IViewTripStylesProps,
  IViewTripStyles
>();

export const ViewTrip: React.FC<IViewTripProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  return <div>oi</div>;
};
