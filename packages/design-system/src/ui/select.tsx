"use client"

/**
 * Select
 *
 * True listbox/select component backed by Base UI Select.
 * Not a combobox - searchable selection is out of scope for v1.
 *
 * @sizes sm (h-8) | md (h-9) | lg (h-10) - set on SelectTrigger
 * @states default, hover, focus-visible, disabled, invalid (on trigger)
 *
 * @accessibility
 * - Keyboard navigation: arrow keys to highlight, Enter to select, Escape to close.
 * - Selected item announced via aria-selected.
 * - Trigger associated with label via Field context when used inside a Field.
 *
 * @example
 * ```tsx
 * <Select defaultValue="serif">
 *   <SelectTrigger>
 *     <SelectValue placeholder="Choose a font..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="sans">Sans-serif</SelectItem>
 *     <SelectItem value="serif">Serif</SelectItem>
 *     <SelectItem value="mono">Monospace</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */

import { Select as BaseSelect } from "@base-ui/react/select"
import { CheckIcon } from "@phosphor-icons/react"
import { CaretUpDownIcon } from "@phosphor-icons/react/dist/ssr"
import { createContext, useContext } from "react"
import { cn } from "../lib/utils"

/* ----- Root (no HTML rendered) ----- */

const Select = BaseSelect.Root

type SelectSize = "sm" | "md" | "lg"

const SelectSizeContext = createContext<SelectSize>("md")

/* ----- Trigger ----- */

const sizeStyles: Record<SelectSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-3.5 text-base",
}

type SelectTriggerProps = {
  size?: SelectSize
} & React.ComponentProps<typeof BaseSelect.Trigger>

function SelectTrigger({
  size = "md",
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectSizeContext value={size}>
      <BaseSelect.Trigger
        className={cn(
          "border-border bg-surface text-text inline-flex w-full items-center justify-between rounded-md border transition-[color,box-shadow]",
          "hover:border-border-strong",
          "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/15 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/15",
          "data-popup-open:border-accent",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        <BaseSelect.Icon className="ml-2 shrink-0">
          <CaretUpDownIcon size={14} className="text-text-muted" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
    </SelectSizeContext>
  )
}

/* ----- Value ----- */

const SelectValue = BaseSelect.Value

/* ----- Content (Portal + Positioner + Popup) ----- */

type SelectContentProps = {
  side?: "top" | "bottom"
  sideOffset?: number
} & React.ComponentProps<typeof BaseSelect.Popup>

function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner>
        <BaseSelect.Popup
          className={cn(
            "z-(--z-dropdown) min-w-(--anchor-width) border-border bg-surface max-h-60 overflow-auto rounded-md border shadow-md",
            className
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

/* ----- Item ----- */

type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>

function SelectItem({ className, children, ...props }: SelectItemProps) {
  const size = useContext(SelectSizeContext)

  return (
    <BaseSelect.Item
      className={cn(
        "text-text flex cursor-pointer items-center justify-between outline-none transition-colors",
        "data-highlighted:bg-surface-soft",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <CheckIcon size={14} />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
