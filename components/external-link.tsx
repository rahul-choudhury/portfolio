import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

type ExternalLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function ExternalLink({ href, label, className }: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-1 decoration-2 underline-offset-4 hover:underline ${className ?? ""}`}
    >
      {label}
      <ArrowUpRightIcon
        className="size-3 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        weight="bold"
      />
    </Link>
  );
}
