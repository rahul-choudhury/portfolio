import { ArrowUDownLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLab, LABS } from "@/lib/labs";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return LABS.map((lab) => ({ slug: lab.slug }));
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
    title: lab.title,
    description: lab.description,
  };
}

export default async function LabDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const lab = getLab(slug);

  if (!lab) notFound();

  const { Preview } = lab;

  return (
    <div className="mx-auto max-w-xl pt-10 md:pt-20">
      <header className="mb-9">
        <div className="flex items-center justify-between gap-4">
          <h1 className="flex min-w-0 items-baseline gap-2 font-serif text-2xl font-medium tracking-tight md:text-3xl">
            <Link
              href="/lab"
              className="shrink-0 text-text-muted transition-colors hover:text-text"
            >
              Lab
            </Link>
            <span aria-hidden="true" className="text-text-muted">
              /
            </span>
            <span className="truncate text-text">{lab.title}</span>
          </h1>
          <Link
            href="/lab"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowUDownLeftIcon aria-hidden="true" size={14} />
            Go back
          </Link>
        </div>
      </header>
      <article className="overflow-hidden rounded-sm border border-border bg-surface">
        <Preview />
      </article>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
        {lab.description}
      </p>
    </div>
  );
}
