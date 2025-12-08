import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import type { ComponentType } from "react";

export const StyledLoaderBackdropInner: ComponentType<BoxProps> = styled(Box)({
  textAlign: "center",
  "& label": {
    fontSize: 20,
    opacity: 0,
    display: "inline-block",
    "&:nth-of-type(4)": {
      animation: "dotSlide 3s 200ms infinite ease-in-out",
    },
    "&:nth-of-type(3)": {
      animation: "dotSlide 3s 300ms infinite ease-in-out",
    },
    "&:nth-of-type(2)": {
      animation: "dotSlide 3s 400ms infinite ease-in-out",
    },
    "&:nth-of-type(1)": {
      animation: "dotSlide 3s 500ms infinite ease-in-out",
    },
  },
  "@keyframes dotSlide": {
    "0%": { opacity: 0, transform: "translateX(-300px)" },
    "33%": { opacity: 1, transform: "translateX(0px)" },
    "66%": { opacity: 1, transform: "translateX(0px)" },
    "100%": { opacity: 0, transform: "translateX(300px)" },
  },
});
