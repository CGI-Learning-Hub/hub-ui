import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { PropsWithChildren } from "react";

import { getMuiTheme } from "./mui";
import {
  campusTheme,
  crnaMuiOptions,
  crnaTheme,
  defaultTheme,
  imtMuiOptions,
  imtTheme,
} from "./themes";
import { CreateThemeOptions, Theme } from "./types";

const expandTheme = (
  id: ThemeProviderProps["themeId"],
  options?: ThemeProviderProps["options"],
) => {
  switch (id) {
    case "campus":
      return getMuiTheme(campusTheme, options);
    case "crna":
      return getMuiTheme(
        crnaTheme,
        options ? deepmerge(crnaMuiOptions, options) : crnaMuiOptions,
      );
    case "imt":
      return getMuiTheme(
        imtTheme,
        options ? deepmerge(imtMuiOptions, options) : imtMuiOptions,
      );
    case "default":
    default:
      return getMuiTheme(defaultTheme, options);
  }
};

export type ThemeProviderProps = PropsWithChildren<
  {
    defaultMode?: "light" | "dark" | "system";
    options?: CreateThemeOptions;
  } & (
    | {
        themeId: "campus" | "crna" | "default" | "imt";
        customTheme?: never;
      }
    | {
        themeId?: never;
        customTheme: Theme;
      }
  )
>;

export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  children,
  customTheme,
  defaultMode = "light",
  options,
  themeId,
}) => {
  const theme = themeId
    ? expandTheme(themeId, options)
    : getMuiTheme(customTheme, options);

  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode}>
      {children}
    </MuiThemeProvider>
  );
};
