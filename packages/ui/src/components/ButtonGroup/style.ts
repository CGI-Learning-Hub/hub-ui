import { ToggleButton, ToggleButtonGroup, styled } from "@mui/material";

import { StyledToggleButtonGroupProps, StyledToggleButtonProps } from "./types";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => prop !== "colorvariant",
})<StyledToggleButtonGroupProps>(({ theme, colorvariant }) => ({
  borderColor:
    colorvariant === "primary"
      ? theme.palette.primary.light
      : theme.palette.secondary.light,
}));

export const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== "colorvariant",
})<StyledToggleButtonProps>(({ theme, colorvariant }) => {
  const mainColor =
    colorvariant === "primary"
      ? theme.palette.primary.main
      : theme.palette.secondary.main;
  const lighterColor =
    colorvariant === "primary"
      ? theme.palette.primary.light
      : theme.palette.secondary.light;

  return {
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      backgroundColor: mainColor,
      color: theme.palette.common.white,
    },
    "&:hover": {
      backgroundColor: lighterColor,
      color: theme.palette.text.secondary,
    },
    "&.Mui-selected:hover": {
      backgroundColor: mainColor,
      color: theme.palette.common.white,
    },
  };
});
