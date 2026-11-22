import type { Metadata } from "next";
import { LabCard } from "@/components/labs/lab-card";
import { Reveal } from "@/components/motion-reveal";
import { Page, PageTitle, TitleRow } from "@/components/page";
import { LABS } from "@/lib/labs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interface experiments exploring motion, feedback, and interaction.",
};

export default function LabPage() {
  return (
    <Page>
      <header className={styles.header}>
        <Reveal>
          <TitleRow backHref="/">
            <PageTitle>Lab</PageTitle>
          </TitleRow>
        </Reveal>
      </header>

      <Reveal delay={0.15}>
        <div className={styles.labs}>
          {LABS.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      </Reveal>
    </Page>
  );
}
