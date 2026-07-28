import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { peerDependencies } from "./package.json";

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
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "tiptap/index": resolve(__dirname, "src/tiptap/index.ts"),
      },
      name: "CGILearningHubUI",
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "es" : "cjs"}.js`,
    },
    rolldownOptions: {
      external: [
        /^@mui\/material/,
        /^use-sync-external-store($|\/)/,
        ...Object.keys(peerDependencies),
        "react/jsx-runtime",
      ],
    },
    sourcemap: true,
    minify: false,
  },
});
