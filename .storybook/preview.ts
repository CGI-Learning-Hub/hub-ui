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
  ent1DMuiTheme,
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
      ent1D: ent1DMuiTheme,
    },
    defaultTheme: "default",
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const tags = ["autodocs"];
