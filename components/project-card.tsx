import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

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
      className="group relative block border-b-2 border-black p-6 transition-all duration-300 last:border-b-0 hover:shadow-[inset_8px_0_0_0_black] md:p-12"
    >
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-baseline">
        <h3 className="text-3xl font-black tracking-tighter uppercase md:text-5xl">
          {title}
        </h3>
        <span className="rounded-full border-2 border-current px-2 py-0.5 font-mono text-sm md:text-base">
          {year}
        </span>
      </div>
      <p className="mb-6 max-w-xl font-mono text-sm md:text-lg">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs tracking-wider uppercase opacity-60"
          >
            / {t}
          </span>
        ))}
      </div>
      <div className="absolute top-6 right-6 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:translate-y-2 lg:opacity-0">
        <ArrowUpRightIcon className="size-8" />
      </div>
    </Link>
  );
}
