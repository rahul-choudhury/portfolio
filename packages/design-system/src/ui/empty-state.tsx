/**
 * EmptyState
 *
 * Centered placeholder shown when a view has no content.
 *
 * @props
 * - `icon`: optional decorative icon (renders at text-text-muted)
 * - `title`: required heading text
 * - `description`: optional supporting text
 * - `action`: optional CTA (e.g. a Button)
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<FileText size={32} />}
 *   title="No posts yet"
 *   description="Write your first blog post to get started."
 *   action={<Button>New Post</Button>}
 * />
 * ```
 */

import { cn } from "../lib/utils"

type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
} & Omit<React.ComponentProps<"div">, "title">

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center py-12 text-center", className)}
      {...props}
    >
      {icon && <div className="text-text-muted mb-4">{icon}</div>}
      <p className="text-text text-base font-medium">{title}</p>
      {description && (
        <p className="text-text-muted mt-1 text-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
