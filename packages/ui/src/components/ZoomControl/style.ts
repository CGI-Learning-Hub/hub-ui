import { SxProps, Theme } from "@mui/material";

const GREY = "rgba(238, 238, 238, 0.75)";
const LIGHT_GREY = "#D6D6D6";
const WHITE = "#FFFFFF";

interface ContainerStyle {
  opacity: number;
}

interface IconStyle {
  disabled: boolean;
}

export const containerStyle = ({
  opacity,
}: ContainerStyle): SxProps<Theme> => ({
  backgroundColor: GREY,
  color: WHITE,
  borderRadius: "1.6rem",
  padding: "0.8rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "5.8rem",
  width: "auto",
  zIndex: 2,
  opacity,
  backdropFilter: "blur(9px)",
  bottom: "3rem",
  position: "fixed",
});

export const iconButtonStyle: SxProps<Theme> = {
  color: "inherit",
  width: "4.4rem",
  height: "4.4rem",
  padding: "0.1em",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&.Mui-disabled": {
    color: LIGHT_GREY,
  },
};

export const iconStyle = ({ disabled }: IconStyle): SxProps<Theme> => ({
  fontSize: "3rem",
  color: disabled ? "inherit" : "#00000099",
});

export const lineStyle: SxProps<Theme> = {
  width: "4rem",
  height: "1px",
  backgroundColor: WHITE,
};

export const labelStyle: SxProps<Theme> = {
  margin: "0 0.75em",
  cursor: "pointer",
  border: "none",
  background: "none",
  color: "#00000099",
  font: "inherit",
  padding: 0,
  "&:hover": {
    opacity: 0.8,
  },
};
