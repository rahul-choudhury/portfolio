"use client";

import Link from "next/link";
import {
  GithubLogoIcon,
  ArrowUpRightIcon,
  LinkedinLogoIcon,
  EnvelopeIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import { motion, type MotionProps } from "motion/react";

const SKILLS = [
  "Javascript",
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
    title: "Now Screening",
    description: "A chrome extension that bridges Letterboxd & Bookmyshow.",
    link: "https://github.com/rahul-choudhury/now-screening",
    tech: ["Javascript", "Go", "PostgreSQL"],
    year: "2025",
  },
  {
    title: "Custom Registry",
    description:
      "A personal library of reusable components and hooks distributed via the shadcn CLI.",
    link: "https://registry.rchoudhury.dev",
    tech: ["Next.js", "Typescript", "Tailwind CSS", "shadcn/ui"],
    year: "2025",
  },
];

// const EXPERIENCE_IN_YEARS = Math.floor(
//   (Date.now() - +new Date("2023-07-03")) / (1000 * 60 * 60 * 24 * 365.25),
// );

const FADE_UP_VARIANTS: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const FADE_IN_UP: MotionProps = {
  variants: FADE_UP_VARIANTS,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
  transition: { ease: [0.165, 0.84, 0.44, 1], duration: 0.4 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/80 px-6 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="font-medium text-black transition-colors hover:text-gray-600"
            >
              Rahul Choudhury
            </Link>
            <div className="flex items-center space-x-8">
              <Link
                href="#about"
                className="text-sm text-gray-600 transition-colors hover:text-black"
              >
                About
              </Link>
              <Link
                href="#work"
                className="text-sm text-gray-600 transition-colors hover:text-black"
              >
                Work
              </Link>
              <Link
                href="#contact"
                className="text-sm text-gray-600 transition-colors hover:text-black"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <motion.h1
              className="text-5xl font-light tracking-tight md:text-7xl"
              {...FADE_IN_UP}
            >
              Frontend Developer
            </motion.h1>
            <motion.p
              className="max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl"
              {...FADE_IN_UP}
              transition={{ ...FADE_IN_UP.transition, delay: 0.1 }}
            >
              I craft digital experiences with clean code and thoughtful design.
              Currently building products at{" "}
              <span className="font-medium text-black">GrowthPanda</span>.
            </motion.p>
            <motion.div
              className="flex items-center space-x-6 pt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div variants={FADE_UP_VARIANTS}>
                <Link
                  href="https://github.com/rahul-choudhury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-600 transition-colors hover:text-black"
                >
                  <GithubLogoIcon className="size-5" />
                  <span className="text-sm">GitHub</span>
                  <ArrowUpRightIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
              <motion.div variants={FADE_UP_VARIANTS}>
                <Link
                  href="https://www.linkedin.com/in/rahul-choudhury-51460b314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-600 transition-colors hover:text-black"
                >
                  <LinkedinLogoIcon className="size-5" />
                  <span className="text-sm">LinkedIn</span>
                  <ArrowUpRightIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
              <motion.div variants={FADE_UP_VARIANTS}>
                <Link
                  href="https://x.com/choudhureee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-600 transition-colors hover:text-black"
                >
                  <XLogoIcon className="size-5" />
                  <span className="text-sm">Twitter</span>
                  <ArrowUpRightIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-gray-100 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-3">
            <motion.h2
              className="mb-4 text-sm font-medium tracking-wider text-gray-400 uppercase"
              {...FADE_IN_UP}
            >
              About
            </motion.h2>
            <div className="space-y-6 md:col-span-2">
              <motion.p
                className="text-lg leading-relaxed text-gray-700"
                {...FADE_IN_UP}
                transition={{ ...FADE_IN_UP.transition, delay: 0.1 }}
              >
                I&apos;m a frontend developer with 2+ years of experience
                building web applications. I specialize in React and TypeScript.
              </motion.p>
              <motion.p
                className="text-lg leading-relaxed text-gray-700"
                {...FADE_IN_UP}
                transition={{ ...FADE_IN_UP.transition, delay: 0.2 }}
              >
                I believe in writing clean, maintainable code and creating user
                experiences that are both beautiful and functional. When
                I&apos;m not coding, I like to ride my horsie in Red Dead
                Redemption 2.
              </motion.p>
              <motion.div
                className="pt-4"
                variants={FADE_UP_VARIANTS}
                transition={{ ...FADE_IN_UP.transition, delay: 0.3 }}
              >
                <h3 className="mb-4 text-sm font-medium tracking-wider text-gray-400 uppercase">
                  Technologies
                </h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.4,
                      },
                    },
                  }}
                >
                  {SKILLS.map((tech) => (
                    <motion.span
                      key={tech}
                      className="rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      variants={FADE_UP_VARIANTS}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="border-t border-gray-100 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-3">
            <motion.h2
              className="mb-4 text-sm font-medium tracking-wider text-gray-400 uppercase"
              {...FADE_IN_UP}
            >
              Selected Work
            </motion.h2>
            <motion.div
              className="space-y-12 md:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <div className="space-y-4">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.title}
                    className="rounded-lg border border-gray-100 p-6 transition-colors hover:bg-gray-50"
                    variants={FADE_UP_VARIANTS}
                  >
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-black transition-colors group-hover:text-gray-600">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {project.year}
                        </span>
                      </div>
                      <p className="leading-relaxed text-gray-600">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-gray-100 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-3">
            <motion.h2
              className="mb-4 text-sm font-medium tracking-wider text-gray-400 uppercase"
              {...FADE_IN_UP}
            >
              Get in Touch
            </motion.h2>
            <div className="md:col-span-2">
              <motion.p
                className="mb-8 text-lg leading-relaxed text-gray-700"
                {...FADE_IN_UP}
                transition={{ ...FADE_IN_UP.transition, delay: 0.1 }}
              >
                I&apos;m always interested in hearing about new opportunities
                and interesting projects. Feel free to reach out if you&apos;d
                like to work together.
              </motion.p>
              <motion.div
                {...FADE_IN_UP}
                transition={{ ...FADE_IN_UP.transition, delay: 0.2 }}
              >
                <Link
                  href="mailto:rchoudhury63@gmail.com"
                  className="group inline-flex items-center space-x-2 text-black transition-colors hover:text-gray-600"
                >
                  <EnvelopeIcon className="size-5" />
                  <span className="text-lg">rchoudhury63@gmail.com</span>
                  <ArrowUpRightIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rahul Choudhury. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/resume.pdf"
                className="text-sm text-gray-400 transition-colors hover:text-black"
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
