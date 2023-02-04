import { IStyleFunction } from '@fluentui/react';
import { IUploadPageStyles, IUploadPageStylesProps } from './UploadPage.types';

export const getStyles: IStyleFunction<IUploadPageStylesProps, IUploadPageStyles> = (props) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
