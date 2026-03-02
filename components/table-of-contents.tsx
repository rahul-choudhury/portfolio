"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { TocEntry } from "@/lib/blogs";

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className="mb-12">
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger className="group flex w-full items-center justify-between border border-border bg-bg-soft px-4 py-2.5 transition-colors duration-200 hover:border-border-hover">
          <span className="text-sm font-medium text-text-muted">
            Table of Contents
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChevronDown size={16} className="text-text-muted" />
          </motion.span>
        </Collapsible.Trigger>

        <Collapsible.Panel
          keepMounted
          className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-250 ease-in-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
        >
          <div className="mt-2 border border-border bg-bg-soft p-2">
            {toc.map((entry, index) => (
              <motion.a
                key={entry.id}
                href={`#${entry.id}`}
                initial={false}
                animate={
                  isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                }
                transition={{
                  duration: 0.2,
                  delay: isOpen ? index * 0.03 : 0,
                  ease: "easeOut",
                }}
                className="block px-3 py-1.5 text-sm text-text-muted transition-colors duration-200 hover:bg-border/50 hover:text-text"
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
