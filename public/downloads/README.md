# App Binaries

Drop downloadable app binaries (`.zip`, `.dmg`, `.exe`, etc.) in this folder.

Anything here is served statically, so a file at `public/downloads/my-app.zip`
is reachable at `/downloads/my-app.zip`. Use that path as the `download` link
for an app in `app/data/apps.ts`:

```ts
links: {
  download: '/downloads/my-app.zip'
}
```

The app modal renders a **Download** button (with a download icon) whenever a
`download` link is present.
