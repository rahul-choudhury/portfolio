"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

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
        className="relative z-50 text-sm text-text-secondary md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.nav
              className="flex flex-col gap-6 p-8"
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
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <Link
                    href={href}
                    className="text-3xl font-medium tracking-tight text-text"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <Link
                  href="https://destructure.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl font-medium tracking-tight text-text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 border-t border-border pt-8"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.3, delay: 0.1 },
                  },
                }}
              >
                <p className="text-sm text-text-muted">
                  rchoudhury63@gmail.com
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
