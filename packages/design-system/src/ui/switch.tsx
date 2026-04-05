"use client"

/**
 * Switch
 *
 * Toggle control for on/off states, backed by Base UI Switch.
 *
 * @states default, hover, checked, disabled
 *
 * @accessibility
 * - Renders `<button role="switch">` with aria-checked.
 * - Keyboard: Space to toggle.
 * - Pair with `Field.Label` to provide an accessible name.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label>
 *     <Switch checked={enabled} onCheckedChange={setEnabled} />
 *     Notifications
 *   </Field.Label>
 * </Field.Root>
 * ```
 */

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cn } from "../lib/utils"

type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "bg-border",
        "data-checked:bg-accent",
        "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "bg-surface pointer-events-none block size-4 rounded-full shadow-sm transition-transform",
          "translate-x-0.5",
          "data-checked:translate-x-4.5"
        )}
      />
    </BaseSwitch.Root>
  )
}
