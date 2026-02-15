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
      className="group block rounded-lg border border-[#e5e5e5] bg-white p-6 transition-all duration-300 hover:border-[#d4d4d4] hover:shadow-sm md:p-8"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-baseline gap-3">
          <h3 className="text-xl font-medium tracking-tight text-[#171717]">
            {title}
          </h3>
          <span className="font-mono text-xs text-[#737373]">{year}</span>
        </div>

        <ArrowUpRight
          className="size-5 text-[#d4d4d4] transition-colors group-hover:text-[#171717]"
          strokeWidth={1.5}
        />
      </div>

      <p className="mb-6 text-sm leading-relaxed text-[#525252]">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="font-mono text-xs text-[#a3a3a3]">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
