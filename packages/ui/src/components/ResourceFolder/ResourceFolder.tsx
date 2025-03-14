import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardContent } from "@mui/material";
import { KeyboardEvent as ReactKeyboardEvent } from "react";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";
import {
  FolderBodyStyle,
  FolderIconStyle,
  SelectedIcon,
  StyledFolder,
} from "./styles";

export type ResourceFolderProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  title: string;
  subtitle: string;
  width?: string;
  onClick?: () => void;
};

const ResourceFolder: React.FunctionComponent<ResourceFolderProps> = ({
  isSelected = false,
  onSelect = () => {},
  title,
  subtitle,
  width,
  onClick = () => {},
}) => {
  return (
    <Box sx={{ width: width || "320px" }}>
      <StyledFolder
        selected={isSelected}
        onClick={onClick}
        onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-labelledby="folder-title folder-subtitle"
        aria-pressed={isSelected}
      >
        <SelectedIcon
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onSelect();
            }
          }}
          className="selected-icon"
          selected={isSelected}
          role="button"
          tabIndex={0}
          aria-label={isSelected ? "Unselect folder" : "Select folder"}
          aria-pressed={isSelected}
        >
          <MoreVertIcon />
        </SelectedIcon>
        <CardContent sx={FolderBodyStyle}>
          <FolderIcon color="primary" sx={FolderIconStyle} aria-hidden="true" />
          <Box>
            <EllipsisWithTooltip
              typographyProps={{
                fontWeight: "700",
                fontSize: "1.1rem",
                id: "folder-title",
              }}
              tooltipProps={{ placement: "bottom", arrow: true }}
            >
              {title}
            </EllipsisWithTooltip>
            <EllipsisWithTooltip
              typographyProps={{
                fontWeight: "400",
                fontSize: ".8rem",
                fontStyle: "italic",
                id: "folder-subtitle",
              }}
              tooltipProps={{ placement: "bottom", arrow: true }}
            >
              {subtitle}
            </EllipsisWithTooltip>
          </Box>
        </CardContent>
      </StyledFolder>
    </Box>
  );
};

export default ResourceFolder;
