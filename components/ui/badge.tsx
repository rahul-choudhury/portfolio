/**
 * Badge
 *
 * Small status or category indicator.
 *
 * @variants neutral | danger | warning | success
 * @states default only (badges are non-interactive)
 *
 * @accessibility Renders a `<span>`. Use aria-label if the badge
 * conveys meaning not available from surrounding text.
 *
 * @example
 * ```tsx
 * <Badge>Draft</Badge>
 * <Badge variant="success">Active</Badge>
 * ```
 */

import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "neutral" | "danger" | "warning" | "success";
} & React.ComponentProps<"span">;

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
        variant === "neutral" &&
          "border-border bg-surface-soft text-text-secondary",
        variant === "danger" && "border-danger/20 bg-danger/10 text-danger",
        variant === "warning" && "border-warning/20 bg-warning/10 text-warning",
        variant === "success" && "border-success/20 bg-success/10 text-success",
        className,
      )}
      {...props}
    />
  );
}
