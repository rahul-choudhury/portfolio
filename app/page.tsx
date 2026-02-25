import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-reveal";
import { ProjectCard } from "@/components/project-card";
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

export default async function Home() {
  const blogPosts = getAllBlogPosts();
  const totalBlogs = blogPosts.length;

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col justify-center">
        <Reveal inView={false}>
          <h1 className="max-w-4xl text-5xl leading-[1.1] font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
            Rahul Choudhury
          </h1>
        </Reveal>

        <Reveal inView={false} delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
            Building what designers draw and users need
          </p>
        </Reveal>

        <Reveal inView={false} delay={0.15}>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <ExternalLink href="https://github.com/rahul-choudhury">
              GitHub
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/rahul-choudhury-51460b314">
              LinkedIn
            </ExternalLink>
            <ExternalLink href="/resume.pdf">Resumè</ExternalLink>
          </div>
        </Reveal>
      </section>

      {/* Skills Section */}
      <section className="mt-12 md:mt-16">
        <Reveal>
          <h2 className="mb-6 text-sm font-medium text-text-muted">
            Technologies
          </h2>
        </Reveal>

        <Stagger className="flex flex-wrap gap-3" stagger={0.03}>
          {SKILLS.map((skill) => (
            <StaggerItem key={skill}>
              <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text">
                {skill}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Blog Section */}
      <section className="mt-16 md:mt-20">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-text-muted">Blogs</h2>
            <span className="font-mono text-sm text-text-muted">
              {totalBlogs} {totalBlogs === 1 ? "post" : "posts"}
            </span>
          </div>
        </Reveal>

        <Stagger className="flex flex-col gap-4" stagger={0.1}>
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-4 border-b border-border py-4 transition-colors hover:border-border-hover"
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
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Work Section */}
      <section className="mt-16 md:mt-20">
        <Reveal>
          <h2 className=" mb-8 text-sm font-medium text-text-muted">
            Selected Work
          </h2>
        </Reveal>

        <Stagger
          className="grid auto-rows-fr gap-6 md:grid-cols-2"
          stagger={0.1}
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title} className="h-full">
              <ProjectCard {...project} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Contact Section */}
      <section className="mt-16 md:mt-20 ">
        <Reveal>
          <p className="mb-6 text-lg text-text-secondary">
            Good projects need good developers. Here&apos;s my email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
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
