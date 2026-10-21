"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "@rahul-choudhury/ui";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefCallback,
} from "react";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

const SPRING = { stiffness: 120, damping: 20, mass: 1 };

type Spec = {
  width: number;
  height: number;
  blob: number;
  icon: number;
  inset: number;
  exit: number;
  blur: number;
};

function specFor(compact: boolean): Spec {
  const height = compact ? 36 : 40;
  const blob = compact ? 22 : 24;
  const inset = (height - blob) / 2;
  const settledGap = compact ? 8 : 10;
  const gap = settledGap + (height - blob) / 2;

  return {
    width: compact ? 220 : 280,
    height,
    blob,
    icon: compact ? 14 : 16,
    inset,
    exit: -(inset + blob + gap),
    blur: compact ? 6 : 7,
  };
}

function useGooTravel(
  active: boolean,
  distance: number,
  reduced: boolean,
  endScale: number,
) {
  const shift = useMotionValue(0);
  const sprung = useSpring(shift, SPRING);
  const x = reduced ? shift : sprung;

  useEffect(() => {
    shift.set(active ? distance : 0);
  }, [active, distance, shift]);

  const progress = useTransform(x, [0, distance], [0, 1]);
  const scaleX = useTransform(
    progress,
    [0, 0.18, 0.42, 0.64, 0.82, 1],
    [1, 1.16, 0.58, 1.02, endScale, endScale],
  );
  const scaleY = useTransform(
    progress,
    [0, 0.18, 0.42, 0.64, 0.82, 1],
    [1, 0.9, 1.32, 1.02, endScale, endScale],
  );
  const lipScale = useTransform(
    progress,
    [0, 0.1, 0.32, 0.5, 0.64],
    [0, 0.15, 1, 0.4, 0],
  );

  return { x, progress, scaleX, scaleY, lipScale };
}

function gooRelease(progress: number) {
  const t = Math.min(1, Math.max(0, (progress - 0.62) / 0.14));
  return 1 - (1 - t) * (1 - t);
}

export function GooeyInput({ compact = false }: LabComponentProps) {
  const spec = specFor(compact);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterId = `gooey${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const blurFilterRef = useRef<SVGFEGaussianBlurElement>(null);
  const matrixFilterRef = useRef<SVGFEColorMatrixElement>(null);
  const travel = useGooTravel(
    focused,
    spec.exit,
    prefersReducedMotion,
    spec.height / spec.blob,
  );
  const paddingLeft = useTransform(
    travel.progress,
    [0, 1],
    [spec.inset + spec.blob + 6, compact ? 12 : 14],
  );

  const softenSeparation = useCallback(
    (progress: number) => {
      const released = gooRelease(progress);
      const slope = 20 + (1 - 20) * released;
      const offset = -8 * (1 - released);
      const blur = spec.blur * (1 - released);
      blurFilterRef.current?.setStdDeviation(blur, blur);
      matrixFilterRef.current?.setAttribute(
        "values",
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${slope} ${offset}`,
      );
    },
    [spec.blur],
  );

  useMotionValueEvent(travel.progress, "change", softenSeparation);

  useEffect(() => {
    if (!focused) return;
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
  }, [focused]);

  const assignGooFilter = useCallback<RefCallback<HTMLDivElement>>(
    (node) => {
      if (!node) return;
      node.style.filter = prefersReducedMotion
        ? ""
        : `url(${window.location.href.split("#")[0]}#${filterId})`;
    },
    [filterId, prefersReducedMotion],
  );

  const lip = spec.blob * 0.62;

  return (
    <LabStage compact={compact}>
      <div
        className="relative"
        style={{ width: spec.width, height: spec.height }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute size-0"
        >
          <defs>
            <filter
              id={filterId}
              x="-120%"
              y="-160%"
              width="280%"
              height="420%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                ref={blurFilterRef}
                in="SourceGraphic"
                stdDeviation={spec.blur}
                result="blur"
              />
              <feColorMatrix
                ref={matrixFilterRef}
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        <div
          aria-hidden="true"
          ref={assignGooFilter}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 rounded-full bg-surface" />
          <GooCircle size={lip} left={-lip / 2} scale={travel.lipScale} />
          <GooCircle
            size={spec.blob}
            left={spec.inset}
            x={travel.x}
            scaleX={travel.scaleX}
            scaleY={travel.scaleY}
          />
        </div>

        <motion.input
          ref={inputRef}
          type="search"
          aria-label="Search"
          placeholder="Search"
          autoComplete="off"
          spellCheck={false}
          onPointerDown={() => setFocused(true)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ paddingLeft }}
          className={cn(
            "absolute inset-0 h-full w-full appearance-none bg-transparent text-text outline-none",
            "placeholder:text-text-muted",
            "[&::-webkit-search-cancel-button]:appearance-none",
            "[&::-webkit-search-decoration]:appearance-none",
            compact ? "pr-3 text-sm" : "pr-3.5 text-base",
          )}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 flex items-center justify-center text-text-secondary"
          style={{
            width: spec.blob,
            height: spec.blob,
            left: spec.inset,
            x: travel.x,
            y: "-50%",
          }}
        >
          <MagnifyingGlassIcon size={spec.icon} />
        </motion.div>
      </div>
    </LabStage>
  );
}

function GooCircle({
  size,
  left,
  x,
  scale,
  scaleX,
  scaleY,
}: {
  size: number;
  left: number;
  x?: MotionValue<number>;
  scale?: MotionValue<number>;
  scaleX?: MotionValue<number>;
  scaleY?: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute top-1/2 rounded-full bg-surface"
      style={{
        width: size,
        height: size,
        left,
        x,
        y: "-50%",
        scale,
        scaleX,
        scaleY,
      }}
    />
  );
}
