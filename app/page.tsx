import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion-reveal";
import { ProjectCard } from "@/components/project-card";
import { ExternalLink } from "@/components/external-link";
import { MobileNav } from "@/components/mobile-nav";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Go",
  "PostgreSQL",
  "Redis",
];

const PROJECTS = [
  {
    title: "React Extras",
    description:
      "A CLI tool that automates the setup of deployment, linting, and editor configuration for React applications.",
    link: "https://github.com/rahul-choudhury/react-extras",
    tech: ["TypeScript", "CLI", "Node.js"],
    year: "2026",
  },
  {
    title: "Bookmarks",
    description:
      "A simple and minimal link manager with drag-and-drop organization.",
    link: "https://bookmarks.rchoudhury.dev",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "Drizzle",
      "Better Auth",
    ],
    year: "2025",
  },
  {
    title: "Now Screening",
    description:
      "A Chrome extension that bridges Letterboxd & Bookmyshow for seamless movie discovery.",
    link: "https://github.com/rahul-choudhury/now-screening",
    tech: ["JavaScript", "Go", "PostgreSQL"],
    year: "2025",
  },
  {
    title: "Custom Registry",
    description:
      "A personal library of reusable components and hooks distributed via the shadcn CLI.",
    link: "https://registry.rchoudhury.dev",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    year: "2025",
  },
];

const EXPERIENCE_IN_YEARS = Math.floor(
  (Date.now() - +new Date("2023-07-03")) / (1000 * 60 * 60 * 24 * 365.25),
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#171717]">
      {/* Navigation */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-[#fafafa]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:h-24 md:px-12">
          <Link href="/" className="text-lg font-medium tracking-tight">
            Rahul Choudhury
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link href="#work" className="text-[#525252] hover:text-[#171717]">
              Work
            </Link>
            <Link
              href="#contact"
              className="text-[#525252] hover:text-[#171717]"
            >
              Contact
            </Link>
            <ExternalLink
              href="https://destructure.in"
              label="Blog"
              className="text-[#525252] hover:text-[#171717]"
            />
          </nav>

          <MobileNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-20 md:px-12 md:pt-24">
        {/* Hero Section */}
        <section className="flex min-h-[60vh] flex-col justify-center py-16 md:py-24">
          <Reveal inView={false}>
            <p className="mb-6 font-mono text-sm text-[#737373]">
              Frontend Developer at GrowthPanda
            </p>
          </Reveal>

          <Reveal inView={false} delay={0.1}>
            <h1 className="max-w-4xl text-4xl leading-[1.1] font-medium tracking-tight text-[#171717] md:text-6xl lg:text-7xl">
              {EXPERIENCE_IN_YEARS}+ years building what designers draw and
              users need
            </h1>
          </Reveal>

          <Reveal inView={false} delay={0.2}>
            <div className="mt-12 flex items-center gap-6 text-sm">
              <ExternalLink
                href="https://github.com/rahul-choudhury"
                label="GitHub"
                className="text-[#525252] hover:text-[#171717]"
              />
              <ExternalLink
                href="https://www.linkedin.com/in/rahul-choudhury-51460b314"
                label="LinkedIn"
                className="text-[#525252] hover:text-[#171717]"
              />
              <ExternalLink
                href="/resume.pdf"
                label="Resume"
                className="text-[#525252] hover:text-[#171717]"
              />
            </div>
          </Reveal>
        </section>

        {/* Skills Section */}
        <section className="py-12 md:py-16">
          <Reveal>
            <h2 className="mb-8 text-sm font-medium text-[#737373]">
              Technologies
            </h2>
          </Reveal>

          <Stagger className="flex flex-wrap gap-3" stagger={0.03}>
            {SKILLS.map((skill) => (
              <StaggerItem key={skill}>
                <span className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-sm text-[#525252] transition-colors hover:border-[#d4d4d4] hover:text-[#171717]">
                  {skill}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Work Section */}
        <section id="work" className="py-16 md:py-24">
          <Reveal>
            <div className="mb-12 flex items-baseline justify-between">
              <h2 className="text-sm font-medium text-[#737373]">
                Selected Work
              </h2>
              <span className="font-mono text-sm text-[#737373]">
                2025 — 2026
              </span>
            </div>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            {PROJECTS.map((project) => (
              <StaggerItem key={project.title}>
                <ProjectCard {...project} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <Reveal>
            <p className="mb-6 text-lg text-[#525252]">
              Good projects need good developers. Here&apos;s my email.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="mailto:rchoudhury63@gmail.com"
              className="inline-flex items-center gap-2 text-lg font-medium text-[#171717] underline decoration-[#e5e5e5] underline-offset-4 hover:decoration-[#171717]"
            >
              rchoudhury63@gmail.com
            </Link>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
