// Generates build/icon.ico (multi-size: 16,32,48,64,128,256) and build/icon.png
// for "Ширма Мастера". Pure Node — no external image tools. Design: dark tome
// card with a gilded frame, a deep-red panel and a golden Cyrillic "Ш".
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

// Draw the icon at the reference resolution (256), returns RGBA buffer.
function renderBase() {
  const S = 256
  const buf = Buffer.alloc(S * S * 4)
  const set = (x, y, c) => {
    const i = (y * S + x) * 4
    buf[i] = c[0]
    buf[i + 1] = c[1]
    buf[i + 2] = c[2]
    buf[i + 3] = c[3]
  }
  const inRR = (x, y, l, t, r, b, rad) => {
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
      const onPanel = inRR(x, y, 40, 40, 215, 215, 18)
      if (onPanel) {
        const bars = (x >= 74 && x <= 96) || (x >= 117 && x <= 139) || (x >= 160 && x <= 182)
        const vertical = y >= 80 && y <= 176
        const bottom = y >= 158 && y <= 176 && x >= 74 && x <= 182
        if ((bars && vertical) || bottom) c = COL.gold
        const hi = ((x >= 74 && x <= 79) || (x >= 117 && x <= 122) || (x >= 160 && x <= 165)) && y >= 80 && y <= 158
        if (hi) c = COL.goldHi
      }
      if (c[3] !== 0) set(x, y, c)
    }
  }
  return buf
}

// Box-downsample a 256 RGBA buffer to size S (premultiplied to avoid halos).
function downsample(src, S) {
  const SRC = 256
  const scale = SRC / S
  const out = Buffer.alloc(S * S * 4)
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      let r = 0, g = 0, b = 0, a = 0, n = 0
      const x0 = Math.floor(x * scale)
      const y0 = Math.floor(y * scale)
      const x1 = Math.floor((x + 1) * scale)
      const y1 = Math.floor((y + 1) * scale)
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * SRC + sx) * 4
          const al = src[i + 3] / 255
          r += src[i] * al
          g += src[i + 1] * al
          b += src[i + 2] * al
          a += src[i + 3]
          n++
        }
      }
      const o = (y * S + x) * 4
      const aAvg = a / n
      const alAvg = aAvg / 255
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
  for (let i = 0; i < b.length; i++) {
    c ^= b[i]
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1
  }
  return (~c) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const t = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0)
  return Buffer.concat([len, t, data, crc])
}
function encodePng(rgba, S) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(S, 0)
  ihdr.writeUInt32BE(S, 4)
  ihdr[8] = 8
  ihdr[9] = 6
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

const base = renderBase()
const SIZES = [256, 128, 64, 48, 32, 16]
const pngs = SIZES.map((s) => ({ s, png: encodePng(s === 256 ? base : downsample(base, s), s) }))

// ---- ICO with multiple entries ----
const dir = Buffer.alloc(6)
dir.writeUInt16LE(0, 0)
dir.writeUInt16LE(1, 2)
dir.writeUInt16LE(pngs.length, 4)
let offset = 6 + 16 * pngs.length
const entries = []
for (const { s, png } of pngs) {
  const e = Buffer.alloc(16)
  e[0] = s >= 256 ? 0 : s
  e[1] = s >= 256 ? 0 : s
  e[2] = 0
  e[3] = 0
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  entries.push(e)
}
const ico = Buffer.concat([dir, ...entries, ...pngs.map((p) => p.png)])

const outDir = path.join(__dirname, '..', 'build')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'icon.ico'), ico)
fs.writeFileSync(path.join(outDir, 'icon.png'), pngs[0].png)
console.log(`icon.ico written (${ico.length} bytes, sizes ${SIZES.join(',')}), icon.png 256px`)
