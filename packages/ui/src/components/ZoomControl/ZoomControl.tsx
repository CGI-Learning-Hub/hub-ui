import { IconButton } from "@cgi-learning-hub/ui";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Box, BoxProps, Typography } from "@mui/material";
import { FC, useRef } from "react";

import {
  containerStyle,
  iconButtonStyle,
  iconStyle,
  labelStyle,
} from "./style";

interface ZoomControlProps {
  step?: number;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  label?: string;
  opacity?: number;
  slotProps?: {
    root?: BoxProps;
  };
}

const ZoomControl: FC<ZoomControlProps> = ({
  step = 10,
  value = 50,
  onChange,
  max = 100,
  min = 0,
  label = "Zoom",
  opacity = 1,
  slotProps = {},
}: ZoomControlProps) => {
  const isMinZoom = value === min;
  const isMaxZoom = value === max;
  const initialValue = useRef(value);

  const handleDecrease = () => onChange?.(Math.max(value - step, min));
  const handleIncrease = () => onChange?.(Math.min(value + step, max));
  const handleReset = () => onChange?.(initialValue.current);

  return (
    <Box sx={containerStyle({ opacity })} {...slotProps.root}>
      <IconButton
        onClick={handleDecrease}
        disabled={isMinZoom}
        sx={iconButtonStyle}
      >
        <RemoveRounded sx={iconStyle({ disabled: isMinZoom })} />
      </IconButton>
      <Typography onClick={handleReset} sx={labelStyle} component="button">
        {label}
      </Typography>
      <IconButton
        onClick={handleIncrease}
        disabled={isMaxZoom}
        sx={iconButtonStyle}
      >
        <AddRounded sx={iconStyle({ disabled: isMaxZoom })} />
      </IconButton>
    </Box>
  );
};

export default ZoomControl;
