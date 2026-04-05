import { NotFound } from "@workspace/design-system/ui"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center">
      <NotFound
        action={
          <Link
            href="/"
            className="text-text decoration-border hover:decoration-text inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            Go home
          </Link>
        }
      />
    </div>
  )
}
