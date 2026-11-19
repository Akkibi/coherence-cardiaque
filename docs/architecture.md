# Architecture

- `src/App.tsx` owns state (mode, durations, sound choices) and one paused GSAP timeline (`tlFace`), rebuilt whenever mode or durations change.
- Modes build the timeline: `src/animations/animCoherence.ts` (`linear`: inhale, exhale) and `src/animations/animCarre.ts` (`square`: inhale, hold, exhale, hold).
- Cycle duration interpolates linearly from `startTime` to `endTime` (half-cycle seconds) over `totalTime`, giving the deceleration.
- Each phase start emits `onPhase(phase, duration)` via `tl.call`, which drives [audio](audio.md).
- `src/components/Menu.tsx`: settings panel. Opening it pauses the timeline.
- Play, pause and reset go through `playTimeline` / `pauseTimeline` / `resetTimeline`, which also drive audio and the wake lock ([webapp](webapp.md)).
