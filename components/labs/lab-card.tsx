import Link from "next/link";
import styles from "./lab-card.module.css";
import type { Lab } from "./lab-types";

type LabCardProps = {
  lab: Lab;
};

export function LabCard({ lab }: LabCardProps) {
  const { Preview } = lab;

  return (
    <div className={styles.card}>
      <article aria-hidden="true" className={styles.preview}>
        <div inert className={styles.thumbnail}>
          <Preview compact />
        </div>
        <footer className={styles.footer}>
          <h2 className={styles.title}>{lab.title}</h2>
        </footer>
      </article>
      <Link
        href={`/lab/${lab.slug}`}
        aria-label={lab.title}
        className={styles.link}
      />
    </div>
  );
}
