"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { easeOutQuint } from "@rahul-choudhury/ui";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EMAIL = "rchoudhury63@gmail.com";
const COPY_RESET_DELAY = 1200;

export function EmailLink() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showIcon = isHovered || isCopied;

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
    <button
      type="button"
      data-hovered={isHovered || undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="inline-flex items-center text-lg font-medium text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text cursor-pointer"
    >
      <motion.span
        aria-hidden
        animate={{
          marginRight: showIcon ? 4 : 0,
          width: showIcon ? 20 : 0,
        }}
        className="inline-flex overflow-hidden"
        initial={false}
        transition={{ duration: 0.2, ease: easeOutQuint }}
      >
        {isCopied ? (
          <CheckIcon className="shrink-0" size={18} />
        ) : (
          <CopyIcon className="shrink-0" size={18} />
        )}
      </motion.span>
      {EMAIL}
    </button>
  );
}
