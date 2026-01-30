import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { SectionHeader } from "@/components/section-header";
import { SkillBadge } from "@/components/skill-badge";
import { ProjectCard } from "@/components/project-card";
import { MobileNav } from "@/components/mobile-nav";
import { BackToTop } from "@/components/back-to-top";

const SKILLS = [
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "TAILWIND CSS",
  "GO",
  "POSTGRESQL",
  "REDIS",
];

const PROJECTS = [
  {
    title: "BOOKMARKS",
    description: "A simple and minimal link manager.",
    link: "https://bookmarks.rchoudhury.dev",
    tech: [
      "NEXT.JS",
      "TYPESCRIPT",
      "TAILWIND",
      "POSTGRESQL",
      "DRIZZLE",
      "BETTER AUTH",
    ],
    year: "2025",
  },
  {
    title: "NOW SCREENING",
    description: "A chrome extension that bridges Letterboxd & Bookmyshow.",
    link: "https://github.com/rahul-choudhury/now-screening",
    tech: ["JAVASCRIPT", "GO", "POSTGRESQL"],
    year: "2025",
  },
  {
    title: "CUSTOM REGISTRY",
    description:
      "A personal library of reusable components and hooks distributed via the shadcn CLI.",
    link: "https://registry.rchoudhury.dev",
    tech: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "SHADCN/UI"],
    year: "2025",
  },
];

const EXPERIENCE_IN_YEARS = Math.floor(
  (Date.now() - +new Date("2023-07-03")) / (1000 * 60 * 60 * 24 * 365.25),
);

export default function Home() {
  return (
    <div className="min-h-screen bg-(--color-background) font-sans text-black selection:bg-black selection:text-(--color-selection-text)">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b-2 border-black bg-(--color-background)">
        <div className="mx-auto flex h-16 max-w-480 items-center justify-between px-4 md:h-20 md:px-12">
          <Link
            href="/"
            className="bg-black px-2 font-mono text-xl font-bold tracking-tighter text-(--color-hover-text) uppercase transition-colors md:text-2xl"
          >
            Rahul Choudhury
          </Link>
          <nav className="hidden items-center space-x-8 font-mono text-sm tracking-widest uppercase lg:flex">
            <Link
              href="#about"
              className="decoration-2 underline-offset-4 hover:underline"
            >
              [01] About
            </Link>
            <Link
              href="#work"
              className="decoration-2 underline-offset-4 hover:underline"
            >
              [02] Work
            </Link>
            <Link
              href="#contact"
              className="decoration-2 underline-offset-4 hover:underline"
            >
              [03] Contact
            </Link>
            <ExternalLink href="https://destructure.in" label="[04] Blog" />
          </nav>
          <MobileNav />
        </div>
      </header>

      <main className="relative z-10 mx-4 min-h-screen max-w-456 border-r-2 border-l-2 border-black pt-20 md:mx-12 md:pt-24 2xl:mx-auto">
        {/* Hero Section */}
        <section className="border-b-2 border-black">
          <div className="grid min-h-[80vh] grid-cols-1 md:grid-cols-12">
            <div className="flex flex-col justify-between p-6 md:col-span-12 md:p-12">
              <div className="space-y-2">
                <h1 className="text-6xl leading-[0.85] font-black tracking-tighter wrap-break-word uppercase lg:text-9xl">
                  Frontend
                  <br />
                  Developer
                </h1>
              </div>

              <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-xl">
                  <p className="font-mono text-lg leading-tight tracking-tight uppercase md:text-xl">
                    Building products at{" "}
                    <span className="underline decoration-2">GrowthPanda</span>.
                  </p>
                </div>

                <nav className="flex items-center gap-4 font-mono text-sm tracking-widest uppercase">
                  <ExternalLink
                    href="https://github.com/rahul-choudhury"
                    label="Github"
                  />
                  <ExternalLink
                    href="https://www.linkedin.com/in/rahul-choudhury-51460b314"
                    label="LinkedIn"
                  />
                  <ExternalLink href="/resume.pdf" label="Resume" />
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <SectionHeader number="01" title="About" abbreviation="ABT" />
            <div className="p-6 lg:col-span-8 lg:p-12">
              <p className="mb-12 text-2xl leading-tight font-bold tracking-tight uppercase md:text-4xl">
                I&apos;m a frontend developer with {EXPERIENCE_IN_YEARS}+ years
                of experience. I specialize in React and TypeScript.
              </p>
              <div className="grid grid-cols-1 gap-12 font-mono md:grid-cols-2">
                <div>
                  <p className="mb-6 text-base leading-relaxed">
                    I believe in writing clean, maintainable code and creating
                    user interfaces that are both functional and tasteful. When
                    I&apos;m not coding, I like to ride my horsie in Red Dead
                    Redemption 2.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 border-b-2 border-black pb-2 font-bold uppercase">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <SkillBadge key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="border-b-2 border-black bg-black text-(--color-hover-text)">
          <div className="p-6 md:p-12">
            <blockquote className="text-center selection:bg-white selection:text-black">
              <p className="mb-4 font-mono text-lg leading-relaxed italic md:text-2xl">
                &ldquo;Is there a better description of a cube than that of its
                construction?&rdquo;
              </p>
              <cite className="font-mono text-sm tracking-widest uppercase opacity-60">
                ~ Laszlo Toth (The Brutalist)
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <SectionHeader
              number="02"
              title="Selected Work"
              abbreviation="WRK"
            />
            <div className="lg:col-span-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <SectionHeader number="03" title="Contact" abbreviation="CNT" />
            <div className="flex min-h-[50vh] flex-col justify-center p-6 lg:col-span-8 lg:p-12">
              <p className="mb-8 font-mono text-lg uppercase">
                Interesting opportunities?
              </p>
              <Link
                href="mailto:rchoudhury63@gmail.com"
                className="text-4xl font-black tracking-tighter break-all uppercase decoration-4 underline-offset-8 hover:underline md:text-6xl lg:text-7xl"
              >
                rchoudhury63
                <br />
                @gmail.com
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-black bg-black p-6 text-(--color-footer-text) md:p-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="font-mono text-xs tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Rahul Choudhury.
            </div>
            <BackToTop />
          </div>
        </footer>
      </main>
    </div>
  );
}
