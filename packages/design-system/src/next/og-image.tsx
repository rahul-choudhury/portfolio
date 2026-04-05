import type { ReactNode } from "react"
import { ImageResponse } from "next/og"
import { getDefaultOgFonts } from "./og-fonts"

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const

export const OG_IMAGE_CONTENT_TYPE = "image/png"

type OgMetaTone = "muted" | "secondary"

export type OgMetaLine = {
  text: string
  tone?: OgMetaTone
}

export type CreateOgImageOptions = {
  title: ReactNode
  subtitle?: ReactNode
  site: string
  mark: ReactNode
  metaLines?: OgMetaLine[]
  titleSize?: number
  titleLineHeight?: number
  titleLetterSpacing?: string
  subtitleSize?: number
  subtitleLineHeight?: number
  subtitleLetterSpacing?: string
  subtitleMarginTop?: string
}

export async function createOgImage({
  title,
  subtitle,
  site,
  mark,
  metaLines = [],
  titleSize = 96,
  titleLineHeight = 1,
  titleLetterSpacing = "-0.03em",
  subtitleSize = 24,
  subtitleLineHeight = 1.4,
  subtitleLetterSpacing = "0.02em",
  subtitleMarginTop = "8px",
}: CreateOgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "Satoshi",
        color: "#171717",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "InstrumentSerif",
            fontSize: titleSize,
            fontWeight: 400,
            lineHeight: titleLineHeight,
            letterSpacing: titleLetterSpacing,
            color: "#171717",
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: subtitleSize,
              color: "#737373",
              letterSpacing: subtitleLetterSpacing,
              marginTop: subtitleMarginTop,
              lineHeight: subtitleLineHeight,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              fontFamily: "JetBrainsMono",
              fontSize: 18,
              color: "#a3a3a3",
              letterSpacing: "0.02em",
            }}
          >
            {site}
          </div>

          {metaLines.map(({ text, tone = "secondary" }) => (
            <div
              key={`${tone}:${text}`}
              style={{
                fontFamily: "JetBrainsMono",
                fontSize: 16,
                color: tone === "muted" ? "#737373" : "#a3a3a3",
                letterSpacing: "0.02em",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {mark}
      </div>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      fonts: await getDefaultOgFonts(),
    }
  )
}
