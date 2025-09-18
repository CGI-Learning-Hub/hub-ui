import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const resolve = {
  alias: {
    "@cgi-learning-hub/ui": path.resolve(
      __dirname,
      "../../packages/ui/src/index.ts"
    ),
    "@cgi-learning-hub/theme": path.resolve(
      __dirname,
      "../../packages/theme/src/index.ts"
    ),
  },
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  // comments resolve to try your deps built but you need to build them first (see "pnpm -r run build")
  // resolve,
});
