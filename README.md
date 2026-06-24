# CGI Learning Hub UI

React monorepo containing components, theme and icons libraries. It ships with a playground app for developing and trying the libraries locally.

## Packages

| Package | Description |
| --- | --- |
| `@cgi-learning-hub/ui` | Component library extending Material UI with additional components. |
| `@cgi-learning-hub/theme` | Multi-tenant theming: MUI themes plus per-tenant Tailwind config presets. |
| `@cgi-learning-hub/icons` | Shared icon set. |

## Documentation

Storybook for all the libraries is published at https://cgi-learning-hub.github.io/hub-ui/ — built automatically from the `dev` branch.

## Requirements

- **Node** 22.19+
- **pnpm** 10+
- **Docker** (optional) — only if you use the `cli.sh` workflow

## Getting started

You can run everything either directly with **pnpm** or through **Docker** using the `cli.sh` wrapper.

### With pnpm

```sh
pnpm install      # install the whole workspace
pnpm run dev      # start the playground on http://localhost:3000
```

### With Docker (cli.sh)

```sh
./cli.sh install  # install the whole workspace
./cli.sh dev      # start the playground on http://localhost:3000
```

### Command reference

| Task | pnpm | cli.sh |
| --- | --- | --- |
| Install workspace | `pnpm install` | `./cli.sh install` |
| Run playground | `pnpm run dev` | `./cli.sh dev` |
| Build all packages | `pnpm run build` | `./cli.sh build` |
| Build icons | `pnpm run build:icons` | `./cli.sh buildIcons` |
| Build theme | `pnpm run build:theme` | `./cli.sh buildTheme` |
| Build ui | `pnpm run build:ui` | `./cli.sh buildUi` |
| Watch icons | `pnpm run watch:icons` | `./cli.sh watchIcons` |
| Watch theme | `pnpm run watch:theme` | `./cli.sh watchTheme` |
| Watch ui | `pnpm run watch:ui` | `./cli.sh watchUi` |
| Storybook | `pnpm run storybook` | `./cli.sh storybook` |
| Clean | `pnpm clean` | `./cli.sh clean` |

## Playground & live reload

`apps/playground/vite.config.ts` controls how the playground resolves the libraries:

- **`resolve` alias enabled (default)** — the playground imports the libraries straight from their `src`, giving you live reload as you edit them.
- **`resolve` alias commented out** — the playground imports the built output instead. In that mode, build the packages first, then (re)start the playground:

```sh
pnpm run build && pnpm run dev
```

## Storybook

```sh
pnpm run storybook     # or: ./cli.sh storybook
```

Storybook runs on http://localhost:6006.

## Wiring the libraries into a consuming app

These notes help whoever integrates the libraries into a downstream project.

### Peer dependencies

The libraries are built on Material UI, so any consuming app must provide these peer dependencies:

```jsonc
{
  "@emotion/react": "^11",
  "@emotion/styled": "^11",
  "@mui/material": "^9"
}
```

### Unit tests (Jest)

If the consuming project uses Jest, mock Emotion's `styled` in your setup file:

```tsx
// jest.setup.tsx
jest.mock("@emotion/styled", () => {
  return (_: unknown) =>
    jest.fn((...args) => {
      return args;
    });
});
```

## Linking the library into a local app

To iterate on a library while testing it inside a separate app (local `file:`/`link:` linking, watch mode, Next.js `transpilePackages`, Docker volumes), see [packages/ui/docs/local-linking.md](packages/ui/docs/local-linking.md).
