"use client";

import { MicrophoneIcon, PlusIcon, WaveformIcon } from "@phosphor-icons/react";
import { cn } from "@rahul-choudhury/ui";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

const SPRING = { stiffness: 210, damping: 26, mass: 0.9 };
const BLEED = 20;
// Fractions of the bar height. The plus stays on the original left edge and
// the field gives up that width, so the pair keeps the resting footprint
// and stays centered in the stage. The goo filter supplies the neck.
const GAP = 0.19;
const FIELD_OPEN = 1 + GAP;
const REST_TEXT = 1.29;
const OPEN_INSET = 0.36;
const PLUS_NUDGE = 0.09;

type Spec = {
  height: number;
  blur: number;
  plus: number;
  mic: number;
  voice: number;
  waveform: number;
  trailing: number;
  text: string;
};

function specFor(width: number): Spec {
  const tight = width > 0 && width < 280;
  const height = tight ? 44 : 52;
  const mic = tight ? 15 : 18;
  const voice = tight ? 28 : height - 10;
  return {
    height,
    blur: tight ? 5 : 6,
    plus: tight ? 16 : 20,
    mic,
    voice,
    waveform: tight ? 12 : 14,
    trailing: mic + voice + (tight ? 16 : 28),
    text: tight ? "text-sm" : "text-base",
  };
}

export function Composer({ compact = false }: LabComponentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spec = specFor(width);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setWidth(Math.round(frame.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  const filterId = `gooey${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const shift = useMotionValue(0);
  const sprung = useSpring(shift, SPRING);
  const progress = prefersReducedMotion ? shift : sprung;
  const height = spec.height;
  const fieldLeft = useTransform(
    progress,
    (value) => value * height * FIELD_OPEN,
  );
  const paddingLeft = useTransform(
    progress,
    (value) => height * (REST_TEXT + value * (OPEN_INSET - REST_TEXT)),
  );
  const plusLeft = useTransform(
    progress,
    (value) => height * PLUS_NUDGE * (1 - value),
  );

  useEffect(() => {
    shift.set(open ? 1 : 0);
  }, [open, shift]);

  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    if (!viewport) return;
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    let baseViewport = viewport.height;
    let baseInner = window.innerHeight;

    function onResize() {
      const current = window.visualViewport;
      if (!current) return;
      const viewportGrew = current.height - baseViewport;
      const innerGrew = window.innerHeight - baseInner;
      if (current.height < baseViewport) baseViewport = current.height;
      if (window.innerHeight < baseInner) baseInner = window.innerHeight;
      const input = inputRef.current;
      if (
        Math.max(viewportGrew, innerGrew) < 140 ||
        !input ||
        document.activeElement !== input
      ) {
        return;
      }
      input.blur();
    }

    viewport.addEventListener("resize", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      viewport.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <LabStage compact={compact}>
      <div
        ref={frameRef}
        className="relative w-full max-w-80"
        style={{ height: spec.height }}
      >
        <GooLayer
          filterId={filterId}
          filtered={!prefersReducedMotion}
          blur={spec.blur}
          pillLeft={fieldLeft}
          height={spec.height}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-20 flex items-center justify-center text-text"
          style={{ left: plusLeft, width: spec.height, height: spec.height }}
        >
          <PlusIcon size={spec.plus} />
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-0 z-10"
          style={{ left: fieldLeft }}
        >
          <motion.input
            ref={inputRef}
            type="text"
            aria-label="Ask ChatGPT"
            placeholder="Ask ChatGPT"
            autoComplete="off"
            spellCheck={false}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            style={{ paddingLeft, paddingRight: spec.trailing }}
            className={cn(
              "h-full w-full appearance-none bg-transparent text-text outline-none",
              "placeholder:text-text-muted focus:bg-transparent",
              "[-webkit-tap-highlight-color:transparent]",
              spec.text,
            )}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center gap-2"
          >
            <MicrophoneIcon className="text-text-secondary" size={spec.mic} />
            <span
              className="flex items-center justify-center rounded-full bg-text text-bg"
              style={{ width: spec.voice, height: spec.voice }}
            >
              <WaveformIcon size={spec.waveform} weight="bold" />
            </span>
          </div>
        </motion.div>
      </div>
    </LabStage>
  );
}

// The shapes are SVG rather than HTML under a CSS `filter: url()`: Safari
// only repaints the box of an HTML child that moved, which leaves stale goo
// in the gap. Filters on SVG content are invalidated as a whole.
function GooLayer({
  filterId,
  filtered,
  blur,
  pillLeft,
  height,
}: {
  filterId: string;
  filtered: boolean;
  blur: number;
  pillLeft: MotionValue<number>;
  height: number;
}) {
  const radius = height / 2;
  // The pill is a round-capped line so its right end can sit at `100%` and
  // follow the frame without a measured width; the shift pulls that end back
  // inside the bleed.
  const pillShift = BLEED + radius;
  const pillStart = useTransform(
    pillLeft,
    (value) => value + BLEED + radius + pillShift,
  );
  const repaintNudge = useTransform(pillLeft, (value) => value / 10);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute"
      style={{
        inset: -BLEED,
        width: `calc(100% + ${BLEED * 2}px)`,
        height: height + BLEED * 2,
      }}
    >
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
      <g filter={filtered ? `url(#${filterId})` : undefined}>
        {/* Safari repaints only the box of the shape that moved, but the goo
            reaches past it, so a moving pill leaves its old fringe behind.
            This all-but-invisible rect spans the filter region and changes
            with the pill, which makes every frame repaint all of it. */}
        <motion.rect
          width="100%"
          height="100%"
          rx={repaintNudge}
          fillOpacity={0.001}
        />
        <motion.line
          className="stroke-surface"
          x1={pillStart}
          x2="100%"
          y1={BLEED + radius}
          y2={BLEED + radius}
          strokeWidth={height}
          strokeLinecap="round"
          transform={`translate(${-pillShift} 0)`}
        />
        <circle
          className="fill-surface"
          cx={BLEED + radius}
          cy={BLEED + radius}
          r={radius}
        />
      </g>
    </svg>
  );
}
