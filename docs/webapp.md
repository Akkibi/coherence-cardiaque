# Web app (PWA)

- `public/manifest.webmanifest`: standalone display, relative `start_url`/`scope` (works under a sub-path), PNG icons (192, 512, maskable) generated from `public/icon.svg`.
- `public/sw.js`: hand-written service worker. Precaches the shell. Navigations are network-first with an offline fallback to the cached shell. Other same-origin GETs are cache-first and cached at runtime (Vite assets are hashed). Bump `CACHE` to invalidate.
- `src/webapp/registerServiceWorker.ts`: registers the service worker in production builds only.
- `src/webapp/wakeLock.ts`: Screen Wake Lock held while a session plays, re-acquired when the page becomes visible again.
- `App.tsx` pauses the session when the page is hidden, because GSAP stops ticking while audio would keep going.
- iOS: `apple-touch-icon` and `apple-mobile-web-app-*` meta tags in `index.html`.
