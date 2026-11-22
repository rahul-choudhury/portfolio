import type { ReactNode } from "react";
import styles from "./lab-stage.module.css";

type LabStageProps = {
  children: ReactNode;
  compact?: boolean;
  fill?: boolean;
};

export function LabStage({
  children,
  compact = false,
  fill = false,
}: LabStageProps) {
  return (
    <div className={styles.stage} data-compact={compact}>
      <div aria-hidden="true" className={styles.grid} />
      <div className={styles.content} data-fill={fill}>
        {children}
      </div>
    </div>
  );
}
