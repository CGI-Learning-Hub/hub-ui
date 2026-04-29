import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CGILearningHubTheme",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
    },
    rolldownOptions: {
      external: [
        "@mui/utils",
        ...Object.keys(peerDependencies),
        "react/jsx-runtime",
      ],
    },
    sourcemap: true,
    minify: false,
  },
});
