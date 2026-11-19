const format = (s: number) => {
  const total = Math.max(0, Math.ceil(s));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

const addTimer = (tl: gsap.core.Timeline, duration: number) => {
  const state = { t: duration };
  const write = () => {
    const el = document.getElementById("timer");
    if (el) el.textContent = format(state.t);
  };
  write();
  tl.fromTo(state, { t: duration }, { t: 0, duration, ease: "linear", onUpdate: write }, 0);
};

export default addTimer;
