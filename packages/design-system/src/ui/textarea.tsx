"use client"

/**
 * Textarea
 *
 * Multi-line text input built on Base UI `Field.Control` with
 * `render={<textarea />}`.
 *
 * @sizes sm | md | lg (controls padding and text size, not rows)
 * @states default, hover, focus-visible, disabled, invalid
 *
 * @usage Must be rendered within `Field.Root`.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Message</Field.Label>
 *   <Textarea rows={4} placeholder="Write your message..." />
 *   <Field.Description>Markdown supported.</Field.Description>
 * </Field.Root>
 * ```
 */

import { Field as BaseField } from "@base-ui/react/field"
import { cn } from "../lib/utils"

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-3.5 py-2.5 text-base",
}

type TextareaProps = {
  size?: "sm" | "md" | "lg"
} & React.ComponentProps<"textarea">

export function Textarea({ size = "md", className, ...props }: TextareaProps) {
  return (
    <BaseField.Control
      render={<textarea />}
      className={cn(
        "border-border bg-surface text-text w-full resize-y rounded-md border transition-[border-color,box-shadow]",
        "placeholder:text-text-muted",
        "hover:border-border-strong",
        "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/15 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/15",
        sizeStyles[size],
        className
      )}
      {...(props as React.ComponentProps<typeof BaseField.Control>)}
    />
  )
}
