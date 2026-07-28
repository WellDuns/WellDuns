# App Binaries

Prefer publishing app binaries as **GitHub Releases** on the
[WellDuns/AppReleases](https://github.com/WellDuns/AppReleases) repo instead
of committing them here — GitHub counts every download and this repo stays
small. See "Publishing app downloads" in the root README.

This folder still works for anything you want served statically: a file at
`public/downloads/my-app.zip` is reachable at `/downloads/my-app.zip`. Use
that path (or a GitHub release URL) as the `download` link for an app in
`app/data/apps.ts`:

```ts
links: {
  download: 'https://github.com/WellDuns/AppReleases/releases/download/my-app-v1.0.0/MyApp.dmg'
}
```

The app modal renders a **Download** button (with a download icon) whenever a
`download` link is present.
