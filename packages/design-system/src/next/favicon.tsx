import type { ReactNode } from "react"
import { ImageResponse } from "next/og"

export const FAVICON_SIZE = {
  width: 32,
  height: 32,
} as const

export const APPLE_ICON_SIZE = {
  width: 180,
  height: 180,
} as const

export const FAVICON_CONTENT_TYPE = "image/png"

export type CreateFaviconOptions = {
  mark: ReactNode
}

export function createFavicon({ mark }: CreateFaviconOptions) {
  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e5e5e5",
        borderRadius: "6px",
      }}
    >
      {mark}
    </div>,
    {
      ...FAVICON_SIZE,
    }
  )
}

export function createAppleIcon({ mark }: CreateFaviconOptions) {
  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e5e5e5",
        borderRadius: "32px",
      }}
    >
      {mark}
    </div>,
    {
      ...APPLE_ICON_SIZE,
    }
  )
}
