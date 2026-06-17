import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

type ExternalLinkProps = {
  href: string
  children: string
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-secondary hover:text-text group inline-flex items-center gap-1 transition-colors"
    >
      <span>{children}</span>
      <ArrowUpRightIcon
        size={12}
        className="text-border-strong translate-y-2 opacity-0 transition-[translate,opacity] group-hover:translate-y-0 group-hover:text-current group-hover:opacity-100"
      />
    </a>
  )
}
