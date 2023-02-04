import { IStyleFunction } from '@fluentui/react';
import { IViewTripStyles, IViewTripStylesProps } from './ViewTrip.types';

export const getStyles: IStyleFunction<IViewTripStylesProps, IViewTripStyles> = (props) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '20px',
    marginBottom: '30px',
    color: '#000',
  },
});
