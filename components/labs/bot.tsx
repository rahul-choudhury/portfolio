"use client";

import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./bot.module.css";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

const CENTER = 50;
const FACE_R = 32;
const BADGE = { x: 0.814, y: 0.81, r: 0.285 };
const BADGE_GAP = 0.05;
const BADGE_COLOR = "#FF781C";

const DEG = Math.PI / 180;
// Eyes sit on a unit sphere, this far around from the front.
const EYE_SPREAD = Math.atan2(0.31535, 0.94898);
const CAPSULE_HALF = 0.155;
const CAPSULE_WID = 0.13;
// Idle glance, then a turn toward the pointer. Angles are the sphere's pitch, yaw, and roll.
const REST_TURN = { pitch: -15.9 * DEG, yaw: 33.29 * DEG, roll: 25.38 * DEG };
const LOOK_YAW = 18 * DEG;
const LOOK_PITCH = 14 * DEG;

type Vec3 = [number, number, number];
type Quat = [number, number, number, number];
type Look = { x: number; y: number; hold: number };

const REST_LOOK: Look = { x: 0, y: 0, hold: 0 };

const OUTLINE = capsuleOutline();

function capsuleOutline() {
  const steps = 8;
  const points: Array<[number, number]> = [
    [CAPSULE_WID, -CAPSULE_HALF],
    [CAPSULE_WID, CAPSULE_HALF],
  ];

  for (let i = 1; i < steps; i++) {
    const angle = (Math.PI * i) / steps;
    points.push([
      CAPSULE_WID * Math.cos(angle),
      CAPSULE_HALF + CAPSULE_WID * Math.sin(angle),
    ]);
  }

  points.push([-CAPSULE_WID, CAPSULE_HALF], [-CAPSULE_WID, -CAPSULE_HALF]);

  for (let i = 1; i < steps; i++) {
    const angle = Math.PI + (Math.PI * i) / steps;
    points.push([
      CAPSULE_WID * Math.cos(angle),
      -CAPSULE_HALF + CAPSULE_WID * Math.sin(angle),
    ]);
  }

  return points;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function axisAngle(x: number, y: number, z: number, angle: number): Quat {
  const half = Math.sin(angle / 2);
  return [Math.cos(angle / 2), x * half, y * half, z * half];
}

function multiplyQuat(a: Quat, b: Quat): Quat {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}

function turnQuat(pitch: number, yaw: number, roll: number): Quat {
  return multiplyQuat(
    axisAngle(0, 0, 1, roll),
    multiplyQuat(axisAngle(0, 1, 0, yaw), axisAngle(1, 0, 0, pitch)),
  );
}

function rotate(q: Quat, v: Vec3): Vec3 {
  const [t, n, r, i] = q;
  const m = [
    1 - 2 * (r * r + i * i),
    2 * (n * r - t * i),
    2 * (n * i + t * r),
    2 * (n * r + t * i),
    1 - 2 * (n * n + i * i),
    2 * (r * i - t * n),
    2 * (n * i - t * r),
    2 * (r * i + t * n),
    1 - 2 * (n * n + r * r),
  ];

  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function eyeFrame(sign: 1 | -1) {
  const s = Math.sin(EYE_SPREAD) * sign;
  const c = Math.cos(EYE_SPREAD);
  const center: Vec3 = [s, 0, c];
  const across: Vec3 = [c * sign, 0, -Math.sin(EYE_SPREAD)];
  const up: Vec3 = [0, 1, 0];
  return { center, across, up };
}

const FRAMES = { left: eyeFrame(-1), right: eyeFrame(1) };

function eyePath(sign: 1 | -1, look: Look) {
  const pitch = lerp(REST_TURN.pitch, -LOOK_PITCH * look.y, look.hold);
  const yaw = lerp(REST_TURN.yaw, LOOK_YAW * look.x, look.hold);
  const roll = lerp(REST_TURN.roll, 0, look.hold);
  const turn = turnQuat(pitch, yaw, roll);
  const frame = sign === 1 ? FRAMES.right : FRAMES.left;
  const commands = OUTLINE.map(([across, along], index) => {
    const distance = Math.hypot(across, along);
    const sinc = distance > 1e-8 ? Math.sin(distance) / distance : 1;
    const lifted: Vec3 = [
      Math.cos(distance) * frame.center[0] +
        sinc * (across * frame.across[0] + along * frame.up[0]),
      Math.cos(distance) * frame.center[1] +
        sinc * (across * frame.across[1] + along * frame.up[1]),
      Math.cos(distance) * frame.center[2] +
        sinc * (across * frame.across[2] + along * frame.up[2]),
    ];
    const [x, y] = rotate(turn, lifted);
    const command = `${CENTER + x * FACE_R} ${CENTER - y * FACE_R}`;
    return `${index === 0 ? "M" : "L"}${command}`;
  });

  return `${commands.join(" ")}Z`;
}

function starPoints(cx: number, cy: number, outer: number, inner: number) {
  const points: string[] = [];

  for (let i = 0; i < 5; i++) {
    const outerAngle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const innerAngle = outerAngle + Math.PI / 5;
    points.push(
      `${cx + Math.cos(outerAngle) * outer},${cy + Math.sin(outerAngle) * outer}`,
      `${cx + Math.cos(innerAngle) * inner},${cy + Math.sin(innerAngle) * inner}`,
    );
  }

  return points.join(" ");
}

export function Bot({ compact = false }: LabComponentProps) {
  const maskId = useId().replaceAll(":", "");
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedRef = useRef(prefersReducedMotion);
  const [look, setLook] = useState<Look>(REST_LOOK);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    const mark = markRef.current;
    if (!stage || !mark || compact) return;
    const markEl: SVGSVGElement = mark;

    const gaze = { x: 0, y: 0 };
    let hold = 0;
    let target: { x: number; y: number } | null = null;
    let frame = 0;
    let last = 0;
    let running = false;

    function paint() {
      setLook({ x: gaze.x, y: gaze.y, hold });
    }

    function tick(now: number) {
      const dt = last === 0 ? 1 / 60 : Math.min(0.05, (now - last) / 1000);
      last = now;
      const step = reducedRef.current ? 1 : 1 - 0.86 ** (dt * 60);
      const goalX = target?.x ?? gaze.x;
      const goalY = target?.y ?? gaze.y;
      const goalHold = target ? 1 : 0;

      gaze.x += (goalX - gaze.x) * step;
      gaze.y += (goalY - gaze.y) * step;
      hold += (goalHold - hold) * step;
      paint();

      const settled =
        Math.abs(goalX - gaze.x) < 0.001 &&
        Math.abs(goalY - gaze.y) < 0.001 &&
        Math.abs(goalHold - hold) < 0.001;

      if (settled) {
        gaze.x = goalX;
        gaze.y = goalY;
        hold = goalHold;
        paint();
        running = false;
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    function wake() {
      if (running) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    }

    function lookAt(event: PointerEvent) {
      if (event.pointerType === "touch") return;

      const bounds = markEl.getBoundingClientRect();
      const range = Math.max(bounds.width, 1) * 0.5;
      target = {
        x: clamp(
          (event.clientX - (bounds.left + bounds.width / 2)) / range,
          -1,
          1,
        ),
        y: clamp(
          -(event.clientY - (bounds.top + bounds.height / 2)) / range,
          -1,
          1,
        ),
      };
      wake();
    }

    function release(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      target = null;
      wake();
    }

    stage.addEventListener("pointermove", lookAt);
    stage.addEventListener("pointerleave", release);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", lookAt);
      stage.removeEventListener("pointerleave", release);
    };
  }, [compact]);

  const badgeCx = CENTER + BADGE.x * FACE_R;
  const badgeCy = CENTER + BADGE.y * FACE_R;
  const badgeR = BADGE.r * FACE_R;
  const holeR = badgeR + BADGE_GAP * FACE_R;

  return (
    <LabStage compact={compact} fill>
      <div ref={stageRef} className={styles.area}>
        <svg
          ref={markRef}
          viewBox="0 0 100 100"
          aria-hidden="true"
          className={styles.mark}
          data-compact={compact}
        >
          <defs>
            <mask id={maskId}>
              <circle cx={CENTER} cy={CENTER} r={FACE_R} fill="white" />
              <circle cx={badgeCx} cy={badgeCy} r={holeR} fill="black" />
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={FACE_R}
              className={styles.face}
            />
            <path d={eyePath(-1, look)} className={styles.eye} />
            <path d={eyePath(1, look)} className={styles.eye} />
          </g>
          <circle
            cx={badgeCx}
            cy={badgeCy}
            r={holeR}
            className={styles.badgeGap}
          />
          <circle cx={badgeCx} cy={badgeCy} r={badgeR} fill={BADGE_COLOR} />
          <polygon
            points={starPoints(badgeCx, badgeCy, badgeR * 0.56, badgeR * 0.24)}
            fill="#fff"
          />
        </svg>
      </div>
    </LabStage>
  );
}
