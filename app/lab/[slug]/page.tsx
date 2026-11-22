import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page, PageTitle, TitleRow } from "@/components/page";
import { getLab, LABS } from "@/lib/labs";
import styles from "./page.module.css";

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
    <Page>
      <header className={styles.header}>
        <TitleRow backHref="/lab">
          <PageTitle className={styles.breadcrumb}>
            <Link href="/lab" className={styles.parent}>
              Lab
            </Link>
            <span aria-hidden="true" className={styles.separator}>
              /
            </span>
            <span className={styles.current}>{lab.title}</span>
          </PageTitle>
        </TitleRow>
      </header>
      <article className={styles.preview}>
        <Preview />
      </article>
      <p className={styles.description}>{lab.description}</p>
    </Page>
  );
}
