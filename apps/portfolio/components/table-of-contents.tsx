"use client"

import { Collapsible } from "@base-ui/react/collapsible"
import { CaretDownIcon } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { useState } from "react"
import type { TocEntry } from "@/lib/blogs"

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [isOpen, setIsOpen] = useState(false)

  if (toc.length === 0) return null

  return (
    <nav aria-label="Table of Contents" className="mb-12">
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger className="border-border bg-surface-soft hover:border-border-strong group flex w-full items-center justify-between rounded-sm border px-4 py-2.5 transition-colors duration-200">
          <span className="text-text-muted text-sm font-medium">
            Table of Contents
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <CaretDownIcon size={16} className="text-text-muted" />
          </motion.span>
        </Collapsible.Trigger>

        <Collapsible.Panel
          keepMounted
          className="h-(--collapsible-panel-height) duration-250 data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 overflow-hidden transition-[height,opacity] ease-in-out"
        >
          <div className="border-border bg-surface-soft mt-2 rounded-sm border p-2">
            {toc.map((entry, index) => (
              <motion.a
                key={entry.id}
                href={`#${entry.id}`}
                initial={false}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{
                  duration: 0.2,
                  delay: isOpen ? index * 0.03 : 0,
                  ease: "easeOut",
                }}
                className="text-text-muted hover:bg-surface-soft hover:text-text block px-3 py-1.5 text-sm transition-colors duration-200"
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
  )
}
