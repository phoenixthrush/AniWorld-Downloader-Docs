# AniWorld Downloader Docs

The documentation site for [AniWorld Downloader](https://github.com/phoenixthrush/AniWorld-Downloader), built with VitePress.

Install Node.js and pnpm first. Both must be available on your `PATH`; pnpm alone is not enough to run the build tools. CI uses Node.js 24.

On macOS with Homebrew:

```bash
brew install node pnpm
```

Then, from this directory:

```bash
pnpm install
pnpm docs:dev
```

Build and preview the production site with:

```bash
pnpm docs:build
pnpm docs:preview
```

Documentation source lives in [`docs`](./docs).
