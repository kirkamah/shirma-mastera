// Load a picked image File and return a downscaled data: URI so it can be
// persisted inside the SQLite codex JSON without bloating the database.
// Portraits stay PNG (preserve cut-out transparency); reference images become
// JPEG to keep large illustrations small.

interface ScaleOpts {
  /** Longest edge in source pixels; the image is shrunk to fit. */
  maxDim: number
  /** 'png' keeps transparency, 'jpeg' is much smaller for photos/art. */
  format?: 'png' | 'jpeg'
  /** JPEG quality (0–1). Ignored for PNG. */
  quality?: number
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'))
    img.src = url
  })
}

/** Read a File as a data: URI. We avoid URL.createObjectURL because the app's
 *  CSP allows `img-src 'self' data: https:` but NOT `blob:`, so blob URLs from
 *  createObjectURL fail to load in an <img>. */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'))
    reader.readAsDataURL(file)
  })
}

function drawScaled(img: HTMLImageElement, opts: ScaleOpts): string {
  const { maxDim, format = 'jpeg', quality = 0.85 } = opts
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas недоступен')
  ctx.drawImage(img, 0, 0, w, h)
  return canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', quality)
}

/** Read a File, downscale it on a canvas and return a data: URI. */
export async function fileToScaledDataUrl(file: File, opts: ScaleOpts): Promise<string> {
  return drawScaled(await loadImage(await fileToDataUrl(file)), opts)
}

/** Downscale an existing data:/blob URL (e.g. a clipboard bitmap) to a data: URI. */
export async function urlToScaledDataUrl(url: string, opts: ScaleOpts): Promise<string> {
  return drawScaled(await loadImage(url), opts)
}

/** Open a native file picker for a single image and resolve with the File. */
export function pickImageFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => resolve(input.files?.[0] ?? null)
    // If the dialog is dismissed there is no reliable cancel event; the promise
    // simply never resolves, which is fine — the input is GC'd.
    input.click()
  })
}
