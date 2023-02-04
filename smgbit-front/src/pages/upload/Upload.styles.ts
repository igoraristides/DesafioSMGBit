import { IStyleFunction } from '@fluentui/react';
import { IUploadStyles, IUploadStylesProps } from './Upload.types';

export const getStyles: IStyleFunction<IUploadStylesProps, IUploadStyles> = (props) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
