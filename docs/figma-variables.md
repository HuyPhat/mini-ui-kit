# Figma Variables → tokens

Design tokens flow in one direction:

```
Figma Variables  →  tokens/*.json (W3C DTCG)  →  Style Dictionary  →  src/tokens/generated/*.css
     (design)            (source of truth)        pnpm tokens             (imported by tokens.css)
```

This guide shows how to create the Figma file so its export matches the JSON files in `tokens/`.
`tokens/*.json` in this repo were written by hand in the same format as a Figma export would give.

## 1. Create the Figma file

1. Sign in at figma.com and create a **Design file** (`+ New design file`). Name it `mini-ui-kit tokens`.
2. Open the **Local variables** panel: with nothing selected, click the **Local variables** icon in the right sidebar.

> **Plan limit (verify on Figma's pricing page):** the free plan allows only **one mode per collection**, so it cannot
> hold the three themes as modes of one collection. Either use a paid plan, or on the free plan create three
> collections `Semantic Light`, `Semantic Dark`, `Semantic Brand` (one mode each) with the same variable names.

## 2. Create the collections

Variable **names use `/` for groups**; the group path becomes the token path, which becomes the CSS variable name
(`blue/500` → `blue.500` → `--blue-500`). Do **not** add a `color/` prefix to primitives, or the CSS names change.

### Collection `Primitives` (1 mode: `Value`) — type **Color**

| Variable | Value | Variable | Value |
|---|---|---|---|
| `blue/300` | `#93c5fd` | `green/50` | `#f0fdf4` |
| `blue/500` | `#2563eb` | `green/100` | `#dcfce7` |
| `blue/600` | `#1d4ed8` | `green/200` | `#bbf7d0` |
| `red/400` | `#f87171` | `green/700` | `#15803d` |
| `red/600` | `#dc2626` | `green/800` | `#166534` |
| `gray/0` | `#ffffff` | `gray/300` | `#d1d5db` |
| `gray/100` | `#f3f4f6` | `gray/700` | `#374151` |
| `gray/800` | `#1f2937` | `gray/900` | `#111827` |

### Collection `Global` (1 mode: `Value`)

| Variable | Type | Value |
|---|---|---|
| `space/1`, `space/2`, `space/3`, `space/4`, `space/6` | Number | `4`, `8`, `12`, `16`, `24` |
| `radius/md` | Number | `8` |
| `font/size/sm`, `font/size/md`, `font/size/lg` | Number | `14`, `16`, `18` |
| `font/family` | String | `system-ui, sans-serif` |

### Collection `Semantic` — modes `Light`, `Dark`, `Brand` — type **Color**

Every value is an **alias** of a Primitive: click the value, choose the **Libraries / Local variables** tab, pick the variable.
Do not type hex values here, or the theme stops following the primitives.

| Variable | Light | Dark | Brand |
|---|---|---|---|
| `color/bg` | `gray/0` | `gray/900` | `green/50` |
| `color/surface` | `gray/100` | `gray/800` | `green/100` |
| `color/text` | `gray/900` | `gray/100` | `gray/900` |
| `color/border` | `gray/300` | `gray/700` | `green/200` |
| `color/primary` | `blue/500` | `blue/300` | `green/700` |
| `color/primary-hover` | `blue/600` | `gray/0` | `green/800` |
| `color/on-primary` | `gray/0` | `gray/900` | `gray/0` |
| `color/danger` | `red/600` | `red/400` | `red/600` |

Add a mode with the **+** next to the mode name in the collection header; every variable must have a value in every mode.

## 3. Export to JSON

I am not aware of a built-in Figma export that produces design-token JSON (check Figma's current release notes),
and the REST Variables API needs an Enterprise plan. Use a free plugin instead: `Plugins → Browse plugins in Community`, then search for a variables export plugin
that supports **W3C Design Tokens (DTCG)** and exporting **each mode separately**.

> I have not tested a specific plugin. Before relying on one, compare its output with `tokens/*.json`:
> keys must be `$value` / `$type`, aliases must look like `{gray.900}`, and numbers may need a unit (`"4px"`).
> If a plugin exports plain numbers, add a Style Dictionary `size/px` transform in `scripts/build-tokens.mjs`.

Save the exported files over these (the file names are what `scripts/build-tokens.mjs` reads):

| Figma collection / mode | File |
|---|---|
| `Primitives` | `tokens/primitives.json` |
| `Global` | `tokens/global.json` |
| `Semantic` / `Light` | `tokens/semantic.light.json` |
| `Semantic` / `Dark` | `tokens/semantic.dark.json` |
| `Semantic` / `Brand` | `tokens/semantic.brand.json` |

## 4. Generate the CSS

```bash
pnpm tokens
```

This rewrites `src/tokens/generated/{light,dark,brand}.css`. Commit the JSON and the generated CSS together.
Check the diff: only the variables you changed in Figma should differ.

## Adding another theme

1. Figma: add a mode to `Semantic` and fill in every variable.
2. Export it to `tokens/semantic.<name>.json`.
3. `scripts/build-tokens.mjs`: add an entry to `themes` with selector `[data-theme='<name>']`.
4. `src/tokens/tokens.css`: add `@import './generated/<name>.css';`.
5. `.storybook/preview.tsx`: add the theme to the toolbar items; `src/App.tsx`: add it to `themes`.
