"use client"

import { cn } from "@rahul-choudhury/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/labs", label: "Labs" },
  { href: "/design-system", label: "Design System" },
]

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-(--z-sticky) border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-14 max-w-4xl items-center gap-5 overflow-x-auto px-6 text-sm md:gap-6 md:px-12"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = isActiveRoute(pathname, item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "shrink-0 transition-colors hover:text-text",
                isActive ? "text-text" : "text-text-muted"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
