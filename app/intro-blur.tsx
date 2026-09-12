"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { BLUR_REVEAL_FILTER, BLUR_REVEAL_TRANSITION } from "@/lib/motion";

const INTRO = "Hi! I'm Rahul.";
const PUNCHLINE = "Naam toh suna hoga?";
const CHARACTER_DURATION = 0.22;

export function IntroBlur() {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-grid"
    >
      <span className="sr-only">{INTRO}</span>
      <BlurredText
        text={INTRO}
        visible={!isHovered}
        prefersReducedMotion={prefersReducedMotion}
      />
      <BlurredText
        text={PUNCHLINE}
        visible={isHovered}
        prefersReducedMotion={prefersReducedMotion}
      />
    </span>
  );
}

function BlurredText({
  text,
  visible,
  prefersReducedMotion,
}: {
  text: string;
  visible: boolean;
  prefersReducedMotion: boolean;
}) {
  const characters = [...text];
  const characterDelay =
    (BLUR_REVEAL_TRANSITION.duration - CHARACTER_DURATION) /
    (characters.length - 1);

  return (
    <span
      aria-hidden
      className="pointer-events-none col-start-1 row-start-1 whitespace-nowrap"
    >
      {characters.map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          initial={false}
          animate={{
            opacity: visible ? 1 : 0,
            filter: visible
              ? BLUR_REVEAL_FILTER.visible
              : BLUR_REVEAL_FILTER.hidden,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : CHARACTER_DURATION,
            delay:
              prefersReducedMotion || !visible ? 0 : index * characterDelay,
            ease: BLUR_REVEAL_TRANSITION.ease,
          }}
          className="inline-block"
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </span>
  );
}
