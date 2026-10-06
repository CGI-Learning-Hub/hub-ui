import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#200A58",
      dark: "#3A2679",
      regular: "#5236AB",
      light: "#CBC3E6",
      lighter: "#F2F1F9",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#651A4A",
      dark: "#8F2464",
      regular: "#B42D7E",
      light: "#F0C7E2",
      lighter: "#FAF0F5",
      contrastText: "#FFFFFF",
    },
    grey: {
      darker: "#383D3E",
      dark: "#767676",
      regular: "#C0C0C0",
      light: "#F5F7F9",
      lighter: "#FCFCFC",
    },
    red: {
      dark: "#9B001B",
      regular: "#EB002B",
      light: "#FFD9E0",
      contrastText: "#FFFFFF",
    },
    blue: {
      dark: "#005887",
      regular: "#017ACD",
      light: "#D2EFFF",
      contrastText: "#FFFFFF",
    },
    green: {
      dark: "#1B5E20",
      regular: "#2E7D32",
      light: "#D0FFD2",
      contrastText: "#FFFFFF",
    },
    yellow: {
      dark: "#96710F",
      regular: "#FFC900",
      light: "#FFF7DA",
      contrastText: "#000000",
    },
  },
};

export { theme as defaultTheme };
