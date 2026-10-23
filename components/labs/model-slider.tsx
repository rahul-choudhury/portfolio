"use client";

import { cn } from "@rahul-choudhury/ui";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { CheckIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

const BLUE = "#339cff";
const PURPLE = "#ad7bf9";
const THUMB = 28;
const INSET = THUMB / 2 - 1;

const EFFORTS = [
  { id: "low", label: "Light", maximum: false },
  { id: "medium", label: "Medium", maximum: false },
  { id: "high", label: "High", maximum: false },
  { id: "xhigh", label: "Extra High", maximum: false },
  { id: "max", label: "Max", maximum: false },
  { id: "ultra", label: "Ultra", maximum: true },
] as const;

type EffortId = (typeof EFFORTS)[number]["id"];

type Model = {
  slug: string;
  name: string;
  efforts: readonly EffortId[];
  defaultEffort: EffortId;
};

const WITH_ULTRA: EffortId[] = [
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
];
const WITHOUT_ULTRA: EffortId[] = ["low", "medium", "high", "xhigh", "max"];

const MODELS: Model[] = [
  {
    slug: "gpt-6.1-sol",
    name: "GPT-6.1 Sol",
    efforts: WITH_ULTRA,
    defaultEffort: "low",
  },
  {
    slug: "gpt-6-astra",
    name: "GPT-6 Astra",
    efforts: WITH_ULTRA,
    defaultEffort: "low",
  },
  {
    slug: "gpt-6-sol",
    name: "GPT-6 Sol",
    efforts: WITH_ULTRA,
    defaultEffort: "medium",
  },
  {
    slug: "gpt-6-luna",
    name: "GPT-6 Luna",
    efforts: WITHOUT_ULTRA,
    defaultEffort: "medium",
  },
  {
    slug: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    efforts: WITH_ULTRA,
    defaultEffort: "low",
  },
  {
    slug: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    efforts: WITH_ULTRA,
    defaultEffort: "medium",
  },
  {
    slug: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    efforts: WITHOUT_ULTRA,
    defaultEffort: "medium",
  },
];

type Stop = { model: string; effort: EffortId };

const DEFAULT_STOPS: Stop[] = [
  { model: "gpt-6-luna", effort: "low" },
  { model: "gpt-6.1-sol", effort: "low" },
  { model: "gpt-6.1-sol", effort: "medium" },
  { model: "gpt-6-astra", effort: "low" },
  { model: "gpt-6-astra", effort: "medium" },
];

const DEFAULT_INDEX = 1;

const BOLT_OUTLINE =
  "M8.34282 1.71275C9.03761 1.01858 10.2545 1.66989 10.0137 2.66392L9.3272 5.49595H12.5938C13.5716 5.49595 14.1035 6.63865 13.4737 7.38658L7.7227 14.2157C7.04238 15.0227 5.73784 14.3618 5.98638 13.3358L6.6729 10.5038H3.4063C2.42851 10.5038 1.89659 9.36106 2.52642 8.61314L8.27739 1.78404L8.34282 1.71275ZM3.32915 9.2899C3.2748 9.35494 3.32141 9.45396 3.4063 9.45396H7.02251C7.5244 9.45398 7.89369 9.9242 7.77544 10.412L7.05669 13.3758L12.6709 6.70982C12.7253 6.64478 12.6787 6.54576 12.5938 6.54576H8.97759C8.47569 6.54574 8.10641 6.07552 8.22466 5.58775L8.94243 2.62291L3.32915 9.2899Z";

const BOLT_FILL =
  "M8.34278 1.71324C9.03756 1.01907 10.2544 1.67038 10.0137 2.66441L9.32715 5.49644H12.5938C13.5715 5.49644 14.1035 6.63914 13.4736 7.38707L7.72266 14.2162C7.04234 15.0231 5.73791 14.3622 5.98633 13.3363L6.67285 10.5043H3.40625C2.42855 10.5042 1.89667 9.36153 2.52637 8.61363L8.27735 1.78453L8.34278 1.71324Z";

const RESET_PATH =
  "M7.99976 1.64111C11.5112 1.64113 14.358 4.48806 14.3582 7.99951C14.3582 11.5111 11.5113 14.3579 7.99976 14.3579C4.97337 14.3578 2.4422 12.244 1.79956 9.4126C1.7354 9.12984 1.91231 8.84785 2.19507 8.78369C2.4778 8.71959 2.75884 8.89745 2.823 9.18018C3.35943 11.5439 5.47433 13.308 7.99976 13.3081C10.9314 13.3081 13.3083 10.9312 13.3083 7.99951C13.3082 5.06796 10.9313 2.69191 7.99976 2.69189C5.96105 2.69201 4.19199 3.84248 3.30249 5.53076H4.75952C5.04939 5.53086 5.28394 5.76626 5.28394 6.05615C5.28376 6.34589 5.04928 6.58047 4.75952 6.58057H2.16675C1.87691 6.58057 1.64153 6.34595 1.64136 6.05615V3.13916C1.64136 2.84921 1.8768 2.61377 2.16675 2.61377C2.4567 2.61377 2.69214 2.84921 2.69214 3.13916V4.50049C3.82929 2.77918 5.78081 1.64122 7.99976 1.64111Z";

const CHEVRON_PATH =
  "M4.71677 7.71677C4.56056 7.87298 4.56056 8.12696 4.71677 8.28317C4.87298 8.43938 5.12696 8.43938 5.28317 8.28317L7.10642 6.45993C7.36023 6.20609 7.36023 5.79384 7.10642 5.54001L5.28317 3.71677C5.12696 3.56056 4.87298 3.56056 4.71677 3.71677C4.56056 3.87298 4.56056 4.12696 4.71677 4.28317L6.43356 5.99997L4.71677 7.71677Z";

const BURST = [
  [-3, -34],
  [15, -29],
  [30, -19],
  [34, -2],
  [26, 20],
  [12, 31],
  [-6, 34],
  [-22, 26],
  [-32, 9],
  [-32, -10],
  [-21, -26],
  [7, -24],
  [24, -9],
  [20, 10],
  [-9, 21],
  [-25, -5],
];

function modelBySlug(slug: string) {
  return MODELS.find((model) => model.slug === slug) ?? MODELS[0];
}

function effortById(id: EffortId) {
  return EFFORTS.find((effort) => effort.id === id) ?? EFFORTS[0];
}

function endInset(percent: number) {
  return INSET - (percent / 50) * INSET;
}

function correction(percent: number, steps: number) {
  if (steps <= 0) return 0;
  const gap = 100 / steps;
  const reach = Math.min(percent / gap, (100 - percent) / gap, 1);
  return endInset(percent) * reach;
}

function centerOf(percent: number) {
  return `calc(${percent}% + ${endInset(percent)}px)`;
}

function fillTransform(percent: number, steps: number) {
  if (steps <= 0) return "translateX(-100%)";
  const shift = correction(percent, steps);
  return `translateX(calc(${percent - 100}% + ${shift}px))`;
}

function percentFor(index: number, count: number) {
  if (count <= 1) return 0;
  return (index / (count - 1)) * 100;
}

function nearestIndex(clientX: number, rect: DOMRect, count: number) {
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < count; index += 1) {
    const percent = percentFor(index, count);
    const center = rect.left + (percent / 100) * rect.width + endInset(percent);
    const distance = Math.abs(clientX - center);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  }
  return best;
}

export function ModelSlider({ compact = false }: LabComponentProps) {
  const reduced = usePrefersReducedMotion();
  const [explicitSlug, setExplicitSlug] = useState<string | null>(null);
  const [defaultIndex, setDefaultIndex] = useState(DEFAULT_INDEX);
  const [effort, setEffort] = useState<EffortId>("low");
  const [fast, setFast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [thumbHot, setThumbHot] = useState(false);
  const [ultraWarning, setUltraWarning] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [fastTip, setFastTip] = useState(false);
  const [resetTip, setResetTip] = useState(false);
  const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(DEFAULT_INDEX);
  const [panelHeight, setPanelHeight] = useState<number | "auto">("auto");
  const [animateHeight, setAnimateHeight] = useState(false);
  const draggingRef = useRef(false);
  const labelId = useId();

  const explicit = explicitSlug ? modelBySlug(explicitSlug) : null;
  const stops: Stop[] = explicit
    ? explicit.efforts.map((id) => ({ model: explicit.slug, effort: id }))
    : DEFAULT_STOPS;
  const index = explicit
    ? Math.max(
        0,
        stops.findIndex((stop) => stop.effort === effort),
      )
    : Math.min(defaultIndex, stops.length - 1);
  const stop = stops[index] ?? stops[0];
  const model = modelBySlug(stop.model);
  const effortMeta = effortById(stop.effort);
  const maximum = Boolean(effortMeta.maximum);
  const percent = percentFor(index, stops.length);
  const motionMs = reduced ? 0 : dragging ? 150 : 300;

  useEffect(() => {
    return () => {
      if (warningTimer.current) clearTimeout(warningTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    let seen = false;
    const measure = () => {
      const next = node.offsetHeight;
      if (seen) setAnimateHeight(true);
      seen = true;
      setPanelHeight(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function showUltraWarning() {
    setUltraWarning(true);
    setBurstKey((key) => key + 1);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    warningTimer.current = setTimeout(() => setUltraWarning(false), 2000);
  }

  function selectIndex(next: number) {
    const clamped = Math.max(0, Math.min(stops.length - 1, next));
    const nextStop = stops[clamped];
    if (!nextStop || clamped === indexRef.current) return;
    indexRef.current = clamped;
    const enteringUltra = effortById(nextStop.effort).maximum && !maximum;
    if (explicit) setEffort(nextStop.effort);
    else setDefaultIndex(clamped);
    if (enteringUltra) showUltraWarning();
    else if (!effortById(nextStop.effort).maximum) setUltraWarning(false);
  }

  function selectModel(slug: string | null) {
    setMenuOpen(false);
    setUltraWarning(false);
    if (slug == null) {
      indexRef.current = DEFAULT_INDEX;
      setExplicitSlug(null);
      setDefaultIndex(DEFAULT_INDEX);
      setEffort("low");
      return;
    }
    const next = modelBySlug(slug);
    indexRef.current = Math.max(
      0,
      next.efforts.findIndex((id) => id === next.defaultEffort),
    );
    setExplicitSlug(slug);
    setEffort(next.defaultEffort);
  }

  function onSliderPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || stops.length < 2) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setDragging(true);
    selectIndex(
      nearestIndex(
        event.clientX,
        event.currentTarget.getBoundingClientRect(),
        stops.length,
      ),
    );
  }

  function onSliderPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    selectIndex(
      nearestIndex(
        event.clientX,
        event.currentTarget.getBoundingClientRect(),
        stops.length,
      ),
    );
  }

  function stopDragging() {
    draggingRef.current = false;
    setDragging(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      selectIndex(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      selectIndex(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectIndex(stops.length - 1);
    }
  }

  const valueText = explicit
    ? `${effortMeta.label}, ${model.name}`
    : `${model.name} ${effortMeta.label}`;
  const boltColor = fast ? (maximum ? PURPLE : BLUE) : "rgba(255,255,255,0.55)";

  return (
    <LabStage compact={compact}>
      <div
        className="relative w-[300px] max-w-full font-medium text-white"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        }}
      >
        {fastTip ? (
          <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-2 z-20 rounded-[10px] bg-[#3a3a3c] px-3 py-2 text-left shadow-lg">
            <p className="text-[13px] leading-4 font-semibold text-white">
              1.5x speed
            </p>
            <p className="text-[13px] leading-4 font-medium text-white/65">
              More usage
            </p>
          </div>
        ) : null}
        {resetTip && explicit ? (
          <div className="pointer-events-none absolute right-2 bottom-[calc(100%+6px)] z-20 rounded-[10px] bg-[#3a3a3c] px-2.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-white shadow-lg">
            Reset to default
          </div>
        ) : null}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#2c2c2e] shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: panelHeight }}
            transition={
              reduced || !animateHeight
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 34, mass: 0.85 }
            }
          >
            <div ref={panelRef} className="p-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.16 }}
                  >
                    <ModelMenu
                      explicitSlug={explicitSlug}
                      onSelect={selectModel}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="slider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.16 }}
                  >
                    <div className="relative flex min-h-9 items-center justify-center px-8">
                      <IconButton
                        label={
                          fast ? "Enable standard mode" : "Enable fast mode"
                        }
                        pressed={fast}
                        className="absolute left-0"
                        style={{ color: boltColor }}
                        onClick={() => setFast((on) => !on)}
                        onHover={setFastTip}
                      >
                        <Bolt filled={fast} />
                      </IconButton>

                      <button
                        type="button"
                        className="max-w-full rounded-md px-1.5 py-0.5 text-center transition-colors hover:bg-white/8"
                        aria-label="Select model"
                        aria-haspopup="listbox"
                        onClick={() => {
                          setFastTip(false);
                          setResetTip(false);
                          setMenuOpen(true);
                        }}
                      >
                        {explicit ? (
                          <span className="flex flex-col items-center leading-tight">
                            <span
                              className="text-base leading-5 font-medium"
                              style={{ color: maximum ? PURPLE : BLUE }}
                            >
                              {effortMeta.label}
                            </span>
                            <span className="flex items-center text-xs font-normal text-white/70">
                              {ultraWarning ? (
                                "Consumes usage limits faster"
                              ) : (
                                <>
                                  {model.name}
                                  <Chevron />
                                </>
                              )}
                            </span>
                          </span>
                        ) : (
                          <span
                            id={labelId}
                            className="flex items-center text-[15px] leading-5 font-medium text-white"
                          >
                            {model.name}
                            <span className="ms-1 text-white/55">
                              {effortMeta.label}
                            </span>
                            <Chevron />
                          </span>
                        )}
                      </button>

                      {explicit ? (
                        <IconButton
                          label="Reset to default"
                          className="absolute right-0"
                          onClick={() => selectModel(null)}
                          onHover={setResetTip}
                        >
                          <ResetIcon />
                        </IconButton>
                      ) : null}
                    </div>

                    <div
                      role="slider"
                      tabIndex={0}
                      aria-label="Power"
                      aria-valuemin={0}
                      aria-valuemax={Math.max(0, stops.length - 1)}
                      aria-valuenow={index}
                      aria-valuetext={valueText}
                      aria-describedby={explicit ? undefined : labelId}
                      onKeyDown={onKeyDown}
                      onPointerDown={onSliderPointerDown}
                      onPointerMove={onSliderPointerMove}
                      onPointerUp={stopDragging}
                      onPointerCancel={stopDragging}
                      onLostPointerCapture={stopDragging}
                      className={cn(
                        "relative mx-1.5 my-0.5 h-8 touch-none select-none",
                        dragging ? "cursor-grabbing" : "cursor-grab",
                      )}
                    >
                      <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 overflow-hidden rounded-full bg-white/10 shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.16)]">
                        <div
                          className="absolute inset-y-0 left-0 w-full overflow-hidden rounded-l-full"
                          style={{
                            background: BLUE,
                            transform: fillTransform(percent, stops.length - 1),
                            transition: `transform ${motionMs}ms cubic-bezier(.23,1,.32,1)`,
                          }}
                        >
                          {maximum ? (
                            <UltraFill reduced={reduced} burstKey={burstKey} />
                          ) : null}
                          {maximum && !fast && !reduced ? (
                            <DriftParticles />
                          ) : null}
                          {fast && !reduced ? <FastParticles /> : null}
                        </div>
                        {stops.map((item, tickIndex) => {
                          const selected = tickIndex <= index;
                          const hidden = maximum || (fast && selected);
                          return (
                            <span
                              key={`${item.model}-${item.effort}`}
                              aria-hidden="true"
                              className="absolute top-1/2 size-1 rounded-full"
                              style={{
                                left: centerOf(
                                  percentFor(tickIndex, stops.length),
                                ),
                                background: selected
                                  ? "#ffffff4d"
                                  : "rgba(174,174,178,0.45)",
                                opacity: hidden ? 0 : 1,
                                transform: `translate(-50%, -50%) scale(${hidden ? 0.75 : 1}) translateX(${fast && selected ? "-85px" : "0px"})`,
                                transition: reduced
                                  ? "none"
                                  : "opacity 200ms ease, transform 200ms ease",
                              }}
                            />
                          );
                        })}
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 z-10 size-7 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: centerOf(percent),
                          transition: `left ${motionMs}ms cubic-bezier(.23,1,.32,1)`,
                        }}
                        onPointerEnter={() => setThumbHot(true)}
                        onPointerLeave={() => setThumbHot(false)}
                      >
                        <motion.span
                          className="absolute inset-0 rounded-full border-[0.5px] border-black/25 bg-white shadow-[0_0_2px_#0000001a]"
                          animate={{
                            scale: thumbHot || dragging ? 32 / 28 : 1,
                          }}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : thumbHot || dragging
                                ? {
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 38,
                                    mass: 1,
                                  }
                                : {
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 26,
                                    mass: 1,
                                  }
                          }
                        />
                        {maximum && burstKey > 0 && !reduced ? (
                          <Burst key={burstKey} />
                        ) : null}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </LabStage>
  );
}

function IconButton({
  label,
  pressed,
  className,
  style,
  children,
  onClick,
  onHover,
}: {
  label: string;
  pressed?: boolean;
  className?: string;
  style?: { color: string };
  children: ReactNode;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      style={style}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg text-white/55",
        className,
      )}
    >
      <span className="flex size-[26px] items-center justify-center rounded-[7px] hover:bg-white/10">
        {children}
      </span>
    </button>
  );
}

function Bolt({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d={filled ? BOLT_FILL : BOLT_OUTLINE} fill="currentColor" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d={RESET_PATH} fill="currentColor" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="shrink-0 text-white/45"
    >
      <path d={CHEVRON_PATH} fill="currentColor" />
    </svg>
  );
}

function ModelMenu({
  explicitSlug,
  onSelect,
}: {
  explicitSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="px-1 py-1" role="listbox" aria-label="Select model">
      <p className="px-2.5 pt-1 pb-1.5 text-[12px] font-medium text-white/45">
        Select model
      </p>
      <MenuRow
        label="Default"
        detail="Recommended set of models"
        selected={explicitSlug == null}
        hovered={hover === "default"}
        onHover={(on) => setHover(on ? "default" : null)}
        onSelect={() => onSelect(null)}
      />
      {MODELS.map((model) => (
        <MenuRow
          key={model.slug}
          label={model.name}
          selected={explicitSlug === model.slug}
          hovered={hover === model.slug}
          onHover={(on) => setHover(on ? model.slug : null)}
          onSelect={() => onSelect(model.slug)}
        />
      ))}
    </div>
  );
}

function MenuRow({
  label,
  detail,
  selected,
  hovered,
  onHover,
  onSelect,
}: {
  label: string;
  detail?: string;
  selected: boolean;
  hovered: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      className={cn(
        "flex w-full items-center gap-3 rounded-[10px] px-2.5 py-1.5 text-left",
        hovered && "bg-white/10",
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] leading-5 font-medium text-white">
          {label}
        </span>
        {detail ? (
          <span className="block text-[12px] leading-4 font-medium text-white/45">
            {detail}
          </span>
        ) : null}
      </span>
      {selected ? (
        <CheckIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-white/80"
        />
      ) : null}
    </button>
  );
}

function hash(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function FastParticles() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {Array.from({ length: 14 }, (_, index) => {
        const pace = 1 + (hash(index, 21) - 0.5) * 0.4;
        const duration = 1.9 / pace;
        return (
          <span
            key={index}
            className="model-slider-fast-path absolute inset-x-0 h-0"
            style={{
              top: `${12 + hash(index, 23) * 76}%`,
              animationDelay: `${index * (1.9 / 14) - duration}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <span
              className="absolute top-0 left-0 size-[3px] rounded-full bg-[#ffffffb8] shadow-[0_0_5px_#ffffff57]"
              style={{
                opacity: 0.4 + hash(index, 11) * 0.6,
                transform: `translate(-50%, -50%) scale(${0.5 + hash(index, 12) * 0.45})`,
              }}
            />
          </span>
        );
      })}
      <style>{`
        .model-slider-fast-path {
          animation-name: model-slider-fast-travel;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes model-slider-fast-travel {
          0% { opacity: 0; transform: translate(100%); }
          8% { opacity: 1; transform: translate(92%); }
          92% { opacity: 1; transform: translate(8%); }
          100% { opacity: 0; transform: translate(0); }
        }
      `}</style>
    </span>
  );
}

function DriftParticles() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 overflow-hidden"
    >
      {Array.from({ length: 14 }, (_, index) => (
        <DriftSpeck key={index} index={index} />
      ))}
    </span>
  );
}

function DriftSpeck({ index }: { index: number }) {
  const [spot, setSpot] = useState(() => driftSpot(index, 1));

  useEffect(() => {
    let timer = 0;
    let salt = 2;
    const step = () => {
      const next = driftSpot(index, salt);
      salt += 1;
      setSpot(next);
      timer = window.setTimeout(step, 1.6 * next.durationScale * 1000);
    };
    const frame = window.requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [index]);

  return (
    <span
      className="absolute size-[3px] rounded-full bg-[#ffffffb8] shadow-[0_0_5px_#ffffff57]"
      style={{
        left: `calc(${4 + hash(index, 14) * 92}% + ${spot.horizontalOffset}px)`,
        top: spot.y,
        opacity: 0.4 + hash(index, 11) * 0.6,
        transform: `translate(-50%, -50%) scale(${0.5 + hash(index, 12) * 0.45})`,
        transitionProperty: "left, top",
        transitionTimingFunction: "cubic-bezier(.45,0,.55,1)",
        transitionDuration: `${1.6 * spot.durationScale}s`,
      }}
    />
  );
}

function driftSpot(index: number, salt: number) {
  const horizontal = hash(index, salt);
  const vertical = hash(index, salt + 17);
  const scale = hash(index, salt + 29);
  return {
    durationScale: 0.8 + scale * 1.2,
    horizontalOffset: Math.round((horizontal - 0.5) * 8),
    y: Math.round(12 + (vertical - 0.5) * 14),
  };
}

function Burst() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 size-[76px] -translate-1/2"
    >
      {BURST.map(([x, y], index) => (
        <span
          key={`${x}-${y}`}
          className="model-slider-burst absolute top-1/2 left-1/2 size-[5px] rounded-full"
          style={{
            background: burstColor(index),
            ["--particle-x" as string]: `${x}px`,
            ["--particle-y" as string]: `${y}px`,
            animationDelay: burstDelay(index),
          }}
        />
      ))}
      <style>{`
        .model-slider-burst {
          animation: model-slider-burst 620ms cubic-bezier(.25,1,.5,1) both;
        }
        @keyframes model-slider-burst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.25); }
          22% { opacity: 1; transform: translate(-50%, -50%) scale(1.28); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(.55); }
        }
      `}</style>
    </span>
  );
}

function burstColor(index: number) {
  if (index === 0) return PURPLE;
  if ((index + 1) % 4 === 3) return "color-mix(in srgb, #ad7bf9 82%, #339cff)";
  if ((index + 1) % 4 === 1) return "color-mix(in srgb, #ad7bf9 68%, #339cff)";
  return PURPLE;
}

function burstDelay(index: number) {
  return (
    [
      "0ms",
      "8ms",
      "0ms",
      "12ms",
      "0ms",
      "10ms",
      "0ms",
      "14ms",
      "0ms",
      "8ms",
      "0ms",
      "6ms",
      "0ms",
      "10ms",
      "0ms",
      "12ms",
    ][index] ?? "0ms"
  );
}

const ULTRA_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  const vec3 COLOR_1 = vec3(0.592, 0.388, 0.945);
  const vec3 COLOR_2 = vec3(0.831, 0.710, 0.953);
  const vec3 COLOR_3 = vec3(0.286, 0.000, 0.404);
  const vec3 COLOR_4 = vec3(0.145, 0.055, 0.478);
  const vec3 COLOR_5 = vec3(0.592, 0.000, 0.996);
  const vec3 COLOR_6 = vec3(0.780, 0.459, 0.914);
  const vec3 COLOR_7 = vec3(0.725, 0.576, 1.000);
  const vec3 COLOR_8 = vec3(0.400, 0.212, 0.820);
  const vec3 COLOR_9 = vec3(0.882, 0.690, 1.000);
  const vec3 COLOR_10 = vec3(0.498, 0.345, 0.957);
  const vec3 COLOR_11 = vec3(0.659, 0.275, 0.910);
  const vec3 COLOR_12 = vec3(0.212, 0.063, 0.400);
  float grain(vec2 uv) {
    vec2 grainUv = uv * uResolution * 0.5;
    return fract(sin(dot(grainUv + uTime, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  }
  float fieldWeight(vec2 point, vec2 center) {
    return exp(-dot(point - center, point - center) * 12.0);
  }
  vec3 fieldColor(vec2 rawUv) {
    const float speed = 1.25;
    vec2 uv = vec2(rawUv.x, 0.40 + rawUv.y * 0.18);
    vec2 spatialScale = vec2(1.55, 1.0);
    vec2 point = uv * spatialScale;
    vec2 center1 = vec2(0.18 + sin(uTime * speed * 0.42) * 0.18, 0.36 + cos(uTime * speed * 0.50) * 0.42) * spatialScale;
    vec2 center2 = vec2(0.34 + cos(uTime * speed * 0.62) * 0.24, 0.62 + sin(uTime * speed * 0.47) * 0.38) * spatialScale;
    vec2 center3 = vec2(0.52 + sin(uTime * speed * 0.38) * 0.28, 0.30 + cos(uTime * speed * 0.58) * 0.36) * spatialScale;
    vec2 center4 = vec2(0.70 + cos(uTime * speed * 0.54) * 0.24, 0.68 + sin(uTime * speed * 0.41) * 0.36) * spatialScale;
    vec2 center5 = vec2(0.88 + sin(uTime * speed * 0.74) * 0.16, 0.36 + cos(uTime * speed * 0.64) * 0.40) * spatialScale;
    vec2 center6 = vec2(0.12 + cos(uTime * speed * 0.48) * 0.20, 0.72 + sin(uTime * speed * 0.70) * 0.30) * spatialScale;
    vec2 center7 = vec2(0.30 + sin(uTime * speed * 0.58) * 0.22, 0.44 + cos(uTime * speed * 0.52) * 0.42) * spatialScale;
    vec2 center8 = vec2(0.46 + cos(uTime * speed * 0.68) * 0.26, 0.72 + sin(uTime * speed * 0.56) * 0.32) * spatialScale;
    vec2 center9 = vec2(0.60 + sin(uTime * speed * 0.44) * 0.28, 0.26 + cos(uTime * speed * 0.60) * 0.38) * spatialScale;
    vec2 center10 = vec2(0.76 + cos(uTime * speed * 0.50) * 0.22, 0.54 + sin(uTime * speed * 0.66) * 0.40) * spatialScale;
    vec2 center11 = vec2(0.92 + sin(uTime * speed * 0.70) * 0.15, 0.66 + cos(uTime * speed * 0.46) * 0.30) * spatialScale;
    vec2 center12 = vec2(0.06 + cos(uTime * speed * 0.40) * 0.14, 0.32 + sin(uTime * speed * 0.60) * 0.40) * spatialScale;
    float weight1 = fieldWeight(point, center1) * (0.7 + 0.3 * sin(uTime * 0.91));
    float weight2 = fieldWeight(point, center2) * (0.7 + 0.3 * cos(uTime * 1.07));
    float weight3 = fieldWeight(point, center3) * (0.7 + 0.3 * sin(uTime * 0.76));
    float weight4 = fieldWeight(point, center4) * (0.7 + 0.3 * cos(uTime * 1.18));
    float weight5 = fieldWeight(point, center5) * (0.7 + 0.3 * sin(uTime * 1.03));
    float weight6 = fieldWeight(point, center6) * (0.7 + 0.3 * cos(uTime * 0.83));
    float weight7 = fieldWeight(point, center7) * (0.7 + 0.3 * sin(uTime * 1.24));
    float weight8 = fieldWeight(point, center8) * (0.7 + 0.3 * cos(uTime * 0.96));
    float weight9 = fieldWeight(point, center9) * (0.7 + 0.3 * sin(uTime * 1.11));
    float weight10 = fieldWeight(point, center10) * (0.7 + 0.3 * cos(uTime * 0.72));
    float weight11 = fieldWeight(point, center11) * (0.7 + 0.3 * sin(uTime * 1.29));
    float weight12 = fieldWeight(point, center12) * (0.7 + 0.3 * cos(uTime * 0.88));
    float totalWeight = max(weight1 + weight2 + weight3 + weight4 + weight5 + weight6 + weight7 + weight8 + weight9 + weight10 + weight11 + weight12, 0.0001);
    vec3 color = (COLOR_1 * weight1 + COLOR_2 * weight2 + COLOR_3 * weight3 + COLOR_4 * weight4 + COLOR_5 * weight5 + COLOR_6 * weight6 + COLOR_7 * weight7 + COLOR_8 * weight8 + COLOR_9 * weight9 + COLOR_10 * weight10 + COLOR_11 * weight11 + COLOR_12 * weight12) / totalWeight;
    color = mix(COLOR_4, color, 0.96);
    return pow(clamp(color, vec3(0.0), vec3(1.0)), vec3(0.9));
  }
  void main() {
    vec3 color = fieldColor(vUv);
    color += grain(vUv) * 0.012;
    color.r += sin(uTime * 0.5) * 0.02;
    color.g += cos(uTime * 0.7) * 0.02;
    color.b += sin(uTime * 0.6) * 0.02;
    color = pow(color, vec3(0.92));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ULTRA_VERTEX = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

function UltraFill({
  reduced,
  burstKey,
}: {
  reduced: boolean;
  burstKey: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const program = link(gl, ULTRA_VERTEX, ULTRA_FRAGMENT);
    if (!program) return;
    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }
    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const time = gl.getUniformLocation(program, "uTime");
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const started = performance.now();
    let frame = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(Math.round(rect.width), 1);
      const height = Math.max(Math.round(rect.height), 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, reduced ? 0 : (performance.now() - started) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const tick = () => {
      draw();
      frame = window.requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    if (!reduced) frame = window.requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [reduced]);

  return (
    <span
      aria-hidden="true"
      key={burstKey}
      className="pointer-events-none absolute -inset-px overflow-hidden"
    >
      <span className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,#339cff_60%,#ad7bf9),#ad7bf9_55%,color-mix(in_srgb,#ad7bf9_72%,#339cff))]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full mix-blend-luminosity"
      />
    </span>
  );
}

function link(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertex = shader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = shader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const compiled = gl.createShader(type);
  if (!compiled) return null;
  gl.shaderSource(compiled, source);
  gl.compileShader(compiled);
  if (!gl.getShaderParameter(compiled, gl.COMPILE_STATUS)) {
    gl.deleteShader(compiled);
    return null;
  }
  return compiled;
}
