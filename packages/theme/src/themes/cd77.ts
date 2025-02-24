import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#012348",
      dark: "#00346C",
      regular: "#004998",
      light: "#68A1DF",
      lighter: "#E3F1FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#015C7C",
      dark: "#0081AE",
      regular: "#00ACE9",
      light: "#88E0FF",
      lighter: "#E1F7FF",
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
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 24,
          fontSize: "1.625rem",
          fontWeight: 700,
        },
      },
    },
  },
};

const muiTheme = getMuiTheme(theme, muiOptions);

const tailwindThemeConfig = getTailwindThemeConfig(theme);

export {
  muiOptions as cd77MuiOptions,
  muiTheme as cd77MuiTheme,
  tailwindThemeConfig as cd77TailwindThemeConfig,
  theme as cd77Theme
};

