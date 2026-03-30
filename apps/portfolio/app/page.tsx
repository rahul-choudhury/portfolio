import { Badge } from "@workspace/design-system/ui/badge";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import { Reveal } from "@/components/motion-reveal";
import { getAllBlogPosts } from "@/lib/blogs";

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
    description: "A simple and minimal keyboard focused link manager.",
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
    title: "Custom Registry",
    description:
      "A personal library of reusable components and hooks distributed via the shadcn CLI.",
    link: "https://registry.rchoudhury.dev",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
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
];

export default async function Home() {
  const blogPosts = getAllBlogPosts();
  const totalBlogs = blogPosts.length;

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col justify-center">
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.1] font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
            Rahul Choudhury
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
            Building what designers draw and users need
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex items-center gap-3 md:gap-5 text-sm">
            <ExternalLink href="https://github.com/rahul-choudhury">
              GitHub
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/rahul-choudhury-51460b314">
              LinkedIn
            </ExternalLink>
            <ExternalLink href="/resume_rahul-choudhury.pdf">
              Resumè
            </ExternalLink>
            <Link
              href="/design-system"
              className="inline-flex items-center gap-1 whitespace-nowrap rainbow-shimmer"
              data-text="Design System"
            >
              Design System
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Skills Section */}
      <section className="mt-12 md:mt-16">
        <Reveal delay={0.25}>
          <h2 className="mb-6 text-sm font-medium text-text-muted">
            Technologies
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Blog Section */}
      <section className="mt-16 md:mt-20">
        <Reveal delay={0.35}>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-text-muted">Blogs</h2>
            <span className="font-mono text-sm text-text-muted">
              {totalBlogs} {totalBlogs === 1 ? "post" : "posts"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-col gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-4 border-b border-border py-4 transition-colors hover:border-border-strong"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-text transition-colors group-hover:text-text-secondary">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-text-secondary">
                      {post.description}
                    </p>
                  )}
                </div>
                {post.date && (
                  <span className="shrink-0 font-mono text-sm text-text-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Work Section */}
      <section className="mt-16 md:mt-20">
        <Reveal delay={0.45}>
          <h2 className=" mb-8 text-sm font-medium text-text-muted">
            Selected Work
          </h2>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex flex-col gap-4">
            {PROJECTS.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 border-b border-border py-4 transition-colors hover:border-border-strong"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-text transition-colors group-hover:text-text-secondary">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-sm text-text-muted">
                  {project.year}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section className="mt-16 md:mt-20 ">
        <Reveal delay={0.55}>
          <p className="mb-6 text-lg text-text-secondary">
            Good projects need good developers. Here&apos;s my email.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <Link
            href="mailto:rchoudhury63@gmail.com"
            className="inline-flex items-center gap-2 text-lg font-medium text-text underline decoration-border underline-offset-4 hover:decoration-text"
          >
            rchoudhury63@gmail.com
          </Link>
        </Reveal>
      </section>
    </>
  );
}
