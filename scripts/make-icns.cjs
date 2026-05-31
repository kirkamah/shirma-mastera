// Generates build/icon.icns for the macOS build of "Ширма Мастера".
// Re-renders the SAME tome-card design as make-icon.cjs, but at high resolution
// (1024px reference) and packs PNG-based entries into an .icns container.
// Pure Node — no external image tools, so it runs on Windows during prep.
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const COL = {
  bg: [26, 18, 10, 255],
  gold: [184, 137, 59, 255],
  goldHi: [217, 184, 120, 255],
  red: [122, 20, 20, 255],
  redDark: [74, 12, 12, 255]
}

// Render the icon at resolution S (design is authored in 256-space and scaled).
function renderBase(S) {
  const f = S / 256
  const buf = Buffer.alloc(S * S * 4)
  const set = (x, y, c) => {
    const i = (y * S + x) * 4
    buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = c[3]
  }
  // rounded-rect test; bounds given in 256-space, scaled by f to S-space.
  const inRR = (x, y, l, t, r, b, rad) => {
    l *= f; t *= f; r *= f; b *= f; rad *= f
    if (x < l || x > r || y < t || y > b) return false
    const cx = x < l + rad ? l + rad : x > r - rad ? r - rad : x
    const cy = y < t + rad ? t + rad : y > b - rad ? b - rad : y
    return (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad
  }
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      let c = [0, 0, 0, 0]
      if (inRR(x, y, 6, 6, 249, 249, 44)) c = COL.bg
      if (inRR(x, y, 16, 16, 239, 239, 36) && !inRR(x, y, 24, 24, 231, 231, 30)) c = COL.gold
      if (inRR(x, y, 28, 28, 227, 227, 26)) c = COL.red
      if (inRR(x, y, 28, 28, 227, 227, 26) && !inRR(x, y, 34, 34, 221, 221, 22)) c = COL.redDark
      if (inRR(x, y, 40, 40, 215, 215, 18)) {
        const X = x / f, Y = y / f // compare glyph bars in 256-space
        const bars = (X >= 74 && X <= 96) || (X >= 117 && X <= 139) || (X >= 160 && X <= 182)
        const vertical = Y >= 80 && Y <= 176
        const bottom = Y >= 158 && Y <= 176 && X >= 74 && X <= 182
        if ((bars && vertical) || bottom) c = COL.gold
        const hi = ((X >= 74 && X <= 79) || (X >= 117 && X <= 122) || (X >= 160 && X <= 165)) && Y >= 80 && Y <= 158
        if (hi) c = COL.goldHi
      }
      if (c[3] !== 0) set(x, y, c)
    }
  }
  return buf
}

// Box-downsample an SRC-sized RGBA buffer to size S (premultiplied, halo-free).
function downsample(src, SRC, S) {
  if (S === SRC) return src
  const scale = SRC / S
  const out = Buffer.alloc(S * S * 4)
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      let r = 0, g = 0, b = 0, a = 0, n = 0
      const x0 = Math.floor(x * scale), y0 = Math.floor(y * scale)
      const x1 = Math.floor((x + 1) * scale), y1 = Math.floor((y + 1) * scale)
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * SRC + sx) * 4
          const al = src[i + 3] / 255
          r += src[i] * al; g += src[i + 1] * al; b += src[i + 2] * al; a += src[i + 3]; n++
        }
      }
      const o = (y * S + x) * 4
      const aAvg = a / n, alAvg = aAvg / 255
      out[o] = alAvg > 0 ? Math.round(r / n / alAvg) : 0
      out[o + 1] = alAvg > 0 ? Math.round(g / n / alAvg) : 0
      out[o + 2] = alAvg > 0 ? Math.round(b / n / alAvg) : 0
      out[o + 3] = Math.round(aAvg)
    }
  }
  return out
}

// ---- PNG encode ----
function crc32(b) {
  let c = ~0
  for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1 }
  return (~c) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0)
  const t = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0)
  return Buffer.concat([len, t, data, crc])
}
function encodePng(rgba, S) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4); ihdr[8] = 8; ihdr[9] = 6
  const raw = Buffer.alloc((S * 4 + 1) * S)
  for (let y = 0; y < S; y++) {
    raw[y * (S * 4 + 1)] = 0
    rgba.copy(raw, y * (S * 4 + 1) + 1, y * S * 4, (y + 1) * S * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ])
}

// ---- ICNS pack (PNG-based OSTypes) ----
const TYPES = { 16: 'icp4', 32: 'icp5', 64: 'icp6', 128: 'ic07', 256: 'ic08', 512: 'ic09', 1024: 'ic10' }
const BASE = 1024
const base = renderBase(BASE)
const entries = []
for (const size of [1024, 512, 256, 128, 64, 32, 16]) {
  const png = encodePng(downsample(base, BASE, size), size)
  const header = Buffer.alloc(8)
  Buffer.from(TYPES[size], 'ascii').copy(header, 0)
  header.writeUInt32BE(png.length + 8, 4)
  entries.push(Buffer.concat([header, png]))
}
const body = Buffer.concat(entries)
const head = Buffer.alloc(8)
Buffer.from('icns', 'ascii').copy(head, 0)
head.writeUInt32BE(body.length + 8, 4)
const icns = Buffer.concat([head, body])

const outDir = path.join(__dirname, '..', 'build')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'icon.icns'), icns)
// Also refresh a 512px PNG (electron-builder prefers >=512 for mac fallbacks).
fs.writeFileSync(path.join(outDir, 'icon-512.png'), encodePng(downsample(base, BASE, 512), 512))
console.log(`icon.icns written (${icns.length} bytes; sizes 16-1024), icon-512.png written`)
