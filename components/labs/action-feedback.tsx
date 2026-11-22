"use client";

import { Button } from "@rahul-choudhury/ui/components";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { CheckIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./action-feedback.module.css";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

type Status = "idle" | "loading" | "success";

export function ActionFeedback({ compact = false }: LabComponentProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    setStatus("loading");
    timeoutRef.current = setTimeout(() => {
      setStatus("success");
      timeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
    }, 900);
  }

  const content = {
    idle: { icon: null, label: "Publish changes" },
    loading: {
      icon: <CircleNotchIcon aria-hidden="true" className={styles.spinner} />,
      label: "Publishing",
    },
    success: {
      icon: (
        <CheckIcon aria-hidden="true" className={styles.icon} weight="bold" />
      ),
      label: "Published",
    },
  }[status];

  return (
    <LabStage compact={compact}>
      <div className={styles.center}>
        <Button
          onClick={handleClick}
          disabled={status !== "idle"}
          aria-live="polite"
          className={styles.button}
          size={compact ? "md" : "lg"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.15 }}
              className={styles.label}
            >
              {content.icon}
              {content.label}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </LabStage>
  );
}
