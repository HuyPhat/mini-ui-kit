# Review follow-ups

Items from the code reviews that are **not yet fixed**. Last evaluated against `main` after PR #3.

## Done

- `App` sets the theme in `useEffect`; `Button` defaults to `type="button"`; prop-spread order in `Button`/`Input`/`Card`.
- `Button` loading: no `button-name` violation, and a hidden "Loading" text is part of the accessible name.
- Heading colour follows the theme; leftover Vite template CSS removed.
- `Button` hover for every variant and `:focus-visible` for every variant; `Input` `:focus-visible`, `:disabled` and `font-family`.
- `Card` `<section>` is labelled by its heading (`aria-labelledby`), checked in a story `play`.
- `vitest`, `@vitest/browser-playwright`, `@vitest/coverage-v8` (5.1.0), `playwright` (1.64.1) and
  `@chromatic-com/storybook` (5.6.0) are pinned. `pnpm test` exists and runs in CI.

Notes on decisions:
- A `<span role="status">` inside the button (the original suggestion) would be ignored: a button's children are
  presentational in ARIA. Loading is announced through the button's accessible name instead.
- A label style for `Input` was not added: the label inherits colour and font from its parent, only form controls do not.

## Should fix

- [ ] **Visual coverage of the dark and brand themes**: Chromatic only snapshots the default (light) theme, so token
  changes to `dark`/`brand` never show up in visual diffs. Chromatic "modes" can capture more themes (not tried here).
- [ ] **Accessibility checks on every theme**: the a11y panel was only checked on light, plus `Button` in brand.
  Check the other components in dark and brand (contrast of `--color-danger` on the brand background, etc.).
- [ ] **CI runs no type check or lint**: add `tsc -p tsconfig.app.json` (and `oxlint`, which already has a script) to the workflow.

## Worth considering

- [ ] **Dark hover colour** (`tokens/semantic.dark.json`): `color.primary-hover` is `{gray.0}` (white) against
  `color.primary` `{blue.300}`. It is a big jump in colour, but contrast is not a problem (`gray-900` text on white is about 17:1).
  Purely cosmetic; change it in Figma and the JSON together.
- [ ] **Button argTypes** (`Button.stories.ts`): `defaultValue` inside `argTypes` is ignored by Storybook 7+.
  Remove it. Also check whether `loading` needs an explicit control (not verified), and consider renaming
  the file to `.tsx` like the other two story files.
- [ ] **Publishing the kit** (`src/index.ts`, `package.json`): the barrel does not load `src/tokens/tokens.css`, so consumers
  get unstyled components unless they import it. There is no library build (`build.lib`, `exports`), and the package is
  `private`. Only worth doing if you plan to publish.
- [ ] **`@storybook/addon-mcp`** (`.storybook/main.ts`): exposes an MCP server from the dev server.
  Not needed for a plain UI kit unless you use it.
- [ ] **GitHub Action versions**: the workflow uses `@v4` of `checkout`, `pnpm/action-setup` and `setup-node`. Check whether
  a newer major exists.
- [ ] **Chromatic warning** seen in CI logs: "We will not be able to retain baselines from builds created by the Visual Tests
  addon." Not investigated; the builds pass.
- [ ] **Figma guide is untested** (`docs/figma-variables.md`): no export plugin was tried, and the claim that the free plan
  allows one mode per collection should be checked on Figma's pricing page.

## Demo app (`App.tsx`, `index.css`)

- [ ] The page has no `<h1>` now that the title is a `Card` with `headingLevel={3}`. Add an `h1` if the page should have one.
- [ ] The password field always shows a hard-coded error (intentional demo of the error state).
- [ ] Theme starts as light and ignores `prefers-color-scheme`.
- [ ] `#root` still has the template layout (1126px wide, centred text, side borders). Decide whether to keep it.
- [ ] `src/assets/` (`hero.png`, `react.svg`, `vite.svg`) are template images no file uses. Delete them.
- [ ] `vite.config.ts` uses `__dirname`; Vite warns to use `import.meta.dirname`.
