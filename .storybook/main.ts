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
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
  framework: {
    name: "@storybook/react-vite",
    options: { strictMode: false },
  },
};

export default config;
