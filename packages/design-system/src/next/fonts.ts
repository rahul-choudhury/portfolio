/// <reference path="./next-font-modules.d.ts" />

import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "../lib/utils";

type AppFontRole = {
  className: string;
  variable: string;
};

type AppFontRoles = {
  sans: AppFontRole;
  serif: AppFontRole;
  mono: AppFontRole;
};

export type AppFonts = AppFontRoles & {
  bodyClassName: string;
  variableClassName: string;
  rootClassName: string;
};

const defaultSans = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});

const defaultSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const defaultMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export function createAppFonts(
  overrides: Partial<AppFontRoles> = {},
): AppFonts {
  const sans = overrides.sans ?? defaultSans;
  const serif = overrides.serif ?? defaultSerif;
  const mono = overrides.mono ?? defaultMono;
  const variableClassName = cn(sans.variable, serif.variable, mono.variable);
  const bodyClassName = cn(sans.className, variableClassName);

  return {
    sans,
    serif,
    mono,
    bodyClassName,
    variableClassName,
    rootClassName: bodyClassName,
  };
}

export function getDefaultAppFonts(): AppFonts {
  return createAppFonts();
}
