import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "",
      dark: "#DA6A0B",
      regular: "#FF8D2E",
      light: "#FFCBA0",
      lighter: "#FFEFE3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "",
      dark: "#2F7EA7",
      regular: "#2A9CC8",
      light: "#B9E3F8",
      lighter: "#E5F5FF",
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
    muiOptions as vdpMuiOptions,
    muiTheme as vdpMuiTheme,
    tailwindThemeConfig as vdpTailwindThemeConfig,
    theme as vdpTheme
};

