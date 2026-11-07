# Review follow-ups

Items from the code reviews that are **not yet fixed** (as of PR #1, branch `feat/components-storybook`).
Already done: `App` theme effect, `Button` default `type="button"`, prop-spread order in `Button`/`Input`,
`Button` loading `button-name` a11y violation, heading colour in dark theme, leftover Vite template CSS.

## Should fix

- [ ] **Button hover / focus** (`Button.module.css`): only `.primary` has a hover state.
  Add hover for `.secondary` and `.danger`, and a `:focus-visible` outline for every variant.
- [ ] **Input styles** (`Input.module.css`): add `:focus-visible`, a `:disabled` style (the `Disabled`
  story currently looks identical to an enabled input), `font-family: var(--font-family)`
  (native inputs do not inherit the font), and a label style.
- [ ] **Loading announcement** (`Button.tsx`): a screen reader only hears the old label, and `aria-busy`
  on a disabled button is weakly supported. Add a visually hidden `<span role="status">` (e.g. "Loading")
  while `loading` is true.
- [ ] **Card landmark** (`Card.tsx`): `<section>` has no accessible name. Link it to its heading with
  `aria-labelledby` (use `useId`, as `Input` does).
- [ ] **Pin devDependencies** (`package.json`): `vitest`, `@vitest/browser-playwright` and
  `@vitest/coverage-v8` are `"latest"` while Storybook is pinned to `10.6.5`. Pin them to exact versions.
  (`@chromatic-com/storybook` is pinned to `5.6.0` and `playwright` to `1.64.1`: a floating `playwright`
  was bumped by `pnpm add` and no longer matched the installed browsers.)
- [ ] **`test` script** (`package.json`): the story `play` tests only run via `npx vitest run`.
  Add `"test": "vitest run"` so CI can run them.

## Worth considering

- [ ] **Export the tokens** (`src/index.ts`): components use `var(--color-*)` but nothing in the barrel
  loads `tokens/tokens.css`, so consumers get unstyled components unless they import it themselves.
  Also no library build config (`build.lib`, `exports` in `package.json`), so `vite build` makes an app bundle.
- [ ] **Dark hover colour** (`tokens.css`): in the dark theme `--color-primary-hover` is `--gray-0` (white)
  against `--color-primary` `--blue-300`. It is a jarring jump and may lose contrast with `--color-on-primary`.
- [ ] **Button argTypes** (`Button.stories.ts`): `defaultValue` inside `argTypes` is ignored by Storybook 7+.
  Remove it. Also check whether `loading` needs an explicit control (not verified), and consider renaming
  the file to `.tsx` like the other two story files.
- [ ] **`@storybook/addon-mcp`** (`.storybook/main.ts`): exposes an MCP server from the dev server.
  Not needed for a plain UI kit unless you use it.

## Demo app (`App.tsx`, `index.css`, `main.tsx`)

- [ ] The page has no `<h1>` now that the title is a `Card` with `headingLevel={3}`. Add an `h1` if the
  page should have one.
- [ ] The password field always shows a hard-coded error (intentional demo of the error state).
- [ ] Theme starts as light and ignores `prefers-color-scheme`.
- [ ] `#root` still has the template layout (1126px wide, centred text, side borders). Decide whether to keep it.
- [ ] `main.tsx` imports `index.css` before `tokens/tokens.css`; load order matters if rules ever clash.
- [ ] `src/assets/` (`hero.png`, `react.svg`, `vite.svg`) are template images no file uses. Delete them.
- [ ] `vite.config.ts` uses `__dirname`; Vite warns to use `import.meta.dirname`.
