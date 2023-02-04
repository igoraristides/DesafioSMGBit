import { IStyleFunction } from '@fluentui/react';
import { IUploadArquivoStyles, IUploadArquivoStylesProps } from './UploadArquivo.types';

export const getStyles: IStyleFunction<IUploadArquivoStylesProps, IUploadArquivoStyles> = (props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: '#fff',
  },

  imagens: {
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
