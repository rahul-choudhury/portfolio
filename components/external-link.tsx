import { ArrowUpRight } from "./icons";

type ExternalLinkProps = {
  href: string;
  children: string;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-text-secondary hover:text-text transition-colors"
    >
      <span>{children}</span>
      <ArrowUpRight className="size-3 translate-y-2 text-border-hover opacity-0 transition-[translate,opacity] group-hover:translate-y-0 group-hover:text-current group-hover:opacity-100" />
    </a>
  );
}
