import { getDefaultAppFonts } from "@workspace/design-system/next"
import type { Metadata } from "next"
import { MobileHaptics } from "@/components/mobile-haptics"
import "./globals.css"

const appFonts = getDefaultAppFonts()

export const metadata: Metadata = {
  metadataBase: new URL("https://rchoudhury.dev"),
  title: "Rahul Choudhury",
  description:
    "Frontend Developer creating clean, performant web applications with React, TypeScript, and modern technologies.",
  openGraph: {
    title: "Rahul Choudhury",
    description:
      "Frontend Developer creating clean, performant web applications with React, TypeScript, and modern technologies.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${appFonts.bodyClassName} antialiased`}>
        <MobileHaptics />
        <main className="mx-auto max-w-4xl px-6 pb-16 pt-12 md:px-12 md:pb-20 md:pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
