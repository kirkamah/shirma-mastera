// Synthesize one WAV per narration scene with Piper, measure each clip's
// duration, and write scenes-meta.json (adds audioMs + wav path per scene).
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const PIPER_DIR = 'C:\\projects\\pocket-scp-079\\resources\\piper'
const PIPER = join(PIPER_DIR, 'piper.exe')
const MODEL = 'C:\\projects\\pocket-scp-079\\resources\\voices\\ru_RU-dmitri-medium.onnx'
const FFMPEG =
  'C:\\Users\\kirka\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe'
const FFPROBE =
  'C:\\Users\\kirka\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffprobe.exe'
// Natural, unhurried delivery: a touch slower, clear sentence pauses, pitch kept
// close to the voice's own register (only barely warmed) so it sounds human.
const LENGTH_SCALE = '1.16'
const SENTENCE_SILENCE = '0.55'
const PITCH = '0.98'

const AUDIO_DIR = join(ROOT, 'video', 'audio')
mkdirSync(AUDIO_DIR, { recursive: true })

const scenes = JSON.parse(readFileSync(join(__dirname, 'narration.json'), 'utf8'))

function run(cmd, args, { input, cwd } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd })
    let out = '',
      err = ''
    p.stdout.on('data', (d) => (out += d))
    p.stderr.on('data', (d) => (err += d))
    p.on('error', reject)
    p.on('close', (code) => (code === 0 ? resolve({ out, err }) : reject(new Error(`${cmd} exit ${code}: ${err}`))))
    if (input != null) {
      p.stdin.write(Buffer.from(input, 'utf8'))
      p.stdin.end()
    }
  })
}

async function durationMs(wav) {
  const { out } = await run(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav])
  return Math.round(parseFloat(out.trim()) * 1000)
}

const meta = []
for (const s of scenes) {
  const raw = join(AUDIO_DIR, `scene_${s.id}_raw.wav`)
  const wav = join(AUDIO_DIR, `scene_${s.id}.wav`)
  process.stdout.write(`synth ${s.id} … `)
  await run(PIPER, ['-m', MODEL, '-f', raw, '--length_scale', LENGTH_SCALE, '--sentence_silence', SENTENCE_SILENCE], { input: s.text, cwd: PIPER_DIR })
  // Lower the pitch slightly (rubberband preserves duration).
  await run(FFMPEG, ['-y', '-i', raw, '-af', `rubberband=pitch=${PITCH}`, wav])
  const ms = await durationMs(wav)
  console.log(`${ms} ms`)
  meta.push({ ...s, wav, audioMs: ms })
}

writeFileSync(join(__dirname, 'scenes-meta.json'), JSON.stringify(meta, null, 2))
const total = meta.reduce((a, s) => a + s.audioMs, 0)
console.log(`\n${meta.length} scenes, narration total ${(total / 1000).toFixed(1)} s`)
