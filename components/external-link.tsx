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
      <ArrowUpRight
        className="size-3 text-[#d4d4d4] transition-colors group-hover:text-current"
        strokeWidth={1.5}
      />
    </a>
  );
}
