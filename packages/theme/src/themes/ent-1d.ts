import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#081F4A",
      dark: "#0E3174",
      regular: "#1344A1",
      light: "#CEE8FF",
      lighter: "#EEF6FD",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#5E2A2B",
      dark: "#C9191E",
      regular: "#E1000F",
      light: "#FCBFBF",
      lighter: "#FEE9E9",
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

const muiOptions = {
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
  },
};

const muiTheme = getMuiTheme(theme, muiOptions);

const tailwindThemeConfig = getTailwindThemeConfig(theme);

export {
  muiOptions as ent1DMuiOptions,
  muiTheme as ent1DMuiTheme,
  tailwindThemeConfig as ent1DTailwindThemeConfig,
  theme as ent1DTheme,
};
