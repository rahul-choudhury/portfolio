import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ogFontsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/og/InstrumentSerif-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/og/Satoshi-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/og/JetBrainsMono-Regular.ttf")),
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
]);

export function getOgFonts() {
  return ogFontsPromise;
}
