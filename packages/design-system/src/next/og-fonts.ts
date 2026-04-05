import { readFile } from "node:fs/promises"
import path from "node:path"

const DEFAULT_OG_FONTS_DIR = path.join(process.cwd(), "public", "og-fonts")

export type OgFont = {
  name: string
  data: Buffer
  style: "normal" | "italic"
  weight: 400 | 500 | 600 | 700
}

function readOgFonts(fontsDir: string) {
  return Promise.all([
    readFile(path.join(fontsDir, "InstrumentSerif-Regular.ttf")),
    readFile(path.join(fontsDir, "Satoshi-Regular.ttf")),
    readFile(path.join(fontsDir, "JetBrainsMono-Regular.ttf")),
  ])
    .then(([instrumentSerifRegular, satoshiRegular, jetBrainsMonoRegular]) => [
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
    .catch((error: unknown) => {
      const details = error instanceof Error ? error.message : String(error)

      throw new Error(
        `OG fonts could not be loaded from ${fontsDir}. ` +
          `Each app should ship InstrumentSerif-Regular.ttf, ` +
          `Satoshi-Regular.ttf, and JetBrainsMono-Regular.ttf under public/og-fonts. ` +
          `Original error: ${details}`
      )
    })
}

const defaultOgFontsPromise = readOgFonts(DEFAULT_OG_FONTS_DIR)

export function getDefaultOgFonts() {
  return defaultOgFontsPromise
}
