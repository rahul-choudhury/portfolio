type SkillBadgeProps = {
  label: string;
};

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="cursor-default border-2 border-black px-2 py-1 text-xs font-bold transition-colors hover:bg-black hover:text-(--color-hover-text)">
      {label}
    </span>
  );
}
