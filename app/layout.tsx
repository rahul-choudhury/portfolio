import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { MobileHaptics } from "@/components/mobile-haptics";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rchoudhury.dev"),
  title: {
    default: "Rahul Choudhury",
    template: "%s | Rahul Choudhury",
  },
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
        className={`${satoshi.className} ${satoshi.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <MobileHaptics />
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-6 pb-16 pt-10 md:px-12 md:pb-20 md:pt-12">
          {children}
        </main>
      </body>
    </html>
  );
}
