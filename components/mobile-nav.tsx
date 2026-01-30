"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "./icons";

const NAV_LINKS = [
  { href: "#about", label: "[01] About" },
  { href: "#work", label: "[02] Work" },
  { href: "#contact", label: "[03] Contact" },
];

function toggleMenu(isOpen: boolean) {
  document.body.style.overflow = isOpen ? "hidden" : "";
  return isOpen;
}

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="relative z-50 font-mono text-sm font-bold lg:hidden"
        onClick={() => setIsMenuOpen(toggleMenu(!isMenuOpen))}
      >
        {isMenuOpen ? "CLOSE" : "MENU"}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-(--color-background) pt-20 transition-all duration-200 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 p-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
              onClick={() => setIsMenuOpen(toggleMenu(false))}
            >
              {label}
            </Link>
          ))}
          <Link
            href="https://destructure.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
          >
            [04] Blog
            <ArrowUpRight className="size-4" />
          </Link>
        </nav>
      </div>
    </>
  );
}
