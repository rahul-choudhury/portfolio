"use client";

import type { ReactNode } from "react";
import {
  motion,
  type MotionProps,
  type Easing,
  useReducedMotion,
} from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  y?: number;
};

const brutalEase: Easing = [0.22, 1, 0.36, 1];

const baseTransition = {
  duration: 0.55,
  ease: brutalEase,
};

export function Reveal({
  children,
  className,
  delay = 0,
  inView = true,
  y = 16,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const motionProps: MotionProps = {
    initial: { opacity: 0, y },
    transition: { ...baseTransition, delay },
  };

  return (
    <motion.div
      {...motionProps}
      className={className}
      {...(inView
        ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.35 } }
        : { animate: { opacity: 1, y: 0 } })}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
};

const containerVariants = (delayChildren: number, stagger: number) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren, staggerChildren: stagger },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  stagger = 0.08,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(delayChildren, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
