import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#9E4800",
      dark: "#DA6A0B",
      regular: "#FF8D2E",
      light: "#FFCBA0",
      lighter: "#FFEFE3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#9C0016",
      dark: "#C6253B",
      regular: "#E20037",
      light: "#FFADB9",
      lighter: "#FFECEE",
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

const muiTheme = getMuiTheme(theme);

const tailwindThemeConfig = getTailwindThemeConfig(theme);

export {
  muiTheme as crnaMuiTheme,
  tailwindThemeConfig as crnaTailwindThemeConfig,
  theme as crnaTheme,
};
