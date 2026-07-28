# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Deployment

The deployment is handled automatically by GitHub Actions. Simply push to the `main` branch.

## Analytics

Site stats are collected with [GoatCounter](https://www.goatcounter.com) — dashboard at
[wellduns.goatcounter.com](https://wellduns.goatcounter.com). The tracking script is added in
`nuxt.config.ts`; `app/plugins/goatcounter.client.ts` counts SPA page navigations and provides
a `$trackEvent(name)` helper.

Tracked events (shown in the dashboard alongside pageviews):

- `app-view-<appId>` — someone opened an app's modal (including `/?app=<id>` deep links)
- `link-<appId>-<type>` — someone clicked an outbound link in a modal, e.g.
  `link-time-utils-mac-app-store` or `link-timeutils-helper-download`

GoatCounter ignores `localhost`, so local dev doesn't pollute the stats.

## Publishing app downloads

Downloadable binaries (like TimeUtilsHelper.dmg) are published as GitHub Releases on the
dedicated [WellDuns/AppReleases](https://github.com/WellDuns/AppReleases) repo (kept
separate so the release page doesn't show this site's source code). GitHub counts every
completed download. To ship a new version:

```bash
gh release create timeutilshelper-v<version> path/to/TimeUtilsHelper.dmg \
  --repo WellDuns/AppReleases \
  --title "TimeUtils Global Hotkey Helper <version>" \
  --notes "What changed"
```

Since AppReleases hosts releases for multiple apps, the site links to the tag-specific URL
(`.../releases/download/timeutilshelper-v<version>/TimeUtilsHelper.dmg`) — do NOT use
`releases/latest`, it points at the newest release repo-wide regardless of app. After
publishing, update in `app/data/apps.ts`:

1. the `download` link's version tag
2. `update.version` / `update.build`, so the in-app updater's
   `/timeutils/helper-update.json` feed picks it up

### Download stats

```bash
gh api repos/WellDuns/AppReleases/releases \
  --jq '.[] | {tag: .tag_name, downloads: [.assets[] | {name, count: .download_count}]}'
```


## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
