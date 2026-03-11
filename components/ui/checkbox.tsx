/**
 * Checkbox
 *
 * Toggle control for boolean values, backed by Base UI Checkbox.
 * Renders a hidden `<input type="checkbox">` for form submission.
 *
 * @states default, hover, checked, disabled, indeterminate
 *
 * @accessibility
 * - Keyboard: Space to toggle.
 * - Pair with `Field.Label` to provide an accessible name.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label>
 *     <Checkbox checked={agreed} onCheckedChange={setAgreed} />
 *     I accept the terms
 *   </Field.Label>
 * </Field.Root>
 *
 * <Checkbox indeterminate /> // Parent checkbox state
 * ```
 */

"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-border bg-surface transition-colors",
        "hover:border-border-strong",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "data-checked:border-accent data-checked:bg-accent",
        "data-indeterminate:border-accent data-indeterminate:bg-accent",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        keepMounted
        className="flex items-center justify-center text-accent-foreground data-unchecked:not-data-indeterminate:opacity-0"
      >
        {props.indeterminate ? (
          <MinusIcon size={12} weight="bold" />
        ) : (
          <CheckIcon size={12} weight="bold" />
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
