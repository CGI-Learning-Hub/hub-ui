import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import type { FC, KeyboardEvent } from "react";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";
import { SelectedIcon, StyledCard } from "../ResourceCard/style";
import {
  FolderBodyStyle,
  FolderIconStyle,
  IconContainerStyle,
  TextContainerStyle,
} from "./styles";
import { subtitleTypographyProps, titleTypographyProps } from "./types";

export type FolderCardProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  title: string;
  subtitle?: string;
  width?: string;
  onClick?: () => void;
  iconSize?: string;
  hasNoButtonOnFocus?: boolean;
};

const FolderCard: FC<FolderCardProps> = ({
  isSelected = false,
  onSelect = () => {},
  title,
  subtitle,
  width = "320px",
  onClick = () => {},
  iconSize = "2rem",
  hasNoButtonOnFocus = false,
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    return e.key === "Enter" || e.key === " ";
  };

  return (
    <Box sx={{ width: width }}>
      <StyledCard
        selected={isSelected}
        onClick={onClick}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
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
          hasNoButtonOnFocus={hasNoButtonOnFocus}
        >
          <MoreVertRoundedIcon />
        </SelectedIcon>
        <CardContent sx={FolderBodyStyle}>
          <Box fontSize={iconSize} sx={IconContainerStyle}>
            <FolderRoundedIcon
              color="primary"
              sx={FolderIconStyle}
              aria-hidden="true"
            />
          </Box>
          <Box sx={TextContainerStyle}>
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
