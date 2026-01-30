"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#about", label: "[01] About" },
  { href: "#work", label: "[02] Work" },
  { href: "#contact", label: "[03] Contact" },
];

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="font-mono text-sm font-bold lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "CLOSE" : "MENU"}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-(--color-background) pt-20"
          >
            <nav className="flex flex-col items-center gap-8 p-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                  onClick={() => setIsMenuOpen(false)}
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
                <ArrowUpRightIcon className="size-4" weight="bold" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
