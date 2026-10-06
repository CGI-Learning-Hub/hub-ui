import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { themes } from "../src/themes/index.ts";

const suffix = (s: string) =>
  s === "regular" ? "" : `-${s === "contrastText" ? "contrast" : s}`;

// union of group/shade across all tenants → blocks stay aligned even if palettes differ
const keys = [
  ...new Set(
    Object.values(themes).flatMap((config) =>
      Object.entries(config.theme.palette).flatMap(([g, shades]) =>
        Object.keys(shades).map((s) => `${g}:${s}`),
      ),
    ),
  ),
].map((k) => k.split(":") as [string, string]);

const brand = (g: string, s: string) => `--brand-${g}${suffix(s)}`;
const color = (g: string, s: string) => `--color-${g}${suffix(s)}`;

const block = (sel: string, palette: any) =>
  `${sel} {\n` +
  keys
    .map(([g, s]) => `  ${brand(g, s)}: ${palette[g]?.[s] ?? "inherit"};`)
    .join("\n") +
  `\n}`;

const blocks = Object.entries(themes).map(([tenant, config], index) =>
  block(
    index === 0
      ? `:root,\n[data-tenant="${tenant}"]`
      : `[data-tenant="${tenant}"]`,
    config.theme.palette,
  ),
);

const themeBlock =
  `@theme inline {\n` +
  keys.map(([g, s]) => `  ${color(g, s)}: var(${brand(g, s)});`).join("\n") +
  `\n}`;

mkdirSync(resolve("public"), { recursive: true });
writeFileSync(
  resolve("public/tailwind.css"),
  `/* AUTO-GENERATED — do not edit */\n\n${blocks.join("\n\n")}\n\n${themeBlock}\n`,
);
