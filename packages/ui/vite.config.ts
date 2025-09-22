import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgr from "vite-plugin-svgr";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    libInjectCss(),
    dts({
      rollupTypes: true,
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
    rollupOptions: {
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
