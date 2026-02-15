import type { Easing } from "motion/react";

export const animation = {
  easing: {
    brutal: [0.22, 1, 0.36, 1] as Easing,
  },
  duration: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.55,
  },
  offset: {
    small: 16,
    medium: 18,
  },
} as const;
