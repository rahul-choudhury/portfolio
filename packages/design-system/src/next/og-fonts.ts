import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const OG_FONTS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../assets/fonts/og"
)

export type OgFont = {
  name: string
  data: Buffer
  style: "normal" | "italic"
  weight: 400 | 500 | 600 | 700
}

const ogFontsPromise = Promise.all([
  readFile(path.join(OG_FONTS_DIR, "InstrumentSerif-Regular.ttf")),
  readFile(path.join(OG_FONTS_DIR, "Satoshi-Regular.ttf")),
  readFile(path.join(OG_FONTS_DIR, "JetBrainsMono-Regular.ttf")),
]).then(([instrumentSerifRegular, satoshiRegular, jetBrainsMonoRegular]) => [
  {
    name: "InstrumentSerif",
    data: instrumentSerifRegular,
    style: "normal" as const,
    weight: 400 as const,
  },
  {
    name: "Satoshi",
    data: satoshiRegular,
    style: "normal" as const,
    weight: 400 as const,
  },
  {
    name: "JetBrainsMono",
    data: jetBrainsMonoRegular,
    style: "normal" as const,
    weight: 400 as const,
  },
])

export function getDefaultOgFonts() {
  return ogFontsPromise
}
