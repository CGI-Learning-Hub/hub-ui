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
  cd16MuiOptions,
  cd16Theme,
  cd77MuiOptions,
  cd77Theme,
  crnaMuiOptions,
  crnaTheme,
  crnoMuiOptions,
  crnoTheme,
  defaultTheme,
  hdfMuiOptions,
  hdfTheme,
  imtMuiOptions,
  imtTheme,
  vdpMuiOptions,
  vdpTheme,
} from "./themes";
import { CreateThemeOptions, Theme } from "./types";

const expandTheme = (
  id: ThemeProviderProps["themeId"],
  options?: ThemeProviderProps["options"],
) => {
  switch (id) {
    case "campus":
      return getMuiTheme(campusTheme, options);
    case "cd16":
      return getMuiTheme(
        cd16Theme,
        options ? deepmerge(cd16MuiOptions, options) : cd16MuiOptions,
      );
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
    case "crno":
      return getMuiTheme(
        crnoTheme,
        options ? deepmerge(crnoMuiOptions, options) : crnoMuiOptions,
      );
    case "hdf":
      return getMuiTheme(
        hdfTheme,
        options ? deepmerge(hdfMuiOptions, options) : hdfMuiOptions
      );
    case "imt":
      return getMuiTheme(
        imtTheme,
        options ? deepmerge(imtMuiOptions, options) : imtMuiOptions,
      );
    case "vdp":
      return getMuiTheme(
        vdpTheme,
        options ? deepmerge(vdpMuiOptions, options) : vdpMuiOptions,
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
        themeId: "campus" | "cd16" | "cd77" | "crna" | "crno" | "default" | "hdf" | "imt" | "vdp";
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
