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
  cd77MuiTheme,
  crnaMuiTheme,
  defaultMuiTheme,
  entDefaultMuiTheme,
  imtMuiTheme,
} from "../packages/theme/src/themes";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      campus: campusMuiTheme,
      cd77: cd77MuiTheme,
      crna: crnaMuiTheme,
      default: defaultMuiTheme,
      entDefault: entDefaultMuiTheme,
      imt: imtMuiTheme,
    },
    defaultTheme: "default",
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];
