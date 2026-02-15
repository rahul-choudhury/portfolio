"use client";

import type { ReactNode } from "react";
import { motion, type MotionProps, useReducedMotion } from "motion/react";
import { animation } from "@/lib/tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  y?: number;
};

const baseTransition = {
  duration: animation.duration.slow,
  ease: animation.easing.brutal,
};

export function Reveal({
  children,
  className,
  delay = 0,
  inView = true,
  y = animation.offset.small,
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
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.35 },
          }
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
  hidden: { opacity: 0, y: animation.offset.medium },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export function Stagger({
  children,
  className,
  delayChildren = animation.duration.fast,
  stagger = animation.duration.normal,
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
