"use client"

/**
 * Popover
 *
 * Floating content panel anchored to a trigger, backed by Base UI Popover.
 *
 * @parts Popover, PopoverTrigger, PopoverContent, PopoverClose
 *
 * @accessibility
 * - Focus moves into popover when opened.
 * - Escape key closes the popover.
 * - Arrow keys navigate focusable elements inside.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button variant="ghost" size="icon"><Info /></Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p className="text-sm">Additional information here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "../lib/utils"

/* ----- Root ----- */

const Popover = BasePopover.Root

/* ----- Trigger ----- */

const PopoverTrigger = BasePopover.Trigger

/* ----- Content (Portal + Positioner + Popup) ----- */

type PopoverContentProps = {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
} & React.ComponentProps<typeof BasePopover.Popup>

function PopoverContent({
  side = "bottom",
  align = "start",
  sideOffset = 4,
  className,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BasePopover.Popup
          className={cn(
            "z-(--z-popover) border-border bg-surface rounded-md border p-4 shadow-md",
            "transition-[opacity,scale] duration-200",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

/* ----- Close ----- */

const PopoverClose = BasePopover.Close

export { Popover, PopoverClose, PopoverContent, PopoverTrigger }
