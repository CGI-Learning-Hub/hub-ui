# CGI Learning Hub UI

React monorepo containing components, theme and icons libraries. It ships with a playground app for developing and trying the libraries locally.

## Packages

| Package | Description |
| --- | --- |
| `@cgi-learning-hub/ui` | Component library extending Material UI with additional components. |
| `@cgi-learning-hub/theme` | Multi-tenant theming: MUI themes plus a generated Tailwind v4 stylesheet (CSS variables per tenant). |
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

### Tailwind v4 (optional)

The `theme` package ships a generated `tailwind.css` exposing every tenant palette as CSS variables, so a Tailwind v4 app gets theme-aware utilities (`bg-primary`, `text-secondary-dark`, `bg-grey-light`, …) that reskin per tenant at runtime — one build, no per-tenant config.

Import it into your Tailwind entry CSS, after Tailwind itself:

```css
/* app.css */
@import "tailwindcss";
@import "@cgi-learning-hub/theme/fonts.css";
@import "@cgi-learning-hub/theme/tailwind.css";
```

Then set the active tenant on a parent element — usually `<html>`, decided server-side:

```html
<html data-tenant="campus">
```

Available tenants: `default`, `ent-default`, `campus`, `cd77`, `crna`, `ent1D`, `imt`. The `default` palette also applies to `:root`, so no attribute means default.

> **Preflight & MUI.** `@import "tailwindcss"` pulls in Tailwind's Preflight reset, which can clash with Material UI's resets. If you hit conflicts, import the layers without Preflight instead:
>
> ```css
> @layer theme, base, components, utilities;
> @import "tailwindcss/theme.css" layer(theme);
> @import "tailwindcss/utilities.css" layer(utilities);
> @import "@cgi-learning-hub/theme/fonts.css";
> @import "@cgi-learning-hub/theme/tailwind.css";
> ```

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
