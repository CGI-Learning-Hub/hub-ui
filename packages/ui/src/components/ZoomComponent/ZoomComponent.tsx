import { IconButton } from "@cgi-learning-hub/ui";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Box, BoxProps, Typography } from "@mui/material";
import { FC } from "react";

import {
  containerStyle,
  iconButtonStyle,
  iconStyle,
  labelStyle,
} from "./style";

interface ZoomComponentProps {
  opacity?: number;
  zoomLevel: number;
  zoomMaxLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  label?: string;
  slotProps?: {
    boxStyle?: BoxProps;
  };
}

const ZoomComponent: FC<ZoomComponentProps> = ({
  opacity = 1,
  zoomLevel,
  zoomMaxLevel,
  zoomIn,
  zoomOut,
  resetZoom,
  label = "Zoom",
  slotProps = {},
}: ZoomComponentProps) => {
  const isMinZoom = zoomLevel === 0;
  const isMaxZoom = zoomLevel === zoomMaxLevel;

  return (
    <Box sx={containerStyle({ opacity })} {...slotProps.boxStyle}>
      <IconButton onClick={zoomOut} disabled={isMinZoom} sx={iconButtonStyle}>
        <RemoveRounded sx={iconStyle({ disabled: isMinZoom })} />
      </IconButton>
      <Typography onClick={resetZoom} sx={labelStyle} component="button">
        {label}
      </Typography>
      <IconButton onClick={zoomIn} disabled={isMaxZoom} sx={iconButtonStyle}>
        <AddRounded sx={iconStyle({ disabled: isMaxZoom })} />
      </IconButton>
    </Box>
  );
};

export default ZoomComponent;
