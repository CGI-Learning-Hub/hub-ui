import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  type ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { MouseEventHandler } from "react";

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

interface StyledListItemButtonProps extends ListItemButtonProps {
  isClickable: boolean;
}

const StyledListItemButton = styled(ListItemButton)<StyledListItemButtonProps>(
  ({ isClickable }) => ({
    "&:hover": {
      boxShadow: isClickable ? "0 4px 8px rgba(192, 192, 192, 0.3)" : "none",
      backgroundColor: "transparent",
    },
    opacity: "1 !important",
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
    userSelect: "text",
  }),
);

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

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onDelete?.(file);
  };

  const handleDownload: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onDownload?.(file);
  };

  return (
    <ListItem
      key={crypto.randomUUID()}
      secondaryAction={
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center" }}
        >
          {file.isLoading ? (
            <CircularProgress size={24} color="primary" sx={{ mr: 1 }} />
          ) : file.isDownloadable ? (
            <IconButton onClick={handleDownload}>
              <DownloadRoundedIcon color="primary" />
            </IconButton>
          ) : null}
          {file.isDeletable && (
            <IconButton onClick={handleDelete}>
              <CloseRoundedIcon />
            </IconButton>
          )}
        </Stack>
      }
      disablePadding
    >
      <StyledListItemButton
        onClick={handleClick}
        isClickable={!!onClick}
        disableRipple={!onClick}
      >
        <ListItemIcon
          sx={{
            p: "8px",
            borderRadius: 1,
            backgroundColor: "grey.light",
          }}
        >
          <FileIcon extension={displayExtensionValue ?? ""} color="inherit" />
        </ListItemIcon>
        <ListItemText
          primary={
            <EllipsisWithTooltip slotProps={{ text: { variant: "body1" } }}>
              {file.name}
            </EllipsisWithTooltip>
          }
          secondary={
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {displaySizeValue && (
                <Typography variant="caption" color="textSecondary">
                  {displaySizeValue}
                </Typography>
              )}
              {displaySizeValue && displayExtensionValue && (
                <FileInfosSeparator />
              )}
              {displayExtensionValue && (
                <Typography variant="caption" color="textSecondary">
                  {displayExtensionValue}
                </Typography>
              )}
              {file.ownerName &&
                (displaySizeValue || displayExtensionValue) && (
                  <FileInfosSeparator />
                )}
              {file.ownerName && (
                <Typography variant="caption" color="textSecondary">
                  {file.ownerName}
                </Typography>
              )}
            </Stack>
          }
          sx={{ ml: 2, my: 0 }}
        />
      </StyledListItemButton>
    </ListItem>
  );
};

export default FileListItem;
