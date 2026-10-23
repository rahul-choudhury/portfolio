import { cn } from "@rahul-choudhury/ui";
import Link from "next/link";
import type { Lab } from "./lab-types";

type LabCardProps = {
  lab: Lab;
};

export function LabCard({ lab }: LabCardProps) {
  const { Preview } = lab;

  return (
    <div className="group relative">
      <article
        aria-hidden="true"
        className={cn(
          "overflow-hidden rounded-sm border border-border bg-surface transition-colors",
          "group-focus-within:border-text group-hover:border-border-strong",
        )}
      >
        <div inert className="pointer-events-none">
          <Preview compact />
        </div>
        <footer className="border-t border-border p-4">
          <h2 className="font-medium text-text">{lab.title}</h2>
        </footer>
      </article>
      <Link
        href={`/lab/${lab.slug}`}
        aria-label={lab.title}
        className="absolute inset-0 rounded-sm outline-none"
      />
    </div>
  );
}
