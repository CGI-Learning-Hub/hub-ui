import { ThemeOptions } from "@mui/material";
import { getMuiTheme } from "../mui";
import { getTailwindThemeConfig } from "../tailwind";
import { Theme } from "../types";

const theme: Theme = {
  palette: {
    primary: {
      darker: "#253F4D",
      dark: "#2F7EA7",
      regular: "#2A9CC8",
      light: "#B9E3F8",
      lighter: "#E5F5FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      darker: "#974E00",
      dark: "#DA6A0B",
      regular: "#FF8D2E",
      light: "#FFCBA0",
      lighter: "#FFEFE3",
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
    fontFamily: '"Arimo", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
      fontWeight: 700,
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
      fontWeight: 400,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
          fontSize: "22px",
          borderRadius: "12px",
          textTransform: "uppercase",
          transition: "transform 0.1s ease",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            "&:hover": {
              transform: "translateY(-0.2rem)",
              boxShadow: "0 0.2rem 0 0 var(--theme-palette-primary-dark)",
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            "&:hover": {
              transform: "translateY(-0.2rem)",
              boxShadow: "0 0.2rem 0 0 var(--theme-palette-primary-dark)",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            fontSize: "16px",
            borderRadius: "8px",
          },
        },
      ],
    },
    MuiActionBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          color: '#000000',
        },
        leftActionsContainer: {
          gap: '8px',
        },
        rightActionsContainer: {
          gap: '8px',
        },
        leftActions: {
          fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
          fontSize: "22px",
          borderRadius: "12px",
          textTransform: "uppercase",
        },
        rightActions: {
          fontFamily: '"KGJune", "Roboto", "Arial", sans-serif',
          fontSize: "22px",
          borderRadius: "12px",
          textTransform: "uppercase",
        },
      },
      defaultProps: {
        buttonVariant: "contained",
      },
    },
  }
} as ThemeOptions;

const muiTheme = getMuiTheme(theme, muiOptions);

const tailwindThemeConfig = getTailwindThemeConfig(theme);

export {
  muiOptions as ent1DMuiOptions,
  muiTheme as ent1DMuiTheme,
  tailwindThemeConfig as ent1DTailwindThemeConfig,
  theme as ent1DTheme,
};
