import { deepmerge } from "@mui/utils";

import { getMuiTheme } from "../mui";
import type { CreateThemeOptions, Theme } from "../types";
import { campusMuiOptions, campusTheme } from "./campus";
import { cd77MuiOptions, cd77Theme } from "./cd77";
import { crnaMuiOptions, crnaTheme } from "./crna";
import { defaultTheme } from "./default";
import { ent1DMuiOptions, ent1DTheme } from "./ent-1d";
import { entDefaultMuiOptions, entDefaultTheme } from "./ent-default";
import { imtMuiOptions, imtTheme } from "./imt";

type ThemeEntry = {
  theme: Theme;
  muiOptions: CreateThemeOptions | null;
};

export const themes = {
  default: { theme: defaultTheme, muiOptions: null },
  campus: { theme: campusTheme, muiOptions: campusMuiOptions },
  cd77: { theme: cd77Theme, muiOptions: cd77MuiOptions },
  crna: { theme: crnaTheme, muiOptions: crnaMuiOptions },
  ent1D: { theme: ent1DTheme, muiOptions: ent1DMuiOptions },
  entDefault: { theme: entDefaultTheme, muiOptions: entDefaultMuiOptions },
  imt: { theme: imtTheme, muiOptions: imtMuiOptions },
} satisfies Record<string, ThemeEntry>;

export type ThemeId = keyof typeof themes;
export const DEFAULT_THEME_ID: ThemeId = "default";

export const getThemeById = (id: ThemeId, options?: CreateThemeOptions) => {
  const { theme, muiOptions } = themes[id];
  const merged =
    muiOptions && options
      ? deepmerge(muiOptions, options)
      : (muiOptions ?? options);
  return getMuiTheme(theme, merged);
};
