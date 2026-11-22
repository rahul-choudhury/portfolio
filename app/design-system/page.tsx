import type { Metadata } from "next";
import { Reveal } from "@/components/motion-reveal";
import { Page, PageTitle, TitleRow } from "@/components/page";
import styles from "./design-system.module.css";
import { Showcase } from "./showcase";

export const metadata: Metadata = {
  title: "Design system",
  description: "Token reference, typography, colors, and component showcase.",
};

const COLORS = [
  { token: "bg", label: "Background" },
  { token: "surface", label: "Surface" },
  { token: "surface-soft", label: "Surface Soft" },
  { token: "accent", label: "Accent" },
  { token: "danger", label: "Danger" },
  { token: "warning", label: "Warning" },
  { token: "success", label: "Success" },
];

const TEXT_COLORS = [
  { token: "text", label: "Text" },
  { token: "text-secondary", label: "Text Secondary" },
  { token: "text-muted", label: "Text Muted" },
  { token: "accent-foreground", label: "Accent Foreground", onAccent: true },
];

const BORDER_COLORS = [
  { token: "border", label: "Border" },
  { token: "border-strong", label: "Border Strong" },
];

const RADII = [
  { token: "sm", value: "4px", radius: "var(--radius-sm)" },
  { token: "md", value: "8px", radius: "var(--radius-md)" },
  { token: "lg", value: "12px", radius: "var(--radius-lg)" },
  { token: "full", value: "9999px", radius: "9999px" },
];

const SHADOWS = ["sm", "md", "lg", "overlay"];

export default function DesignPage() {
  return (
    <Page>
      <header className={styles.header}>
        <Reveal>
          <TitleRow backHref="/">
            <PageTitle>Design system</PageTitle>
          </TitleRow>
        </Reveal>
      </header>

      {/* ---- Colors ---- */}
      <section className={styles.section}>
        <Reveal delay={0.15}>
          <h2 className={styles.sectionTitle}>Colors</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className={styles.groups}>
            {/* Background / surface colors */}
            <div>
              <h3 className={styles.groupTitle}>Backgrounds &amp; Surfaces</h3>
              <div className={styles.swatches}>
                {COLORS.map((c) => (
                  <div key={c.token} className={styles.swatch}>
                    <div
                      className={styles.swatchColor}
                      style={{ background: `var(--color-${c.token})` }}
                    />
                    <span className={styles.caption}>{c.token}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Text colors */}
            <div>
              <h3 className={styles.groupTitle}>Text</h3>
              <div className={styles.samples}>
                {TEXT_COLORS.map((c) => (
                  <div key={c.token} className={styles.textToken}>
                    <span
                      className={styles.textSample}
                      data-on-accent={c.onAccent ?? false}
                      style={{ color: `var(--color-${c.token})` }}
                    >
                      Aa
                    </span>
                    <span className={styles.caption}>{c.token}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Border colors */}
            <div>
              <h3 className={styles.groupTitle}>Borders</h3>
              <div className={styles.borderSamples}>
                {BORDER_COLORS.map((c) => (
                  <div key={c.token} className={styles.swatch}>
                    <div
                      className={styles.borderSample}
                      style={{ borderColor: `var(--color-${c.token})` }}
                    />
                    <span className={styles.caption}>{c.token}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- Typography ---- */}
      <section className={styles.section}>
        <Reveal delay={0.3}>
          <h2 className={styles.sectionTitle}>Typography</h2>
        </Reveal>

        <Reveal delay={0.35}>
          <div className={styles.groups}>
            {/* Font families */}
            <div>
              <h3 className={styles.groupTitle}>Font Families</h3>
              <div className={styles.fonts}>
                <div className={styles.font}>
                  <span className={styles.fontName}>Satoshi</span>
                  <span className={styles.caption}>
                    font-sans - body copy, labels, UI text
                  </span>
                </div>
                <div className={styles.font}>
                  <span className={styles.fontName} data-font="serif">
                    Clash Display
                  </span>
                  <span className={styles.caption}>
                    font-serif - titles, headings, display text
                  </span>
                </div>
                <div className={styles.font}>
                  <span className={styles.fontName} data-font="mono">
                    JetBrains Mono
                  </span>
                  <span className={styles.caption}>
                    font-mono - timestamps, metadata, code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- Radius ---- */}
      <section className={styles.section}>
        <Reveal delay={0.4}>
          <h2 className={styles.sectionTitle}>Radius</h2>
        </Reveal>
        <Reveal delay={0.45}>
          <div className={styles.samples}>
            {RADII.map((r) => (
              <div key={r.token} className={styles.shape}>
                <div
                  className={styles.radiusSample}
                  style={{ borderRadius: r.radius }}
                />
                <span className={styles.caption}>{r.token}</span>
                <span className={styles.radiusValue}>{r.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---- Shadows ---- */}
      <section className={styles.section}>
        <Reveal delay={0.5}>
          <h2 className={styles.sectionTitle}>Shadows</h2>
        </Reveal>
        <Reveal delay={0.55}>
          <div className={styles.samples}>
            {SHADOWS.map((token) => (
              <div key={token} className={styles.shape}>
                <div
                  className={styles.shadowSample}
                  style={{ boxShadow: `var(--shadow-${token})` }}
                />
                <span className={styles.caption}>{token}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---- Components ---- */}
      <Reveal delay={0.6}>
        <Showcase />
      </Reveal>
    </Page>
  );
}
