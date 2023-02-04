import { IStyleFunction } from '@fluentui/react';
import { IFileUploadStyles, IFileUploadStylesProps } from './FileUpload.types';

export const getStyles: IStyleFunction<IFileUploadStylesProps, IFileUploadStyles> = (props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    background: '#fff',
  },

  images: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    width: '100%',
  },
  label: {
    fontSize: '20px',
    marginBottom: '30px',
    color: '#000',
  },
});
