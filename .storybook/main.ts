import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    "../packages/icons/docs/**/*.mdx",
    "../packages/theme/docs/**/*.mdx",
    "../packages/theme/docs/**/*.stories.@(ts|tsx)",
    "../packages/ui/docs/**/*.stories.@(ts|tsx)",
    "../packages/ui/src/**/*.mdx",
    "../packages/ui/src/components/stories/*.stories.@(ts|tsx)",
  ],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [svgr()],
    });
  },
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      // @ts-ignore
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent ? /node_modules\/@mui/.test(prop.parent.fileName) : true,
    },
  },
  framework: {
    name: "@storybook/react-vite",
    options: { strictMode: false },
  },
  docs: {
    autodocs: true,
  },
};

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

export default config;
