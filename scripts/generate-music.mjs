// Generate a royalty-free, relaxing medieval/tavern-ish ambience loop with
// ffmpeg only: a gentle plucked (lute/harp) arpeggio in D-Dorian over a soft
// drone, with light reverb and a low-pass for warmth. Output: music-loop.wav.
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FFMPEG =
  'C:\\Users\\kirka\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe'
const AUDIO_DIR = join(ROOT, 'video', 'audio')
mkdirSync(AUDIO_DIR, { recursive: true })

const N = {
  D2: 73.42, A2: 110.0, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0,
  A3: 220.0, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.0, A4: 440.0, D5: 587.33
}
const BEAT = 0.5 // seconds per pluck — slow, calm
// 8 bars of 4 plucks each (D Dorian: Dm – C – F – Am – Dm – C – Dm – A), loops cleanly.
const BARS = [
  ['D3', 'A3', 'D4', 'F4'],
  ['C4', 'G3', 'E4', 'G4'],
  ['F3', 'C4', 'A3', 'F4'],
  ['A3', 'E4', 'C4', 'A4'],
  ['D4', 'A3', 'F4', 'D4'],
  ['E4', 'C4', 'G4', 'E4'],
  ['D3', 'F3', 'A3', 'D4'],
  ['A3', 'D4', 'A3', 'D3']
]
const LOOP = BARS.length * 4 * BEAT // = 16s

// Build a plucked note: sine with an exponential pluck-decay envelope, delayed.
const parts = []
const labels = []
let idx = 0
BARS.forEach((bar, b) => {
  bar.forEach((note, i) => {
    const start = (b * 4 + i) * BEAT
    const f = N[note]
    const g = f > 300 ? 0.34 : 0.46 // soften the higher plucks a touch
    const lab = `n${idx++}`
    parts.push(`sine=frequency=${f.toFixed(2)}:duration=1.4,volume=volume='${g}*exp(-t*4.2)':eval=frame,adelay=${Math.round(start * 1000)}|${Math.round(start * 1000)}[${lab}]`)
    labels.push(`[${lab}]`)
  })
})
// Soft tavern hand-drum: a low, quickly-decaying thump on beats 1 and 3 of each
// bar gives a cosy "in the tavern" lilt without overpowering the lute.
BARS.forEach((_bar, b) => {
  for (const beat of [0, 2]) {
    const start = (b * 4 + beat) * BEAT
    const lab = `dm${b}_${beat}`
    parts.push(`sine=frequency=82:duration=0.5,volume=volume='0.5*exp(-t*15)':eval=frame,adelay=${Math.round(start * 1000)}|${Math.round(start * 1000)}[${lab}]`)
    labels.push(`[${lab}]`)
  }
})
// Soft sustained drone (root + fifth) under everything, with slow tremolo.
parts.push(`sine=frequency=${N.D2}:duration=${LOOP},volume=0.18,tremolo=f=0.18:d=0.4[dr1]`)
parts.push(`sine=frequency=${N.A2}:duration=${LOOP},volume=0.11[dr2]`)
labels.push('[dr1]', '[dr2]')

const mix =
  `${labels.join('')}amix=inputs=${labels.length}:normalize=0:dropout_transition=0[m];` +
  `[m]aecho=0.8:0.85:55|110:0.22|0.14,highpass=f=70,lowpass=f=3200,alimiter=limit=0.85,volume=1.6[out]`

const out = join(AUDIO_DIR, 'music-loop.wav')
const args = [
  '-y', '-filter_complex', `${parts.join(';')};${mix}`,
  '-map', '[out]', '-t', LOOP.toFixed(2), '-ar', '44100', '-ac', '2', out
]

const p = spawn(FFMPEG, args)
let err = ''
p.stderr.on('data', (d) => (err += d))
p.on('close', (code) => {
  if (code === 0) console.log('music loop →', out, `(${LOOP}s)`)
  else { console.error('ffmpeg failed:', err.slice(-1200)); process.exit(1) }
})
