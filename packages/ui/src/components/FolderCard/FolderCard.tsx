import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardContent } from "@mui/material";
import { KeyboardEvent as ReactKeyboardEvent } from "react";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";
import { FolderBodyStyle, FolderIconStyle } from "./styles";

import { StyledCard, SelectedIcon } from "../ResourceCard/style";
import { subtitleTypographyProps, titleTypographyProps } from "./types";

export type FolderCardProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  title: string;
  subtitle?: string;
  width?: string;
  onClick?: () => void;
};

const FolderCard: React.FunctionComponent<FolderCardProps> = ({
  isSelected = false,
  onSelect = () => {},
  title,
  subtitle,
  width,
  onClick = () => {},
}) => {

  const handleKeyPress = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    return e.key === "Enter" || e.key === " "
  }

  return (
    <Box sx={{ width: width || "320px" }}>
      <StyledCard
        selected={isSelected}
        onClick={onClick}
        onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
          if (handleKeyPress(e)) {
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
            if (handleKeyPress(e)) {
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
              typographyProps={titleTypographyProps}
              tooltipProps={{ placement: "bottom", arrow: true }}
            >
              {title}
            </EllipsisWithTooltip>
            {subtitle && (
              <EllipsisWithTooltip
                typographyProps={subtitleTypographyProps}
                tooltipProps={{ placement: "bottom", arrow: true }}
              >
                {subtitle}
              </EllipsisWithTooltip>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default FolderCard;
