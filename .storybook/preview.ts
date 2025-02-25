// .storybook/preview.ts
// Load Roboto fonts
import "@fontsource/material-icons";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import {
  campusMuiTheme,
  cd16MuiTheme,
  cd77MuiTheme,
  crnaMuiTheme,
  crnoMuiTheme,
  defaultMuiTheme,
  hdfMuiTheme,
  imtMuiTheme,
  vdpMuiTheme,
} from "../packages/theme/src/themes";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      campus: campusMuiTheme,
      cd16: cd16MuiTheme,
      cd77: cd77MuiTheme,
      crna: crnaMuiTheme,
      crno: crnoMuiTheme,
      default: defaultMuiTheme,
      hdf: hdfMuiTheme,
      imt: imtMuiTheme,
      vdp: vdpMuiTheme,
    },
    defaultTheme: "default",
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];
