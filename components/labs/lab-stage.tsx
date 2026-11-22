import clsx from "clsx";
import type { ReactNode } from "react";

type LabStageProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  fill?: boolean;
};

export function LabStage({
  children,
  className,
  compact = false,
  fill = false,
}: LabStageProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden rounded-sm bg-surface-soft",
        compact ? "min-h-44 p-5 sm:min-h-52 sm:p-7" : "h-96 p-6 md:p-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-border/70 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[24px_24px] text-text/2.5"
      />
      <div
        className={clsx(
          "flex w-full items-center justify-center",
          fill ? "absolute inset-0" : "relative",
        )}
      >
        {children}
      </div>
    </div>
  );
}
