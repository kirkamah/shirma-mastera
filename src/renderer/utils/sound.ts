import { useSettings } from '../store/settings'

let ctx: AudioContext | null = null

/** Short synthesized "dice clatter" — no audio asset needed. Respects the sound setting. */
export function playRollSound(): void {
  if (!useSettings.getState().sound) return
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const now = ctx.currentTime
    // A couple of quick noisy taps to suggest tumbling dice.
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.045
      const dur = 0.05
      const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let s = 0; s < data.length; s++) data[s] = (Math.random() * 2 - 1) * (1 - s / data.length)
      const src = ctx.createBufferSource()
      src.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = 0.12
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 1800 + i * 400
      src.connect(filter).connect(gain).connect(ctx.destination)
      src.start(t)
    }
  } catch {
    /* audio unavailable — ignore */
  }
}
