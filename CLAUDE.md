# coherence-cardiaque

Guided breathing web app (cardiac coherence and box breathing), with an animated face, synced sounds, installable as a PWA.

## Docs
- [docs/architecture.md](docs/architecture.md): app structure, GSAP timeline, breathing modes
- [docs/audio.md](docs/audio.md): Web Audio engine, cycle sounds and ambient sounds, sync with the timeline
- [docs/webapp.md](docs/webapp.md): PWA manifest, service worker, wake lock, visibility handling

## Commands (npm)
- `npm run dev`: dev server
- `npx tsc -b`: type-check
- `npm run lint`
- `npm run build` / `npm run preview` (the service worker only registers in prod builds)
