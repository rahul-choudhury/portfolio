"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Easing,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "./icons";

const NAV_LINKS = [
  { href: "#about", label: "[01] About" },
  { href: "#work", label: "[02] Work" },
  { href: "#contact", label: "[03] Contact" },
];

const brutalEase: Easing = [0.2, 0.6, 0.2, 1];

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        className="relative z-50 font-mono text-sm font-bold lg:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? "CLOSE" : "MENU"}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-(--color-background) pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              ease: brutalEase,
            }}
          >
            <motion.nav
              className="flex flex-col items-center gap-8 p-8"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 1 },
                show: {
                  opacity: 1,
                  transition: reduceMotion ? { duration: 0 } : undefined,
                },
              }}
            >
              {NAV_LINKS.map(({ href, label }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.35, ease: brutalEase },
                    },
                  }}
                >
                  <Link
                    href={href}
                    className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: brutalEase },
                  },
                }}
              >
                <Link
                  href="https://destructure.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                >
                  [04] Blog
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
