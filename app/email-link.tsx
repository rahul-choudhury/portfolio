"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { BLUR_REVEAL_FILTER, BLUR_REVEAL_TRANSITION } from "@/lib/motion";

const EMAIL = "rchoudhury63@gmail.com";
const COPY_RESET_DELAY = 1200;

export function EmailLink() {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const transition = {
    ...BLUR_REVEAL_TRANSITION,
    duration: prefersReducedMotion ? 0 : BLUR_REVEAL_TRANSITION.duration,
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    await navigator.clipboard.writeText(EMAIL);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    setIsCopied(true);
    resetTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, COPY_RESET_DELAY);
  };

  return (
    <span className="inline-flex items-center gap-1 text-base font-medium text-text">
      <span>{EMAIL}</span>
      <button
        type="button"
        onClick={handleClick}
        aria-label={isCopied ? "Email copied" : "Copy email address"}
        aria-live="polite"
        className="inline-grid size-7 cursor-pointer place-items-center rounded-sm text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
      >
        <motion.span
          aria-hidden
          initial={false}
          animate={{
            opacity: isCopied ? 0 : 1,
            filter: isCopied
              ? BLUR_REVEAL_FILTER.hidden
              : BLUR_REVEAL_FILTER.visible,
          }}
          transition={transition}
          className="col-start-1 row-start-1 inline-flex"
        >
          <CopyIcon aria-hidden="true" size={18} />
        </motion.span>
        <motion.span
          aria-hidden
          initial={false}
          animate={{
            opacity: isCopied ? 1 : 0,
            filter: isCopied
              ? BLUR_REVEAL_FILTER.visible
              : BLUR_REVEAL_FILTER.hidden,
          }}
          transition={transition}
          className="col-start-1 row-start-1 inline-flex"
        >
          <CheckIcon aria-hidden="true" size={18} />
        </motion.span>
      </button>
    </span>
  );
}
