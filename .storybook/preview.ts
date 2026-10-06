import "@fontsource/material-icons";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { ThemeId, getThemeById, themes } from "../packages/theme/src/themes";
import "../packages/ui/src/tiptap/styles/index.scss";
import "./global.css";

const themeIds = Object.keys(themes) as ThemeId[];
export const decorators = [
  withThemeFromJSXProvider({
    themes: Object.fromEntries(themeIds.map((id) => [id, getThemeById(id)])),
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
