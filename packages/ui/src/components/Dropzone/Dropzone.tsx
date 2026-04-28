import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import {
  type DropzoneProps as ReactDropzoneProps,
  useDropzone,
} from "react-dropzone";

import { StyledStack } from "./styles";
import type { DropZoneSlotProps } from "./types";

export type DropzoneProps = {
  defaultLabel?: string;
  dragLabel?: string;
  information?: string;
  width?: string;
  height?: string;
  slotProps?: DropZoneSlotProps;
} & ReactDropzoneProps;

const Dropzone: FC<DropzoneProps> = ({
  defaultLabel = "Glisser et déposer des fichiers ici, ou cliquer pour sélectionner des fichiers",
  dragLabel = "Déposer les fichiers ici",
  information,
  width = "18rem",
  height = "auto",
  slotProps = {},
  ...otherProps
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(otherProps);

  return (
    <StyledStack
      direction="column"
      spacing={1}
      sx={{
        width,
        height,
        ...slotProps.root?.sx,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} {...slotProps.input} />
      {isDragActive ? (
        <>
          <FileUploadRoundedIcon color="primary" {...slotProps.icon} />
          <Typography {...slotProps.label}>{dragLabel}</Typography>
        </>
      ) : (
        <>
          <UploadFileRoundedIcon color="primary" {...slotProps.icon} />
          <Typography {...slotProps.label}>{defaultLabel}</Typography>
          {information ? (
            <Typography
              variant="body2"
              color="textSecondary"
              {...slotProps.information}
            >
              {information}
            </Typography>
          ) : null}
        </>
      )}
    </StyledStack>
  );
};

export default Dropzone;
