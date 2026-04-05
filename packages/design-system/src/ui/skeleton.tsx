/**
 * Skeleton
 *
 * Placeholder for content that is loading. Renders a pulsing
 * block sized by the consumer via className (h-*, w-*, rounded-*).
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-48" />
 * <Skeleton className="h-10 w-full rounded-md" />
 * <Skeleton className="size-10 rounded-full" />
 * ```
 */

import { cn } from "../lib/utils"

type SkeletonProps = React.ComponentProps<"div">

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-surface-soft animate-pulse rounded-md", className)}
      aria-hidden="true"
      {...props}
    />
  )
}
