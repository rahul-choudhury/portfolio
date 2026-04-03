"use client";

/**
 * Button
 *
 * Primary interactive element for triggering actions.
 *
 * @variants primary | secondary | ghost | destructive
 * @sizes sm (h-8) | md (h-9) | lg (h-10) | icon (size-9)
 * @states default, hover, focus-visible, active, disabled
 *
 * @accessibility Renders native `<button>`. Focus ring on :focus-visible only.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Save</Button>
 * <Button variant="ghost" size="icon"><Icon /></Button>
 * ```
 */

import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "../lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
} & React.ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        "inline-flex cursor-pointer items-center justify-center font-medium transition-[colors,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-accent text-accent-foreground hover:bg-accent/90",
        variant === "secondary" &&
          "border border-border bg-surface text-text hover:border-border-strong hover:bg-surface-soft",
        variant === "ghost" &&
          "text-text-secondary hover:bg-surface-soft hover:text-text",
        variant === "destructive" && "bg-danger text-white hover:bg-danger/90",
        size === "sm" && "h-8 gap-1.5 rounded-md px-3 text-sm",
        size === "md" && "h-9 gap-2 rounded-md px-4 text-sm",
        size === "lg" && "h-10 gap-2 rounded-md px-5 text-base",
        size === "icon" && "size-9 rounded-md",
        className,
      )}
      {...props}
    />
  );
}
