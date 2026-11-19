let sentinel: WakeLockSentinel | null = null;
let wanted = false;

export const requestWakeLock = async () => {
  wanted = true;
  if (!("wakeLock" in navigator) || sentinel) return;
  try {
    sentinel = await navigator.wakeLock.request("screen");
    sentinel.addEventListener("release", () => (sentinel = null));
  } catch {
    sentinel = null;
  }
};

export const releaseWakeLock = () => {
  wanted = false;
  void sentinel?.release();
  sentinel = null;
};

document.addEventListener("visibilitychange", () => {
  if (wanted && document.visibilityState === "visible") void requestWakeLock();
});
