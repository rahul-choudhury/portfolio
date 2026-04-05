type NextFontRole = {
  className: string
  variable: string
}

declare module "next/font/google" {
  export function Instrument_Serif(options: {
    subsets?: string[]
    weight?: string | string[]
    style?: string[]
    variable: string
    display?: string
  }): NextFontRole

  export function JetBrains_Mono(options: {
    subsets?: string[]
    weight?: string | string[]
    style?: string[]
    variable: string
    display?: string
  }): NextFontRole
}

declare module "next/font/local" {
  export default function localFont(options: {
    src:
      | string
      | {
          path: string
          weight?: string
          style?: string
        }
      | Array<{
          path: string
          weight?: string
          style?: string
        }>
    variable: string
    display?: string
  }): NextFontRole
}
