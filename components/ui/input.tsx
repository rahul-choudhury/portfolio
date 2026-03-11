/**
 * Input
 *
 * Styled text input. Reads Field context for id, disabled, required,
 * invalid, and aria-describedby wiring.
 *
 * @sizes sm (h-8) | md (h-9) | lg (h-10)
 * @states default, hover, focus-visible, disabled, invalid
 *
 * @accessibility
 * - Uses native `<input>` element.
 * - aria-invalid set when Field is invalid.
 * - aria-describedby links to FieldHint and FieldError.
 *
 * @example
 * ```tsx
 * // Standalone
 * <Input type="search" placeholder="Search..." />
 *
 * // Inside Field
 * <Field.Root>
 *   <Field.Label>Name</Field.Label>
 *   <Input required placeholder="Jane Doe" />
 * </Field.Root>
 * ```
 */

"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-3.5 text-base",
};

type InputProps = {
  size?: "sm" | "md" | "lg";
} & Omit<React.ComponentProps<"input">, "size">;

export function Input({ size = "md", className, ...props }: InputProps) {
  return (
    <BaseInput
      className={cn(
        "w-full rounded-md border border-border bg-surface text-text transition-[border-color,box-shadow]",
        "placeholder:text-text-muted",
        "hover:border-border-strong",
        "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/15 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/15",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
