import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion-reveal";
import { getLab, LABS } from "@/lib/labs";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return LABS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);

  if (!lab) return {};

  return {
    title: `${lab.title} | Labs`,
    description: lab.description,
    openGraph: {
      title: lab.title,
      description: lab.description,
      url: `/labs/${lab.slug}`,
    },
  };
}

export default async function LabPage({ params }: { params: Params }) {
  const { slug } = await params;
  const lab = getLab(slug);

  if (!lab) notFound();

  const { Demo } = lab;

  return (
    <article>
      <header className="mb-10">
        <Reveal>
          <Link
            href="/labs"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
          >
            <span aria-hidden="true">&larr;</span>
            All labs
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-text md:text-4xl">
            {lab.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            {lab.description}
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.15}>
        <div className="overflow-hidden rounded-sm border border-border bg-surface p-2">
          <Demo />
        </div>
      </Reveal>
    </article>
  );
}
