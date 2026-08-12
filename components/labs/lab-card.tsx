import type { Lab } from "./lab-types";

type LabCardProps = {
  lab: Lab;
};

export function LabCard({ lab }: LabCardProps) {
  const { Preview } = lab;

  return (
    <article className="overflow-hidden rounded-sm border border-border bg-surface">
      <Preview compact />

      <footer className="border-t border-border p-4">
        <h2 className="font-medium text-text">{lab.title}</h2>
      </footer>
    </article>
  );
}
