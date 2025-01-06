import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, ReactNode, useState } from 'react';
import {
  useDropzone,
  type DropzoneProps as ReactDropzoneProps,
} from "react-dropzone";

export type ImagePickerProps = {
  defaultLabel?: ReactNode;
  dragLabel?: ReactNode;
  information?: string;
  onFileChange?: (file: File | null) => void;
  width?: string;
  height?: string;
  initialFile?: string | File;
} & ReactDropzoneProps;

const ImagePickerDefaultLabel: FC = () => (
  <Typography textAlign="center" fontSize="14px" color='grey.darker'>
    <Box component="span" fontWeight="bold">Glissez-déposez</Box> ou <Box component="span" fontWeight="bold">cliquez</Box> pour choisir une image
  </Typography>
)

const ImagePickerDefaultDragLabel: FC = () => (
  <Typography textAlign="center" fontSize="14px" color='grey.darker'>
    <Box component="span" fontWeight="bold">Glissez</Box> une image
  </Typography>
)

const ImagePicker: React.FunctionComponent<ImagePickerProps> = ({
  defaultLabel = <ImagePickerDefaultLabel />,
  dragLabel = <ImagePickerDefaultDragLabel />,
  information,
  onFileChange = (file: File | null) => {},
  width = "160px",
  height = "160px",
  initialFile,
  ...otherProps
}) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0] || null;
    setCurrentFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentFile(null);
    onFileChange(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    open();
  }

  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    ...otherProps,
    maxFiles: 1, 
    onDropAccepted: handleDrop, 
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    },
    noClick: true,
  });

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={width}
      minWidth="150px"
      minHeight="150px"
      height={height}
      borderRadius={1}
      sx={{
        cursor: "pointer",
        position: "relative",
        background: `${!currentFile && !initialFile && "linear-gradient(180deg, #F5F7F9 0%, #FFF 100%)"}`,
        border: `${!currentFile && !initialFile && "1px dashed"}`,
        borderColor: (theme) => !currentFile && !initialFile && theme.palette.grey.main,
      }}
      {...getRootProps({
        onClick: open
      })}
    >
      <input {...getInputProps()} />
      {!currentFile && !initialFile ? (
        <>
          {isDragActive ? (
            <>
              <AddPhotoAlternateIcon color="primary" style={{
                width: "2.5rem",
                height: "2.5rem",
              }}/>
              {dragLabel}
              {information && (
                <Typography textAlign="center" fontSize="12px" color="grey">
                  {information}
                </Typography>
              )}
            </>
          ) : (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.5rem",
              gap: "0.3rem"
            }}>
              <AddPhotoAlternateIcon color="primary" style={{
                width: "2.5rem",
                height: "2.5rem",
              }}/>
              {defaultLabel}
              {information && (
                <Typography textAlign="center" fontSize="12px" color="grey">
                  {information}
                </Typography>
              )}
            </Box>
          )}
        </>
      ) : (
        <>
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
              onClick={handleEdit}
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
                '&:hover': {
                  backgroundColor: "grey.darker",
                  '& .MuiSvgIcon-root': {
                    fill: (theme) => theme.palette.common.white,
                  }
                }
              }}
            >
              <CreateIcon fontSize="small"/>
            </Box>
            <Box
              onClick={handleDelete}
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
                '&:hover': {
                  backgroundColor: "grey.darker",
                  '& .MuiSvgIcon-root': {
                    fill: (theme) => theme.palette.common.white,
                  }
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </Box>
          </Box>
          <img
            src={
              currentFile
                ? URL.createObjectURL(currentFile)
                : typeof initialFile === "string"
                ? initialFile
                : initialFile
                ? URL.createObjectURL(initialFile)
                : undefined
            }
            alt={
              currentFile
                ? currentFile.name
                : typeof initialFile === "string"
                ? "Image"
                : initialFile
                ? initialFile.name
                : "No image available"
            }
            style={{
              width: "auto",
              height: "100%",
              maxWidth: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </>
      )}
    </Stack>
  );
};

export default ImagePicker;
