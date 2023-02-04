import { classNamesFunction, Stack, styled } from '@fluentui/react';
import { getStyles } from './Upload.styles';
import { IUploadProps, IUploadStyles, IUploadStylesProps } from './Upload.types';

import UploadArquivo from '../../components/UploadArquivo/UploadArquivo';

const getClassNames = classNamesFunction<IUploadStylesProps, IUploadStyles>();

const Upload: React.FC<IUploadProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  return (
    <Stack horizontal className={classNames.root}>
      <UploadArquivo />
    </Stack>
  );
};

export default styled<IUploadProps, IUploadStylesProps, IUploadStyles>(Upload, getStyles);
