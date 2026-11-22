import { ArrowUDownLeftIcon } from "@phosphor-icons/react/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./page.module.css";

type PageProps = {
  as?: "div" | "article";
  children: ReactNode;
};

export function Page({ as: Element = "div", children }: PageProps) {
  return <Element className={styles.page}>{children}</Element>;
}

export function PageTitle({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={clsx(styles.title, className)} {...props} />;
}

type TitleRowProps = {
  backHref: string;
  children: ReactNode;
};

export function TitleRow({ backHref, children }: TitleRowProps) {
  return (
    <div className={styles.titleRow}>
      {children}
      <Link href={backHref} className={styles.backLink}>
        <ArrowUDownLeftIcon aria-hidden="true" size={14} />
        Go back
      </Link>
    </div>
  );
}
