import Link from "next/link"
import type { Lab } from "./lab-types"

type LabCardProps = {
  lab: Lab
}

export function LabCard({ lab }: LabCardProps) {
  const { Preview } = lab

  return (
    <article className="overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-border-strong">
      <Preview compact />

      <footer className="border-t border-border p-4">
        <Link
          href={`/labs/${lab.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-text-secondary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {lab.title}
        </Link>
      </footer>
    </article>
  )
}
