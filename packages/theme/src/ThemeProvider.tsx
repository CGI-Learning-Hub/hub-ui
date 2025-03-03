import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { PropsWithChildren } from "react";

import { getMuiTheme } from "./mui";
import {
  campusTheme,
  cd77MuiOptions,
  cd77Theme,
  crnaMuiOptions,
  crnaTheme,
  defaultTheme,
  entDefaultMuiOptions,
  entDefaultTheme,
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
    case "cd77":
      return getMuiTheme(
        cd77Theme,
        options ? deepmerge(cd77MuiOptions, options) : cd77MuiOptions,
      );
    case "crna":
      return getMuiTheme(
        crnaTheme,
        options ? deepmerge(crnaMuiOptions, options) : crnaMuiOptions,
      );
    case "ent-default":
      return getMuiTheme(
        entDefaultTheme,
        options
          ? deepmerge(entDefaultMuiOptions, options)
          : entDefaultMuiOptions,
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
        themeId: "campus" | "cd77" | "crna" | "default" | "ent-default" | "imt";
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
