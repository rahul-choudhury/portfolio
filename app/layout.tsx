import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { MobileHaptics } from "@/components/mobile-haptics";
import { cn } from "@/lib/utils";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          spaceGrotesk.className,
          spaceGrotesk.variable,
          spaceMono.variable,
          "antialiased",
        )}
      >
        <MobileHaptics />
        <main className="mx-auto max-w-4xl px-6 md:px-12 pt-12 md:pt-16 pb-16 md:pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
