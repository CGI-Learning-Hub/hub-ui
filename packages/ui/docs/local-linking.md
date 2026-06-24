# Linking `@cgi-learning-hub/ui` into a local app

When you want to iterate on `@cgi-learning-hub/ui` while testing it inside a separate app (e.g. a Next.js project), link it locally instead of installing a released version.

## 1. Add the dependency by path

Use `file:` (or `link:`) in the consuming project, pointing at the package folder. This assumes the repo sits next to your app as `hub-ui`:

```json
{
  "devDependencies": {
    "@cgi-learning-hub/ui": "file:../hub-ui/packages/ui"
  }
}
```

With `file:`, rebuild the library and reinstall in the consuming project to pick up changes. Run the library in watch mode here:

```sh
pnpm run watch:ui      # or: ./cli.sh watchUi
```

Then, in the consuming project, re-run install after each rebuild:

```sh
pnpm install           # or: pnpm install @cgi-learning-hub/ui
```

## 2. Next.js: `transpilePackages`

If the consumer is a Next.js app, list the linked package in `transpilePackages` so Next bundles the local source. Use the actual package name, not the scope:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@cgi-learning-hub/ui"],
};
```

> Required when bundling local source (this linking flow), or if the published build targets syntax newer than the app's browser targets. If the app only ever imports the prebuilt packages and builds cleanly, you can try dropping it.

## 3. Docker volumes (only if the consumer runs in Docker)

Mount this repo's package into the consumer container via its `docker-compose.yml`:

```yaml
services:
  app:
    volumes:
      - ./:/app
      - ../hub-ui/packages/ui:/hub-ui/packages/ui # path to your local ui package
```

If your Vite alias points at the mounted source, match the container path:

```ts
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@cgi-learning-hub/ui": path.resolve("/hub-ui/packages/ui/src/index.ts"),
    },
  },
});
```
