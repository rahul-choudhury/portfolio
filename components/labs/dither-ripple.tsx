"use client";

import { Button } from "@rahul-choudhury/ui/components";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

const CELL = 3;
const DURATION_MS = 720;
const RING_WIDTH = 0.38;

type Ripple = {
  id: number;
  x: number;
  y: number;
  start: number;
  /** Per-ripple seed so the noise field is random but stable across frames. */
  seed: number;
};

/** Deterministic 0–1 hash for a cell inside a ripple's noise field. */
function cellNoise(cellX: number, cellY: number, seed: number) {
  let n = seed ^ (cellX * 374761393) ^ (cellY * 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}

type Ink = {
  r: number;
  g: number;
  b: number;
};

function resolveInk(element: Element): Ink {
  const probe = document.createElement("span");
  probe.style.color = "var(--color-accent-foreground)";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  element.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();

  const match = resolved.match(
    /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/,
  );
  if (!match) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function sampleRipple(dist: number, radius: number, life: number): number {
  if (radius <= 0 || dist > radius) return 0;

  const normalized = dist / radius;
  const ring = 1 - Math.abs(normalized - (1 - RING_WIDTH * 0.55)) / RING_WIDTH;
  const fill = (1 - normalized) ** 1.35 * 0.55;
  const wave = Math.max(ring, fill);

  return Math.min(1, Math.max(0, wave * (1 - life * 0.72) * 1.15));
}

export function DitherRipple({ compact = false }: LabComponentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const frameRef = useRef<number | null>(null);
  const inkRef = useRef<Ink>({ r: 255, g: 255, b: 255 });
  const sizeRef = useRef({ width: 0, height: 0, maxRadius: 1 });
  const [rippleSeed, setRippleSeed] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const syncMetrics = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      // CSS-pixel buffer keeps the dither cells chunky and crisp.
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      sizeRef.current = {
        width,
        height,
        maxRadius: Math.hypot(width, height) * 1.05,
      };
      inkRef.current = resolveInk(stage);
    };

    syncMetrics();

    const observer = new ResizeObserver(syncMetrics);
    observer.observe(stage);

    const themeObserver = new MutationObserver(() => {
      inkRef.current = resolveInk(stage);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = (now: number) => {
      const { width, height, maxRadius } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      const active = ripplesRef.current.filter(
        (ripple) => now - ripple.start < DURATION_MS,
      );
      ripplesRef.current = active;

      if (active.length === 0) {
        frameRef.current = null;
        return;
      }

      const ink = inkRef.current;
      const image = context.createImageData(width, height);
      const { data } = image;

      for (const ripple of active) {
        const life = (now - ripple.start) / DURATION_MS;
        const radius = easeOutCubic(Math.min(1, life)) * maxRadius;

        for (let y = 0; y < height; y += CELL) {
          for (let x = 0; x < width; x += CELL) {
            const cx = x + CELL / 2;
            const cy = y + CELL / 2;
            const dist = Math.hypot(cx - ripple.x, cy - ripple.y);
            const intensity = sampleRipple(dist, radius, life);
            if (intensity <= 0) continue;

            const threshold = cellNoise(x / CELL, y / CELL, ripple.seed);
            if (intensity < threshold) continue;

            // Stochastic threshold already implies shade; alpha softens the exit.
            const shade = 0.72 + intensity * 0.28;
            const alpha = Math.round(255 * shade);

            for (let dy = 0; dy < CELL && y + dy < height; dy++) {
              for (let dx = 0; dx < CELL && x + dx < width; dx++) {
                const index = ((y + dy) * width + (x + dx)) * 4;
                if (data[index + 3] >= alpha) continue;
                data[index] = ink.r;
                data[index + 1] = ink.g;
                data[index + 2] = ink.b;
                data[index + 3] = alpha;
              }
            }
          }
        }
      }

      context.putImageData(image, 0, 0);
      frameRef.current = window.requestAnimationFrame(draw);
    };

    if (ripplesRef.current.length > 0 && frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(draw);
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [rippleSeed]);

  function spawnRipple(event: ReactPointerEvent<HTMLButtonElement>) {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();

    const seed = (Math.random() * 0xffffffff) >>> 0;

    if (prefersReducedMotion) {
      ripplesRef.current = [
        {
          id: now,
          x,
          y,
          start: now - DURATION_MS * 0.55,
          seed,
        },
      ];
    } else {
      ripplesRef.current = [
        ...ripplesRef.current.slice(-2),
        { id: now, x, y, start: now, seed },
      ];
    }

    setRippleSeed((value) => value + 1);
  }

  return (
    <LabStage compact={compact}>
      <div className="flex items-center justify-center">
        <div
          ref={stageRef}
          className="relative inline-flex overflow-hidden rounded-sm"
        >
          <Button
            size={compact ? "md" : "lg"}
            className="rounded-sm px-5 shadow-sm"
            onPointerDown={spawnRipple}
          >
            Press me
          </Button>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full rounded-[inherit]"
          />
        </div>
      </div>
    </LabStage>
  );
}
