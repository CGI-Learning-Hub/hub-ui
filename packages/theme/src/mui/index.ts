import { frFR } from "@mui/material/locale";
import { createTheme, Theme as MuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { frFR as dateFrFR } from "@mui/x-date-pickers/locales";
import { CreateThemeOptions, Theme } from "../types";

export const getMuiTheme = (
  theme: Theme,
  options: CreateThemeOptions = {}
): MuiTheme =>
  createTheme(
    deepmerge(
      {
        cssVariables: {
          cssVarPrefix: "theme",
        },
        colorSchemes: {
          light: true,
          dark: false,
        },
        palette: {
          primary: {
            main: theme.palette.primary.regular,
            light: theme.palette.primary.light,
            lighter: theme.palette.primary.lighter,
            dark: theme.palette.primary.dark,
            darker: theme.palette.primary.darker,
            contrastText: theme.palette.primary.contrastText,
          },
          secondary: {
            main: theme.palette.secondary.regular,
            light: theme.palette.secondary.light,
            lighter: theme.palette.secondary.lighter,
            dark: theme.palette.secondary.dark,
            darker: theme.palette.secondary.darker,
            contrastText: theme.palette.secondary.contrastText,
          },
          error: {
            main: theme.palette.red.regular,
            light: theme.palette.red.light,
            dark: theme.palette.red.dark,
            contrastText: theme.palette.red.contrastText,
          },
          warning: {
            main: theme.palette.yellow.regular,
            light: theme.palette.yellow.light,
            dark: theme.palette.yellow.dark,
            contrastText: theme.palette.yellow.contrastText,
          },
          info: {
            main: theme.palette.blue.regular,
            light: theme.palette.blue.light,
            dark: theme.palette.blue.dark,
            contrastText: theme.palette.blue.contrastText,
          },
          success: {
            main: theme.palette.green.regular,
            light: theme.palette.green.light,
            dark: theme.palette.green.dark,
            contrastText: theme.palette.green.contrastText,
          },
          grey: {
            main: theme.palette.grey.regular,
            light: theme.palette.grey.light,
            lighter: theme.palette.grey.lighter,
            dark: theme.palette.grey.dark,
            darker: theme.palette.grey.darker,
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
                      "&:hover": {
                        backgroundColor: theme.palette.primary.regular,
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
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 10,
              },
            },
          },
          MuiDialogActions: {
            styleOverrides: {
              root: {
                padding: 24,
              },
              spacing: {
                "& > :nth-child(2)": {
                  marginLeft: 16,
                },
              },
            },
          },
          MuiDialogContent: {
            styleOverrides: {
              root: {
                paddingBottom: 0,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                fontFamily: "Roboto",
              },
            },
          },
          MuiDialogTitle: {
            styleOverrides: {
              root: {
                padding: 24,
                fontSize: "1.625rem",
                fontWeight: 700,
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                "&:-webkit-autofill": {
                  "-webkit-box-shadow": "0 0 0 100px var(--text-primary) inset",
                  "-webkit-text-fill-color": "var(--text-primary)",
                  "caret-color": "#000000",
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontSize: "1rem",
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "0.875rem",
              },
            },
          },
        },
        typography: {
          h1: {
            fontSize: "1.5rem",
          },
          h2: {
            fontSize: "1.25rem",
          },
          h3: {
            fontSize: "1rem",
          },
        },
        frFR,
        dateFrFR,
      },
      options
    )
  );
