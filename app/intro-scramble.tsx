"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";

const INTRO = "Hi! I'm Rahul.";
const PUNCHLINE = "Naam toh suna hoga?";
const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#";
const SCRAMBLE_DURATION = 560;
const TEASER_DELAY = 1500;
const TEASER_FRAME_DURATION = 120;
const TEASER_FRAMES = [
  "Hi! I'm RahX7.",
  "Hi! I'm Rah?#.",
  "Hi! I'm Rah4!.",
  INTRO,
];

export function IntroScramble() {
  const [text, setText] = useState(INTRO);
  const textRef = useRef(INTRO);
  const animationFrameRef = useRef<number | null>(null);
  const teaserTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasInteractedRef = useRef(false);
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
    if (prefersReducedMotion) return;

    teaserTimeoutsRef.current = TEASER_FRAMES.map((frame, index) =>
      setTimeout(
        () => {
          if (hasInteractedRef.current) return;

          textRef.current = frame;
          setText(frame);
        },
        TEASER_DELAY + index * TEASER_FRAME_DURATION,
      ),
    );

    return () => {
      teaserTimeoutsRef.current.forEach(clearTimeout);
      teaserTimeoutsRef.current = [];
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <span
      onMouseEnter={() => {
        hasInteractedRef.current = true;
        teaserTimeoutsRef.current.forEach(clearTimeout);
        teaserTimeoutsRef.current = [];
        animateTo(PUNCHLINE);
      }}
      onMouseLeave={() => animateTo(INTRO)}
      className="relative inline-grid"
    >
      <span className="sr-only">{INTRO}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {PUNCHLINE}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 whitespace-nowrap"
      >
        {text}
      </span>
    </span>
  );
}
