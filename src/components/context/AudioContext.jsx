let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export async function closeAudioContext() {
  if (audioCtx) {
    await audioCtx.close();
    audioCtx = null;
  }
}