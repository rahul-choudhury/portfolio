"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";

const INTRO = "Hi! I'm Rahul.";
const PUNCHLINE = "Naam toh suna hoga?";
const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#";
const SCRAMBLE_DURATION = 560;

export function IntroScramble() {
  const [text, setText] = useState(INTRO);
  const textRef = useRef(INTRO);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animateTo = useCallback(
    (target: string) => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (prefersReducedMotion) {
        textRef.current = target;
        setText(target);
        return;
      }

      const source = textRef.current;
      const startedAt = performance.now();

      const scramble = (now: number) => {
        const progress = Math.min((now - startedAt) / SCRAMBLE_DURATION, 1);
        const length = Math.round(
          source.length + (target.length - source.length) * progress,
        );
        const resolvedCharacters = Math.floor(target.length * progress);
        let nextText = "";

        for (let index = 0; index < length; index += 1) {
          if (index < resolvedCharacters) {
            nextText += target[index];
          } else if (target[index] === " ") {
            nextText += " ";
          } else {
            const characterIndex =
              (Math.floor(now / 32) + index * 7) % SCRAMBLE_CHARACTERS.length;
            nextText += SCRAMBLE_CHARACTERS[characterIndex];
          }
        }

        textRef.current = nextText;
        setText(nextText);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(scramble);
        } else {
          animationFrameRef.current = null;
          textRef.current = target;
          setText(target);
        }
      };

      animationFrameRef.current = requestAnimationFrame(scramble);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={`${INTRO} ${PUNCHLINE}`}
      onBlur={() => animateTo(INTRO)}
      onClick={() => animateTo(PUNCHLINE)}
      onFocus={() => animateTo(PUNCHLINE)}
      onMouseEnter={() => animateTo(PUNCHLINE)}
      onMouseLeave={() => animateTo(INTRO)}
      className="intro-scramble inline-grid appearance-none bg-transparent p-0 text-left [font:inherit]"
    >
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {PUNCHLINE}
      </span>
      <span
        aria-hidden
        className="col-start-1 row-start-1"
      >
        {text}
      </span>
    </button>
  );
}
