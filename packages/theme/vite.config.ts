import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CGILearningHubTheme",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
    },
    rollupOptions: {
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
