"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { CaretDownIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import type { TocEntry } from "@/lib/blogs";
import styles from "./table-of-contents.module.css";

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className={styles.toc}>
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger className={styles.trigger}>
          <span className={styles.label}>Table of Contents</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <CaretDownIcon size={16} className={styles.caret} />
          </motion.span>
        </Collapsible.Trigger>

        <Collapsible.Panel keepMounted className={styles.panel}>
          <div className={styles.entries}>
            {toc.map((entry, index) => (
              <motion.a
                key={entry.id}
                href={`#${entry.id}`}
                initial={false}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{
                  duration: 0.2,
                  delay: isOpen ? index * 0.05 : 0,
                  ease: "easeOut",
                }}
                className={styles.entry}
                style={{
                  paddingLeft: `${entry.level === 3 ? 1.75 : 0.75}rem`,
                }}
              >
                {entry.title}
              </motion.a>
            ))}
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </nav>
  );
}
