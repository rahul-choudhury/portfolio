"use client"

/**
 * RadioGroup + RadioItem
 *
 * Single-selection group backed by Base UI RadioGroup + Radio.
 *
 * @states default, hover, checked, disabled
 *
 * @accessibility
 * - Keyboard: Arrow keys to navigate, Space to select.
 * - RadioGroup manages roving tabindex automatically.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Plan</Field.Label>
 *   <RadioGroup value={plan} onValueChange={setPlan}>
 *     <Field.Item>
 *       <Field.Label>
 *         <RadioItem value="free" />
 *         Free
 *       </Field.Label>
 *     </Field.Item>
 *   </RadioGroup>
 * </Field.Root>
 * ```
 */

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cn } from "../lib/utils"

/* ----- RadioGroup ----- */

type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup>

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/* ----- RadioItem ----- */

type RadioItemProps = React.ComponentProps<typeof BaseRadio.Root>

function RadioItem({ className, ...props }: RadioItemProps) {
  return (
    <BaseRadio.Root
      className={cn(
        "border-border bg-surface inline-flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
        "hover:border-border-strong",
        "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
        "data-checked:border-accent",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator className="flex items-center justify-center">
        <span className="bg-accent size-2 rounded-full" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  )
}

export { RadioGroup, RadioItem }
