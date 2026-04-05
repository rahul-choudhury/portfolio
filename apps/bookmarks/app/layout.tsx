import { cn } from "@workspace/design-system"
import { getDefaultAppFonts } from "@workspace/design-system/next"
import type { Metadata } from "next"
import "./globals.css"
import { CommandPalette } from "@/components/command-palette"
import { MobileHaptics } from "@/components/mobile-haptics"

const appFonts = getDefaultAppFonts()

export const metadata: Metadata = {
  metadataBase: new URL("https://bookmarks.rchoudhury.dev"),
  title: "Bookmarks",
  description: "<kbd /> focused bookmark manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(appFonts.bodyClassName, "bg-bg text-text antialiased")}
      >
        <MobileHaptics />
        <div className="root">{children}</div>
        <CommandPalette />
      </body>
    </html>
  )
}
