import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const resolve = {
  alias: {
    '@cgi-learning-hub/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts')
  }
}

const plugins = [react(), tsconfigPaths()];

const server = {
  host: "0.0.0.0",
  port: 3000,
  strictPort: true
};

export default defineConfig({
  // comments resolve to try your deps built but you need to build them first (see "pnpm -r run build")
  // resolve,
  plugins,
  server
});