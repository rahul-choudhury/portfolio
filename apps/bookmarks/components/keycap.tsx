import { cn } from "@workspace/design-system/lib/utils";

type KeycapProps = React.ComponentProps<"kbd">;

export function Keycap({ className, ...props }: KeycapProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border border-border bg-surface-soft px-2 py-1 font-mono text-xs text-text-secondary",
        className,
      )}
      {...props}
    />
  );
}
