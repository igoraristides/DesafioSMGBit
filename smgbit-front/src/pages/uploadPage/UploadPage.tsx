import { classNamesFunction, Stack, styled } from "@fluentui/react";
import { getStyles } from "./UploadPage.styles";
import {
  IUploadPageProps,
  IUploadPageStyles,
  IUploadPageStylesProps,
} from "./UploadPage.types";

import FileUpload from "../../components/FileUpload/FileUpload";

const getClassNames = classNamesFunction<
  IUploadPageStylesProps,
  IUploadPageStyles
>();

const UploadPage: React.FC<IUploadPageProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  return (
    <Stack horizontal className={classNames.root}>
      <FileUpload />
    </Stack>
  );
};

export default styled<
  IUploadPageProps,
  IUploadPageStylesProps,
  IUploadPageStyles
>(UploadPage, getStyles);
