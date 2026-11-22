import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import styles from "./external-link.module.css";

type ExternalLinkProps = {
  href: string;
  children: string;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <span>{children}</span>
      <ArrowUpRightIcon size={12} className={styles.arrow} />
    </a>
  );
}
