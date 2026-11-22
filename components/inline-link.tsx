import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./inline-link.module.css";

export function InlineLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link {...props} className={clsx(styles.link, className)} />;
}
