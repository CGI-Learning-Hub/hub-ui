import { alpha } from "@mui/material/styles";

import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#004754",
      dark: "#18819D",
      regular: "#00B8DE",
      light: "#D5F7FD",
      lighter: "#F3FCFE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#000919",
      dark: "#061126",
      regular: "#14223C",
      light: "#4F6EA6",
      lighter: "#A8C1F0",
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
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: theme.palette.secondary.regular,
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined", color: "primary" },
              style: {
                borderColor: alpha(theme.palette.secondary.regular, 0.5),
                color: theme.palette.secondary.regular,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.regular,
                  color: "white",
                },
              },
            },
            {
              props: { variant: "outlined", color: "secondary" },
              style: {
                "&:hover": {
                  backgroundColor: theme.palette.secondary.regular,
                  color: "white",
                },
              },
            },
            {
              props: { variant: "outlined", color: "error" },
              style: {
                "&:hover": {
                  backgroundColor: theme.palette.red.regular,
                  color: "white",
                },
              },
            },
          ],
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.regular,
          "&:hover": {
            color: theme.palette.primary.regular,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Roboto", "Arial", sans-serif',
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
  muiOptions as imtMuiOptions,
  muiTheme as imtMuiTheme,
  tailwindThemeConfig as imtTailwindThemeConfig,
  theme as imtTheme,
};
