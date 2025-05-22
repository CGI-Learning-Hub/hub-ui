import { Box, SxProps, styled } from "@mui/material";

import { PickerBackGroundBoxProps } from "./types";

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
