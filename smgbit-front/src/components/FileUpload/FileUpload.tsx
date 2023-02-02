import {
  classNamesFunction,
  DefaultButton,
  FontIcon,
  IconButton,
  Image,
  Label,
  PrimaryButton,
  Stack,
  styled,
  TooltipHost,
} from "@fluentui/react";
import { getStyles } from "./FileUpload.styles";
import {
  IFileType,
  IFileUploadProps,
  IFileUploadStyles,
  IFileUploadStylesProps,
} from "./FileUpload.types";

import { useState } from "react";
import { FileTypes } from "../../Constants/constants";
import { useId } from "@fluentui/react-hooks";

const getClassNames = classNamesFunction<
  IFileUploadStylesProps,
  IFileUploadStyles
>();

const FileUpload: React.FC<IFileUploadProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const tooltipId = useId("tooltip");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const sendFile = () => {
    setLoading(true);
  };

  const OnRenderFileType = (): React.ReactNode => {
    if (file != null) {
      let fileExtension: string | undefined = file.name.split(".").at(-1);

      let fileType: IFileType | undefined = FileTypes.find(
        (e) => e.filetype == fileExtension
      );

      if (fileType)
        return (
          <Stack className={classNames.images}>
            <span style={{ marginBottom: "15px" }}>Arquivo selecionado:</span>
            <Stack
              horizontal
              horizontalAlign="space-between"
              verticalAlign="center"
              style={{ width: "100%" }}
            >
              <Stack horizontal verticalAlign="center">
                <Image
                  src={fileType.fileImageName}
                  alt="logo"
                  width={60}
                  height={70}
                />
                <span style={{ marginLeft: "20px" }}>{file.name}</span>
              </Stack>
              <Stack horizontal>
                <IconButton
                  iconProps={{ iconName: "Send" }}
                  onClick={() => setFile(null)}
                  id={tooltipId}
                />

                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => setFile(null)}
                />
              </Stack>
            </Stack>
          </Stack>
        );
    }
  };

  return (
    <Stack className={classNames.root}>
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <FontIcon
          iconName="Upload"
          style={{ fontSize: "24px", color: "#000" }}
        />
        <Label className={classNames.label}>
          Módulo de Upload de arquivo manual
        </Label>

        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <PrimaryButton
          onClick={() => document.getElementById("file-input")!.click()}
          iconProps={{ iconName: "BulkUpload" }}
          style={{ width: "250px" }}
        >
          Escolha seu arquivo
        </PrimaryButton>
        {OnRenderFileType()}
      </Stack>
    </Stack>
  );
};

export default styled<
  IFileUploadProps,
  IFileUploadStylesProps,
  IFileUploadStyles
>(FileUpload, getStyles);
