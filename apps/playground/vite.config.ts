import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  // DEVELOPMENT: Uncomment for live reload with workspace packages
  // PRODUCTION: Comment out to test built packages
  resolve: {
    alias: {
      "@cgi-learning-hub/icons": resolve(__dirname, "../../packages/icons/src/index.ts"),
      "@cgi-learning-hub/theme": resolve(__dirname, "../../packages/theme/src/index.ts"),
      "@cgi-learning-hub/ui": resolve(__dirname, "../../packages/ui/src/index.ts"),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
  },
});
