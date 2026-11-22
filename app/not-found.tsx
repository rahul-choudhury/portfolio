import { InlineLink } from "@/components/inline-link";
import { Page, PageTitle } from "@/components/page";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <Page>
      <p className={styles.status}>404</p>
      <PageTitle className={styles.title}>Nothing here.</PageTitle>
      <p className={styles.message}>
        This page may have moved or never existed.
      </p>
      <InlineLink href="/" className={styles.homeLink}>
        Go home
      </InlineLink>
    </Page>
  );
}
