import * as motion from "motion/react-client";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
};

const easeOutQuint = [0.23, 1, 0.32, 1] as const;

const baseTransition = {
  duration: 0.55,
  ease: easeOutQuint,
};

export function Reveal({
  children,
  className,
  delay = 0,
  inView = false,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ ...baseTransition, delay }}
      className={className}
      {...(inView
        ? {
            whileInView: { opacity: 1, filter: "blur(0px)" },
            viewport: { once: true, amount: 0.35 },
          }
        : { animate: { opacity: 1, filter: "blur(0px)" } })}
    >
      {children}
    </motion.div>
  );
}
