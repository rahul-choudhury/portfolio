import { cn } from "@workspace/design-system"
import type { Metadata } from "next"
import Link from "next/link"
import { Reveal } from "@/components/motion-reveal"
import { Showcase } from "./showcase"

export const metadata: Metadata = {
  title: "Design System - Rahul Choudhury",
  description: "Token reference, typography, colors, and component showcase.",
}

const COLORS = [
  { token: "bg", label: "Background", className: "bg-bg" },
  { token: "surface", label: "Surface", className: "bg-surface" },
  {
    token: "surface-soft",
    label: "Surface Soft",
    className: "bg-surface-soft",
  },
  { token: "accent", label: "Accent", className: "bg-accent" },
  { token: "danger", label: "Danger", className: "bg-danger" },
  { token: "warning", label: "Warning", className: "bg-warning" },
  { token: "success", label: "Success", className: "bg-success" },
]

const TEXT_COLORS = [
  { token: "text", label: "Text", className: "text-text" },
  {
    token: "text-secondary",
    label: "Text Secondary",
    className: "text-text-secondary",
  },
  { token: "text-muted", label: "Text Muted", className: "text-text-muted" },
  {
    token: "accent-foreground",
    label: "Accent Foreground",
    className: "text-accent-foreground bg-accent px-2 py-0.5 rounded-sm",
  },
]

const BORDER_COLORS = [
  { token: "border", label: "Border", className: "border-border" },
  {
    token: "border-strong",
    label: "Border Strong",
    className: "border-border-strong",
  },
]

const RADII = [
  { token: "sm", value: "4px", className: "rounded-sm" },
  { token: "md", value: "8px", className: "rounded-md" },
  { token: "lg", value: "12px", className: "rounded-lg" },
  { token: "full", value: "9999px", className: "rounded-full" },
]

const SHADOWS = [
  { token: "sm", className: "shadow-sm" },
  { token: "md", className: "shadow-md" },
  { token: "lg", className: "shadow-lg" },
  { token: "overlay", className: "shadow-overlay" },
]

export default function DesignPage() {
  return (
    <>
      <header className="mb-16">
        <Reveal>
          <Link
            href="/"
            className="text-text-muted hover:text-text mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            Back
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-text font-serif text-3xl font-medium tracking-tight md:text-4xl">
            Design System
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-secondary mt-3 text-lg">
            Token reference, typography scale, and component showcase.
          </p>
        </Reveal>
      </header>

      {/* ---- Colors ---- */}
      <section className="mb-16">
        <Reveal delay={0.2}>
          <h2 className="text-text-muted mb-6 text-sm font-medium">Colors</h2>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="space-y-8">
            {/* Background / surface colors */}
            <div>
              <h3 className="text-text mb-3 text-sm font-medium">
                Backgrounds &amp; Surfaces
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {COLORS.map((c) => (
                  <div key={c.token} className="flex flex-col gap-1.5">
                    <div
                      className={cn(
                        "border-border h-16 rounded-md border",
                        c.className
                      )}
                    />
                    <span className="text-text-muted font-mono text-xs">
                      {c.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Text colors */}
            <div>
              <h3 className="text-text mb-3 text-sm font-medium">Text</h3>
              <div className="flex flex-wrap gap-6">
                {TEXT_COLORS.map((c) => (
                  <div key={c.token} className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "flex h-10 items-center text-base font-medium",
                        c.className
                      )}
                    >
                      Aa
                    </span>
                    <span className="text-text-muted font-mono text-xs">
                      {c.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Border colors */}
            <div>
              <h3 className="text-text mb-3 text-sm font-medium">Borders</h3>
              <div className="flex flex-wrap gap-4">
                {BORDER_COLORS.map((c) => (
                  <div key={c.token} className="flex flex-col gap-1.5">
                    <div
                      className={cn(
                        "h-12 w-24 rounded-md border-2",
                        c.className
                      )}
                    />
                    <span className="text-text-muted font-mono text-xs">
                      {c.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- Typography ---- */}
      <section className="mb-16">
        <Reveal delay={0.3}>
          <h2 className="text-text-muted mb-6 text-sm font-medium">
            Typography
          </h2>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="space-y-8">
            {/* Font families */}
            <div>
              <h3 className="text-text mb-3 text-sm font-medium">
                Font Families
              </h3>
              <div className="space-y-3">
                <div className="border-border flex items-baseline gap-4 border-b pb-3">
                  <span className="text-text text-lg font-medium">Satoshi</span>
                  <span className="text-text-muted font-mono text-xs">
                    font-sans - body copy, labels, UI text
                  </span>
                </div>
                <div className="border-border flex items-baseline gap-4 border-b pb-3">
                  <span className="text-text font-serif text-lg font-medium">
                    Instrument Serif
                  </span>
                  <span className="text-text-muted font-mono text-xs">
                    font-serif - titles, headings, display text
                  </span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-text font-mono text-lg font-medium">
                    JetBrains Mono
                  </span>
                  <span className="text-text-muted font-mono text-xs">
                    font-mono - timestamps, metadata, code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- Radius ---- */}
      <section className="mb-16">
        <Reveal delay={0.4}>
          <h2 className="text-text-muted mb-6 text-sm font-medium">Radius</h2>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="flex flex-wrap gap-6">
            {RADII.map((r) => (
              <div key={r.token} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "border-border-strong size-16 border-2",
                    r.className
                  )}
                />
                <span className="text-text-muted font-mono text-xs">
                  {r.token}
                </span>
                <span className="text-text-secondary font-mono text-xs">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---- Shadows ---- */}
      <section className="mb-16">
        <Reveal delay={0.5}>
          <h2 className="text-text-muted mb-6 text-sm font-medium">Shadows</h2>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="flex flex-wrap gap-6">
            {SHADOWS.map((s) => (
              <div key={s.token} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn("bg-surface size-20 rounded-md", s.className)}
                />
                <span className="text-text-muted font-mono text-xs">
                  {s.token}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---- Components ---- */}
      <Reveal delay={0.6}>
        <Showcase />
      </Reveal>
    </>
  )
}
