"use client"

/**
 * DropdownMenu
 *
 * Action menu triggered by a button, backed by Base UI Menu.
 *
 * @parts DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
 *        DropdownMenuItem, DropdownMenuSeparator
 *
 * @accessibility
 * - Keyboard: Arrow keys to navigate items, Enter to activate, Escape to close.
 * - Focus is trapped inside the menu when open.
 * - Items are announced as menu items by screen readers.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>
 *     <Button variant="ghost" size="icon"><DotsThree /></Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem onSelect={() => edit()}>Edit</DropdownMenuItem>
 *     <DropdownMenuItem onSelect={() => duplicate()}>Duplicate</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem onSelect={() => remove()}>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */

import { Menu as BaseMenu } from "@base-ui/react/menu"
import { cn } from "../lib/utils"

/* ----- Root ----- */

const DropdownMenu = BaseMenu.Root

/* ----- Trigger ----- */

const DropdownMenuTrigger = BaseMenu.Trigger

/* ----- Content (Portal + Positioner + Popup) ----- */

type DropdownMenuContentProps = {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
} & React.ComponentProps<typeof BaseMenu.Popup>

function DropdownMenuContent({
  side = "bottom",
  align = "start",
  sideOffset = 4,
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BaseMenu.Popup
          className={cn(
            "z-(--z-dropdown) border-border bg-surface min-w-40 rounded-md border py-1 shadow-md",
            "transition-[opacity,scale] duration-200",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

/* ----- Item ----- */

type DropdownMenuItemProps = {
  onSelect?: () => void
} & React.ComponentProps<typeof BaseMenu.Item>

function DropdownMenuItem({
  className,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(
        "text-text flex w-full cursor-pointer items-center px-3 py-1.5 text-sm outline-none transition-colors",
        "data-highlighted:bg-surface-soft",
        className
      )}
      onClick={onSelect}
      {...props}
    />
  )
}

/* ----- Separator ----- */

type DropdownMenuSeparatorProps = React.ComponentProps<"hr">

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <hr
      className={cn("bg-border my-1 h-px border-none", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
}
