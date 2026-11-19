export type Phase = "in" | "hold" | "out";
export type CycleSound = "none" | "wave" | "breathe";
export type AmbientSound = "none" | "heart" | "music";

const PAD_NOTES = [110, 164.81, 220, 277.18];
const HEART_BPM: Record<Phase, number> = { in: 68, hold: 63, out: 58 };

const envelope = (peakAt: number, points = 64) => {
  const k = Math.log(0.5) / Math.log(peakAt);
  const curve = new Float32Array(points);
  for (let i = 0; i < points; i++) {
    const x = i / (points - 1);
    curve[i] = Math.sin(Math.PI * Math.pow(x, k)) ** 2;
  }
  return curve;
};

const scaled = (curve: Float32Array, amount: number) =>
  curve.map((v) => v * amount);

class BreathAudio {
  private ctx?: AudioContext;
  private master?: GainNode;
  private noise?: AudioBuffer;
  private voices = new Set<AudioScheduledSourceNode>();
  private cycle: CycleSound = "none";
  private ambient: AmbientSound = "none";
  private padNodes: AudioScheduledSourceNode[] = [];
  private padFilter?: BiquadFilterNode;
  private padGain?: GainNode;
  private heartTimer?: number;
  private nextBeat = 0;
  private bpm = HEART_BPM.hold;

  private ensure() {
    if (this.ctx) return this.ctx;
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.8;
    this.master.connect(ctx.destination);

    const length = ctx.sampleRate * 4;
    this.noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.2;
    }
    this.applyAmbient();
    return ctx;
  }

  setCycle(type: string) {
    this.cycle = type as CycleSound;
    if (this.cycle === "none") this.stop();
  }

  setAmbient(type: string) {
    this.ambient = type as AmbientSound;
    if (this.ctx) this.applyAmbient();
  }

  play() {
    const ctx = this.ensure();
    if (ctx.state !== "running") void ctx.resume();
  }

  pause() {
    if (this.ctx?.state === "running") void this.ctx.suspend();
  }

  stop() {
    this.voices.forEach((v) => v.stop());
    this.voices.clear();
  }

  phase = (phase: Phase, duration: number) => {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    this.bpm = HEART_BPM[phase];
    this.modulatePad(phase, duration);
    if (this.cycle === "breathe") this.breath(phase, duration);
    else if (this.cycle === "wave") this.wave(phase, duration);
  };

  private noiseVoice(duration: number, filterType: BiquadFilterType) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise!;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter).connect(gain).connect(this.master!);
    const t = ctx.currentTime;
    src.start(t, Math.random() * this.noise!.duration);
    src.stop(t + duration);
    this.voices.add(src);
    src.onended = () => {
      this.voices.delete(src);
      gain.disconnect();
    };
    return { t, filter, gain };
  }

  private breath(phase: Phase, duration: number) {
    if (phase === "hold") return;
    const { t, filter, gain } = this.noiseVoice(duration, "bandpass");
    const inhale = phase === "in";
    filter.Q.value = inhale ? 0.9 : 0.6;
    filter.frequency.setValueAtTime(inhale ? 500 : 1100, t);
    filter.frequency.linearRampToValueAtTime(inhale ? 1500 : 350, t + duration);
    gain.gain.setValueCurveAtTime(
      scaled(envelope(inhale ? 0.6 : 0.3), inhale ? 0.9 : 1.1),
      t,
      duration
    );
  }

  private wave(phase: Phase, duration: number) {
    const { t, filter, gain } = this.noiseVoice(duration, "lowpass");
    filter.Q.value = 0.5;
    if (phase === "hold") {
      filter.frequency.value = 280;
      gain.gain.setValueCurveAtTime(scaled(envelope(0.5), 0.25), t, duration);
      return;
    }
    const inhale = phase === "in";
    filter.frequency.setValueAtTime(inhale ? 250 : 2200, t);
    filter.frequency.exponentialRampToValueAtTime(
      inhale ? 2200 : 200,
      t + duration
    );
    gain.gain.setValueCurveAtTime(
      scaled(envelope(inhale ? 0.75 : 0.2), 0.9),
      t,
      duration
    );
  }

  private applyAmbient() {
    this.stopPad();
    window.clearInterval(this.heartTimer);
    this.heartTimer = undefined;
    if (this.ambient === "music") this.startPad();
    if (this.ambient === "heart") {
      this.nextBeat = this.ctx!.currentTime + 0.1;
      this.heartTimer = window.setInterval(() => this.scheduleBeats(), 50);
    }
  }

  private scheduleBeats() {
    const ctx = this.ctx!;
    if (ctx.state !== "running") return;
    if (this.nextBeat < ctx.currentTime) this.nextBeat = ctx.currentTime + 0.05;
    while (this.nextBeat < ctx.currentTime + 0.3) {
      this.thump(this.nextBeat, 0.7);
      this.thump(this.nextBeat + 0.28, 0.45);
      this.nextBeat += 60 / this.bpm;
    }
  }

  private thump(t: number, level: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(level, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.22);
    osc.onended = () => gain.disconnect();
  }

  private startPad() {
    const ctx = this.ctx!;
    this.padFilter = ctx.createBiquadFilter();
    this.padFilter.type = "lowpass";
    this.padFilter.frequency.value = 600;
    this.padGain = ctx.createGain();
    this.padGain.gain.value = 0;
    this.padGain.gain.setTargetAtTime(0.06, ctx.currentTime, 1.5);
    this.padFilter.connect(this.padGain).connect(this.master!);
    this.padNodes = PAD_NOTES.flatMap((f) =>
      [-4, 4].map((detune) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = f;
        osc.detune.value = detune;
        osc.connect(this.padFilter!);
        osc.start();
        return osc;
      })
    );
  }

  private modulatePad(phase: Phase, duration: number) {
    if (!this.padFilter || !this.padGain) return;
    const t = this.ctx!.currentTime;
    const freq = this.padFilter.frequency;
    const level = this.padGain.gain;
    freq.cancelScheduledValues(t);
    level.cancelScheduledValues(t);
    freq.setValueAtTime(freq.value, t);
    level.setValueAtTime(level.value, t);
    if (phase === "hold") return;
    freq.linearRampToValueAtTime(phase === "in" ? 1600 : 450, t + duration);
    level.linearRampToValueAtTime(phase === "in" ? 0.08 : 0.045, t + duration);
  }

  private stopPad() {
    this.padNodes.forEach((o) => o.stop());
    this.padNodes = [];
    this.padGain?.disconnect();
    this.padFilter = undefined;
    this.padGain = undefined;
  }
}

export const breathAudio = new BreathAudio();
