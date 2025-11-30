"use client";

import Link from "next/link";
import {
  GithubLogoIcon,
  ArrowUpRightIcon,
  LinkedinLogoIcon,
  ArrowDownIcon,
  FilePdfIcon,
} from "@phosphor-icons/react/ssr";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

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
    title: "NOW SCREENING",
    description: "A chrome extension that bridges Letterboxd & Bookmyshow.",
    link: "https://github.com/rahul-choudhury/now-screening",
    tech: ["JAVASCRIPT", "GO", "POSTGRESQL"],
    year: "2025",
  },
  {
    title: "BOOKMARKS",
    description: "A simple and minimal link manager.",
    link: "https://github.com/rahul-choudhury/bookmarks",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans text-black selection:bg-black selection:text-[var(--color-selection-text)]">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b-2 border-black bg-[var(--color-background)]">
        <div className="flex h-16 items-center justify-between px-4 md:h-20 md:px-12">
          <Link
            href="/"
            className="-ml-2 px-2 font-mono text-xl font-bold tracking-tighter uppercase transition-colors hover:bg-black hover:text-[var(--color-hover-text)] md:text-2xl"
          >
            Rahul Choudhury
          </Link>
          <nav className="hidden items-center space-x-8 font-mono text-sm tracking-widest uppercase md:flex">
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
          </nav>
          <button
            className="font-mono text-sm font-bold md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--color-background)] pt-20"
          >
            <nav className="flex flex-col items-center gap-8 p-8">
              <Link
                href="#about"
                className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                [01] About
              </Link>
              <Link
                href="#work"
                className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                [02] Work
              </Link>
              <Link
                href="#contact"
                className="font-mono text-2xl font-bold tracking-widest uppercase hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                [03] Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-4 min-h-screen border-r-2 border-l-2 border-black pt-20 md:mx-12 md:pt-24">
        {/* Hero Section */}
        <section className="border-b-2 border-black">
          <div className="grid min-h-[80vh] grid-cols-1 md:grid-cols-12">
            <div className="flex flex-col justify-between p-6 md:col-span-12 md:p-12">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="text-6xl leading-[0.85] font-black tracking-tighter break-words uppercase md:text-9xl"
                >
                  Frontend
                  <br />
                  Developer
                </motion.h1>
              </div>

              <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="max-w-xl"
                >
                  <p className="font-mono text-lg leading-tight tracking-tight uppercase md:text-xl">
                    Building products at{" "}
                    <span className="underline decoration-2">GrowthPanda</span>.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex gap-4"
                >
                  <SocialLink
                    href="https://github.com/rahul-choudhury"
                    label="GH"
                    icon={<GithubLogoIcon className="size-6" />}
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/rahul-choudhury-51460b314"
                    label="LI"
                    icon={<LinkedinLogoIcon className="size-6" />}
                  />
                  <SocialLink
                    href="/resume.pdf"
                    label="Resume"
                    icon={<FilePdfIcon className="size-6" />}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-b-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="border-b-2 border-black p-6 md:col-span-4 md:border-r-2 md:border-b-0 md:p-12">
              <h2 className="mb-4 font-mono text-sm tracking-widest uppercase">
                [01] About
              </h2>
              <div className="sticky top-32 hidden text-8xl font-black opacity-10 md:block">
                ABT
              </div>
            </div>
            <div className="p-6 md:col-span-8 md:p-12">
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
                    {SKILLS.map((tech) => (
                      <span
                        key={tech}
                        className="cursor-default border-2 border-black px-2 py-1 text-xs font-bold transition-colors hover:bg-black hover:text-[var(--color-hover-text)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="border-b-2 border-black bg-black text-[var(--color-hover-text)]">
          <div className="p-6 md:p-12">
            <blockquote className="text-center">
              <p className="mb-4 font-mono text-lg leading-relaxed italic md:text-2xl">
                &ldquo;Is there a better description of a cube than that of its
                construction?&rdquo;
              </p>
              <cite className="font-mono text-sm tracking-widest uppercase opacity-60">
                ~ László Tóth (The Brutalist)
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="border-b-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="border-b-2 border-black p-6 md:col-span-4 md:border-r-2 md:border-b-0 md:p-12">
              <h2 className="mb-4 font-mono text-sm tracking-widest uppercase">
                [02] Selected Work
              </h2>
              <div className="sticky top-32 hidden text-8xl font-black opacity-10 md:block">
                WRK
              </div>
            </div>
            <div className="md:col-span-8">
              {PROJECTS.map((project) => (
                <Link
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block border-b-2 border-black p-6 transition-colors duration-300 last:border-b-0 hover:bg-black hover:text-[var(--color-hover-text)] md:p-12"
                >
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-baseline">
                    <h3 className="text-3xl font-black tracking-tighter uppercase md:text-5xl">
                      {project.title}
                    </h3>
                    <span className="rounded-full border-2 border-current px-2 py-0.5 font-mono text-sm md:text-base">
                      {project.year}
                    </span>
                  </div>
                  <p className="mb-6 max-w-xl font-mono text-sm group-hover:text-gray-300 md:text-lg">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs tracking-wider uppercase opacity-60"
                      >
                        / {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRightIcon className="size-8" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="border-b-2 border-black p-6 md:col-span-4 md:border-r-2 md:border-b-0 md:p-12">
              <h2 className="mb-4 font-mono text-sm tracking-widest uppercase">
                [03] Contact
              </h2>
            </div>
            <div className="flex min-h-[50vh] flex-col justify-center p-6 md:col-span-8 md:p-12">
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
        <footer className="border-t-2 border-black bg-black p-6 text-[var(--color-footer-text)] md:p-12">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="font-mono text-xs tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Rahul Choudhury.
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase decoration-1 underline-offset-4 hover:underline"
            >
              Back to Top <ArrowDownIcon className="size-3 rotate-180" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-12 items-center justify-center border-2 border-black transition-colors hover:bg-black hover:text-[var(--color-hover-text)]"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
