import Link from "next/link";
import { ArrowUpRight } from "./icons";

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  tech: string[];
  year: string;
};

export function ProjectCard({
  title,
  description,
  link,
  tech,
  year,
}: ProjectCardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-border-hover hover:shadow-sm md:p-8"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-baseline gap-3">
          <h3 className="text-xl font-medium tracking-tight text-text">
            {title}
          </h3>
          <span className="font-mono text-xs text-text-muted">{year}</span>
        </div>

        <ArrowUpRight
          className="size-5 text-border-hover transition-colors group-hover:text-text"
          strokeWidth={1.5}
        />
      </div>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors group-hover:border-border-hover"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
