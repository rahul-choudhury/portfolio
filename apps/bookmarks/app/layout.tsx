import { cn } from "@workspace/design-system/lib/utils";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/command-palette";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bookmarks.rchoudhury.dev"),
  title: "Bookmarks",
  description: "<kbd /> focused bookmark manager",
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
          jetbrainsMono.className,
          jetbrainsMono.variable,
          "bg-bg text-text antialiased",
        )}
      >
        <div className="root">{children}</div>
        <CommandPalette />
      </body>
    </html>
  );
}
