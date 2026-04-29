import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      bundleTypes: true,
      exclude: ["src/**/*.stories.*", "src/**/*.test.*"],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CGILearningHubUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
    },
    rolldownOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        "react/jsx-runtime",
      ],
    },
    sourcemap: true,
    minify: false,
  },
});
