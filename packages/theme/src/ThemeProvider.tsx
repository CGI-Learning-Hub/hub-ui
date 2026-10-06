import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";

import { getMuiTheme } from "./mui";
import { ThemeId, getThemeById } from "./themes";
import { CreateThemeOptions, Theme } from "./types";

export type ThemeProviderProps = PropsWithChildren<
  {
    defaultMode?: "light" | "dark" | "system";
    options?: CreateThemeOptions;
  } & (
    | {
        themeId: ThemeId;
        customTheme?: never;
      }
    | {
        themeId?: never;
        customTheme: Theme;
      }
  )
>;

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  customTheme,
  defaultMode = "light",
  options,
  themeId,
}) => {
  const theme = themeId
    ? getThemeById(themeId, options)
    : getMuiTheme(customTheme, options);

  return (
    <MuiThemeProvider theme={theme} defaultMode={defaultMode}>
      {children}
    </MuiThemeProvider>
  );
};
