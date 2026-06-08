// Mux the recorded webm with narration + a ducked music bed; transcode to mp4.
//   node mux.mjs verify   -> only dump per-scene start frames for inspection
//   node mux.mjs          -> produce the final mp4
import { spawn } from 'node:child_process'
import { readFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FFMPEG =
  'C:\\Users\\kirka\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe'
const VERIFY = process.argv[2] === 'verify'

const tl = JSON.parse(readFileSync(join(__dirname, 'timeline.json'), 'utf8'))
const RAW = tl.rawPath
const LEAD = tl.LEAD
const MUSIC = join(ROOT, 'video', 'audio', 'music-loop.wav')

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args)
    let err = ''
    p.stderr.on('data', (d) => (err += d))
    p.on('error', reject)
    p.on('close', (code) => (code === 0 ? resolve(err) : reject(new Error(`${cmd} exit ${code}\n${err.slice(-1000)}`))))
  })
}
async function realDurationMs(file) {
  const err = await run(FFMPEG, ['-i', file, '-f', 'null', '-'])
  let last = null, m
  const re = /time=(\d+):(\d+):(\d+\.\d+)/g
  while ((m = re.exec(err))) last = m
  if (!last) throw new Error('no duration')
  return Math.round((+last[1] * 3600 + +last[2] * 60 + +last[3]) * 1000)
}

const D = await realDurationMs(RAW)
const head = D - tl.totalActive
const trimStart = Math.max(0, head - LEAD)
const leadEff = head - trimStart
const ms = (x) => (x / 1000).toFixed(3)
console.log(`duration=${D}ms head=${head}ms trimStart=${trimStart}ms leadEff=${leadEff}ms`)

if (VERIFY) {
  const dir = join(ROOT, 'video', 'verify')
  mkdirSync(dir, { recursive: true })
  for (const s of tl.timeline) {
    const at = head + s.startMs + 5000
    await run(FFMPEG, ['-v', 'error', '-y', '-ss', ms(at), '-i', RAW, '-frames:v', '1', join(dir, `${s.id}.png`)])
    console.log('frame', s.id, '@', ms(at))
  }
  process.exit(0)
}

// ---- final encode ----
const hasMusic = existsSync(MUSIC)
const args = ['-y', '-ss', ms(trimStart), '-i', RAW]
for (const s of tl.timeline) args.push('-i', s.wav)
if (hasMusic) args.push('-stream_loop', '-1', '-i', MUSIC)

const N = tl.timeline.length
const filters = []
const narrLabels = []
tl.timeline.forEach((s, i) => {
  const delay = Math.round(leadEff + s.startMs)
  filters.push(`[${i + 1}:a]adelay=${delay}|${delay}[a${i}]`)
  narrLabels.push(`[a${i}]`)
})
filters.push(`${narrLabels.join('')}amix=inputs=${N}:normalize=0:dropout_transition=0[narrraw]`)
filters.push(`[narrraw]loudnorm=I=-16:TP=-1.5:LRA=11[voice]`)

let audioOut = '[voice]'
if (hasMusic) {
  // Boost the quiet loop, normalise to a low bed level, then duck it under speech.
  filters.push(`[${N + 1}:a]volume=3.2,loudnorm=I=-27:TP=-3[bedn]`)
  filters.push(`[voice]asplit=2[v1][v2]`)
  filters.push(`[bedn][v2]sidechaincompress=threshold=0.04:ratio=8:attack=15:release=400[ducked]`)
  filters.push(`[v1][ducked]amix=inputs=2:normalize=0:dropout_transition=0,alimiter=limit=0.97[mix]`)
  audioOut = '[mix]'
}

const out = join(ROOT, 'video', 'shirma-mastera-tour.mp4')
const finalLen = (D - trimStart) / 1000
args.push(
  '-filter_complex', filters.join(';'),
  '-map', '0:v', '-map', audioOut,
  '-t', finalLen.toFixed(3),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-r', '30',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
  out
)
console.log(`encoding → ${out}  (music: ${hasMusic ? 'yes' : 'no'}, ${finalLen.toFixed(1)}s)`)
await run(FFMPEG, args)
console.log('DONE:', out)
