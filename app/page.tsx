import { Badge } from "@rahul-choudhury/ui/components";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import { Reveal } from "@/components/motion-reveal";
import { EmailLink } from "./email-link";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Go",
  "PostgreSQL",
];

const PROJECTS = [
  {
    title: "React Extras",
    description:
      "A CLI automating deployment, linting, and editor setup for React applications.",
    link: "https://github.com/rahul-choudhury/react-extras",
  },
  {
    title: "Bookmarks",
    description:
      "A minimal, keyboard-focused link manager for saving and finding bookmarks.",
    link: "https://bookmarks.rchoudhury.dev",
  },
  {
    title: "Custom Registry",
    description:
      "A personal library of reusable components and hooks distributed through shadcn.",
    link: "https://registry.rchoudhury.dev",
  },
  {
    title: "Now Screening",
    description:
      "A Chrome extension connecting Letterboxd and BookMyShow for easier movie discovery.",
    link: "https://github.com/rahul-choudhury/now-screening",
  },
];

export default function Home() {
  return (
    <>
      <header className="flex flex-col justify-center">
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-serif text-4xl font-medium tracking-tight text-text md:text-5xl">
            Rahul Choudhury
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            Building what designers draw and users need
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:gap-x-5">
            <ExternalLink href="https://github.com/rahul-choudhury">
              GitHub
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/rahul-choudhury-51460b314">
              LinkedIn
            </ExternalLink>
            <ExternalLink href="/resume_rahul-choudhury.pdf">
              Résumé
            </ExternalLink>
          </div>
        </Reveal>
      </header>

      {/* Skills Section */}
      <section className="mt-12 md:mt-16">
        <Reveal delay={0.25}>
          <h2 className="mb-6 text-sm font-medium text-text-muted">Stack</h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Work Section */}
      <section className="mt-16 md:mt-20">
        <Reveal delay={0.35}>
          <h2 className="mb-6 text-sm font-medium text-text-muted">
            Selected Work
          </h2>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-36 flex-col gap-3 rounded-sm border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-soft"
              >
                <h3 className="font-medium text-text transition-colors group-hover:text-text-secondary">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section className="mt-16 md:mt-20">
        <Reveal delay={0.45}>
          <p className="mb-6 text-lg text-text-secondary">
            Good projects need good developers. Here&apos;s my email.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <EmailLink />
        </Reveal>
      </section>
    </>
  );
}
