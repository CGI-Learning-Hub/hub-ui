import { CloseRounded, DownloadRounded } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, ListItem, ListItemButton, ListItemButtonProps, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";
import { FileIcon } from "./FileIcon";
import { FileInfosSeparator } from "./FileInfosSeparator";
import { displayExtension, displaySize } from "./utils";

export interface CustomFile {
  name: string;
  size: number; // size in octets
  isLoading?: boolean;
  isDeletable?: boolean;
  isDownloadable?: boolean;
  ownerName?: string;
}

export interface FileListItemProps<T extends CustomFile> {
  file: T;
  onDelete?: (file: T) => void;
  onClick?: (file: T) => void;
  onDownload?: (file: T) => void;
}

interface ClickableItemProps extends ListItemButtonProps {
  isClickable: boolean;
}

const ClickableItem = styled(ListItemButton)<ClickableItemProps>(({ isClickable }) => ({
  "&:hover": {
    boxShadow: isClickable ? "0 4px 8px rgba(192, 192, 192, 0.3)" : "none",
    backgroundColor: "transparent",
  },
  borderRadius: "4px",
  cursor: isClickable ? "pointer" : "default",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0.5rem 1rem",
  width: "100%",
  justifyContent: "space-between",
  boxSizing: "border-box",
  paddingRight: "115px !important",
}));


const FileListItem = <T extends CustomFile>({
  file,
  onDelete,
  onClick,
  onDownload,
}: FileListItemProps<T>) => {
  if (!file.name) return null;
  const displaySizeValue = displaySize(file.size);
  const displayExtensionValue = displayExtension(file.name);

  const handleClick = () => onClick?.(file);
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onDelete?.(file);
  };

  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onDownload?.(file);
  };

  return (
    <ListItem
    key={crypto.randomUUID()}
    secondaryAction={
      <Box alignItems="center" display="flex" gap="1rem">
        {file.isLoading ? (
          <Box marginRight={1}>
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : file.isDownloadable ? (
          <IconButton onClick={handleDownload}>
            <DownloadRounded color="primary" />
          </IconButton>
        ) : null}
        {file.isDeletable && (
          <IconButton onClick={handleDelete} id="coucou">
            <CloseRounded />
          </IconButton>
        )}
      </Box>
    }
    disablePadding 
    >
      <ClickableItem
        onClick={handleClick}
        isClickable={!!onClick}
      >
        <Stack direction="row" alignItems="center" spacing={2} minWidth="0">
          <Stack
            borderRadius="4px"
            minWidth="40px"
            maxWidth="40px"
            minHeight="40px"
            maxHeight="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "grey.light",
            }}
          >
            <Box
              color="text.secondary"
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <FileIcon extension={displayExtensionValue ?? ""} />
            </Box>
          </Stack>
          <Stack
            direction="column"
            spacing={0}
            alignItems="flex-start"
            minWidth="0"
          >
            <EllipsisWithTooltip>{file.name}</EllipsisWithTooltip>
            <Stack display="flex" flexDirection="row" alignItems="center" gap={1}>
              {displaySizeValue && (
                <Typography fontSize="0.8rem" color="text.secondary">
                  {displaySizeValue}
                </Typography>
              )}
              {displaySizeValue && displayExtensionValue && (
                <FileInfosSeparator />
              )}
              {displayExtensionValue && (
                <Typography fontSize="0.8rem" color="text.secondary">
                  {displayExtensionValue}
                </Typography>
              )}
              {file.ownerName && (displaySizeValue || displayExtensionValue) && (
                <FileInfosSeparator />
              )}
              {file.ownerName && (
                <Typography fontSize="0.8rem" color="text.secondary">
                  {file.ownerName}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </ClickableItem>
    </ListItem>
  );
};

export default FileListItem;
