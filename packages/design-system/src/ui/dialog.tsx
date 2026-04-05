"use client"

/**
 * Dialog
 *
 * Modal dialog backed by Base UI Dialog. Includes backdrop overlay,
 * focus trap, and Escape-to-close behavior.
 *
 * @parts Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose
 *
 * @accessibility
 * - Focus is trapped inside the dialog when open.
 * - Escape key closes the dialog.
 * - Page scroll is locked when open.
 * - DialogTitle is required for screen readers (renders as h2).
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>
 *     <Button>Delete</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Confirm deletion</DialogTitle>
 *     <DialogDescription>This action cannot be undone.</DialogDescription>
 *     <div className="mt-4 flex justify-end gap-2">
 *       <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
 *       <Button variant="destructive">Delete</Button>
 *     </div>
 *   </DialogContent>
 * </Dialog>
 * ```
 */

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cn } from "../lib/utils"

/* ----- Root ----- */

const Dialog = BaseDialog.Root

/* ----- Trigger ----- */

const DialogTrigger = BaseDialog.Trigger

/* ----- Content (Portal + Backdrop + Popup) ----- */

type DialogContentProps = React.ComponentProps<typeof BaseDialog.Popup>

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          "z-(--z-overlay) fixed inset-0 bg-black/40",
          "transition-opacity duration-300",
          "data-starting-style:opacity-0",
          "data-ending-style:opacity-0"
        )}
      />
      <BaseDialog.Popup
        className={cn(
          "z-(--z-modal) bg-surface shadow-overlay fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-6",
          "transition-[opacity,scale] duration-300",
          "data-starting-style:scale-95 data-starting-style:opacity-0",
          "data-ending-style:scale-95 data-ending-style:opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

/* ----- Title ----- */

type DialogTitleProps = React.ComponentProps<typeof BaseDialog.Title>

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn("text-text text-lg font-medium", className)}
      {...props}
    />
  )
}

/* ----- Description ----- */

type DialogDescriptionProps = React.ComponentProps<
  typeof BaseDialog.Description
>

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn("text-text-secondary mt-1 text-sm", className)}
      {...props}
    />
  )
}

/* ----- Close ----- */

const DialogClose = BaseDialog.Close

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
}
