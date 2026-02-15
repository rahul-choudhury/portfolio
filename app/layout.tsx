import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
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
        className={`${spaceGrotesk.variable} ${spaceMono.variable} bg-bg text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
