import { cn } from "@rahul-choudhury/ui";
import type { ReactNode } from "react";

type LabStageProps = {
  children: ReactNode;
  compact?: boolean;
};

export function LabStage({ children, compact = false }: LabStageProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-sm bg-surface-soft",
        compact ? "aspect-4/3 p-5 sm:p-7" : "min-h-112 p-6 md:p-12",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-border/70 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[24px_24px] text-black/2.5"
      />
      <div className="relative flex size-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
