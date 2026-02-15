import { ArrowUpRight } from "./icons";

type ExternalLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function ExternalLink({ href, label, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 ${className ?? ""}`}
    >
      <span>{label}</span>
      <ArrowUpRight className="size-3 translate-y-2 text-[#d4d4d4] opacity-0 transition-all group-hover:translate-y-0 group-hover:text-current group-hover:opacity-100" />
    </a>
  );
}
