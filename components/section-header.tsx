type SectionHeaderProps = {
  number: string;
  title: string;
  abbreviation: string;
};

export function SectionHeader({
  number,
  title,
  abbreviation,
}: SectionHeaderProps) {
  return (
    <div className="border-b-2 border-black p-6 lg:col-span-4 lg:border-r-2 lg:border-b-0 lg:p-12">
      <h2 className="mb-4 font-mono text-sm tracking-widest uppercase">
        [{number}] {title}
      </h2>
      <div className="sticky top-32 hidden text-8xl font-black text-transparent [-webkit-text-stroke:2px_black] lg:block">
        {abbreviation}
      </div>
    </div>
  );
}
