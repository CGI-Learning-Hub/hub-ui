import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  type FC,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { type DropzoneProps, useDropzone } from "react-dropzone";

import { StyledStack } from "./styles";

export type ImagePickerProps = {
  defaultLabel?: ReactNode;
  dragLabel?: ReactNode;
  information?: string;
  onFileChange?: (file: File | null) => void;
  width?: string;
  height?: string;
  initialFile?: string | File;
  disabled?: boolean;
} & DropzoneProps;

const ImagePickerDefaultLabel: FC = () => (
  <Typography variant="body2">
    <strong>Glissez-déposez</strong>
    {" ou "}
    <strong>cliquez</strong>
    {" pour choisir une image"}
  </Typography>
);

const ImagePickerDefaultDragLabel: FC = () => (
  <Typography variant="body2">
    <strong>Glissez</strong>
    {" une image"}
  </Typography>
);

const ImagePicker: FC<ImagePickerProps> = ({
  defaultLabel = <ImagePickerDefaultLabel />,
  dragLabel = <ImagePickerDefaultDragLabel />,
  information,
  onFileChange = () => {},
  width = "160px",
  height = "160px",
  initialFile = null,
  disabled = false,
  ...otherProps
}) => {
  const [currentFile, setCurrentFile] = useState<string | File | null>(
    initialFile,
  );

  useEffect(() => {
    setCurrentFile(initialFile);
  }, [initialFile]);

  const handleDrop = (acceptedFiles: File[]) => {
    if (disabled) return;
    const selectedFile = acceptedFiles[0] || null;
    setCurrentFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleClickDelete: MouseEventHandler<HTMLDivElement> = (event) => {
    if (disabled) return;
    event.stopPropagation();
    setCurrentFile(null);
    onFileChange(null);
  };

  const handleClickEdit: MouseEventHandler<HTMLDivElement> = (event) => {
    if (disabled) return;
    event.stopPropagation();
    open();
  };

  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDropAccepted: handleDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    },
    noClick: true,
    disabled,
    ...otherProps,
  });

  return (
    <StyledStack
      direction="column"
      disabled={disabled}
      hasFile={!!currentFile}
      width={width}
      height={height}
      {...getRootProps({
        onClick: disabled ? undefined : open,
      })}
    >
      <input {...getInputProps()} />
      {!currentFile ? (
        <Stack
          spacing="5px"
          sx={{
            alignItems: "center",
            padding: "0.5rem",
            textAlign: "center",
          }}
        >
          <AddPhotoAlternateRoundedIcon
            color="primary"
            sx={{ fontSize: "2.5rem" }}
          />
          {isDragActive && !disabled ? dragLabel : defaultLabel}
          {information ? (
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {information}
            </Typography>
          ) : null}
        </Stack>
      ) : (
        <>
          {!disabled && (
            <Box
              sx={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                display: "flex",
                gap: "0.3rem",
              }}
            >
              <Box
                onClick={handleClickEdit}
                sx={{
                  backgroundColor: "common.white",
                  display: "flex",
                  borderRadius: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "grey.darker",
                    "& .MuiSvgIcon-root": {
                      fill: (theme) => theme.palette.common.white,
                    },
                  },
                }}
              >
                <CreateRoundedIcon fontSize="small" />
              </Box>
              <Box
                onClick={handleClickDelete}
                sx={{
                  backgroundColor: "common.white",
                  display: "flex",
                  borderRadius: "3px",
                  alignItems: "center",
                  boxShadow: 1,
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "grey.darker",
                    "& .MuiSvgIcon-root": {
                      fill: (theme) => theme.palette.common.white,
                    },
                  },
                }}
              >
                <DeleteRoundedIcon fontSize="small" />
              </Box>
            </Box>
          )}
          <img
            src={
              typeof currentFile === "string"
                ? currentFile
                : URL.createObjectURL(currentFile)
            }
            alt={
              typeof currentFile === "string" ? currentFile : currentFile.name
            }
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </>
      )}
    </StyledStack>
  );
};

export default ImagePicker;
