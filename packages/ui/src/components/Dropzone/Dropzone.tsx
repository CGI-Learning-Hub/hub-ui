import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  type DropzoneProps as ReactDropzoneProps,
  useDropzone,
} from "react-dropzone";

export type DropzoneProps = {
  defaultLabel?: string;
  dragLabel?: string;
  information?: string;
} & ReactDropzoneProps;

const Dropzone: React.FunctionComponent<DropzoneProps> = ({
  defaultLabel = "Glisser et déposer des fichiers ici, ou cliquer pour sélectionner des fichiers",
  dragLabel = "Déposer les fichiers ici",
  information,
  ...otherProps
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(otherProps);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      width="18rem"
      padding={1}
      border="1px dashed"
      borderColor="grey.main"
      borderRadius={1}
      sx={{
        cursor: "pointer",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <FileUploadIcon color="primary" />
          <Typography>{dragLabel}</Typography>
        </>
      ) : (
        <>
          <UploadFileIcon color="primary" />
          <Typography>{defaultLabel}</Typography>
          {information ? (
            <Typography fontSize="0.875rem" color="grey">
              {information}
            </Typography>
          ) : null}
        </>
      )}
    </Stack>
  );
};

export default Dropzone;
