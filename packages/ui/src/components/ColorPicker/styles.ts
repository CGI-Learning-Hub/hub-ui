import { Box, SxProps, styled } from "@mui/material";

import { PickerBackGroundBoxProps, StyledSwatchBoxProps } from "./types";

export const PickerBackgroundBox = styled(Box)<PickerBackGroundBoxProps>(
  ({ disabled }) => ({
    width: "4.4rem",
    height: "4.4rem",
    position: "relative",
    borderRadius: "50%",
    pointerEvents: disabled ? "none" : "auto",
    "&:hover, :focus, :focus-visible": {
      backgroundColor: disabled ? "transparent" : "#F8F9F9",
      outline: "none",
    },
  }),
);

export const circlePickerStyle: SxProps = {
  position: "absolute",
  bottom: "5rem",
  right: "-2rem",
  backgroundColor: "white",
  zIndex: 1000,
  padding: "1rem",
  borderRadius: "1rem",
  display: "flex",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
};

export const checkmarkSwatchBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  width: "15rem",
};

export const StyledSwatchBox = styled(Box)<StyledSwatchBoxProps>(
  ({ showBorder = false, backgroundColor }) => ({
    width: 20,
    height: 20,
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    backgroundColor: backgroundColor,
    boxSizing: "border-box",
    border: showBorder ? "1px solid var(--theme-palette-grey-dark)" : "none",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }),
);
