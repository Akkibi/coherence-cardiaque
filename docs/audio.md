# Audio

All sounds are synthesized live with Web Audio in `src/audio/breathAudio.ts` (singleton `breathAudio`). No audio files are used, so every sound stretches exactly to the current phase duration.

- **Sync**: the timeline calls `breathAudio.phase(phase, duration)` at each phase start (see [architecture](architecture.md)). Pause suspends the `AudioContext`, which freezes scheduled envelopes in step with the paused timeline. Resume continues both. Reset or a timeline rebuild stops the cycle voices.
- The `AudioContext` is created on the first play (needs a user gesture).
- **Cycle sounds** (`soundType`): `breathe` is band-passed pink noise whose envelope and filter sweep up on inhale and down on exhale, silent on hold. `wave` is low-passed noise that swells in on inhale and recedes on exhale, with a low rumble on hold.
- **Ambient sounds** (`ambiantType`): `heart` is a lub-dub scheduled with a lookahead loop. Its BPM follows the phase (faster on inhale, slower on exhale), mimicking respiratory sinus arrhythmia. `music` is a detuned triangle chord pad whose low-pass cutoff and level follow the breath.
