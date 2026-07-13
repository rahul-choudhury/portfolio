import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion-reveal";
import { getAllBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Notes on engineering, design, and building software.",
};

export default function BlogsPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <header className="mb-12 md:mb-16">
        <Reveal>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-text md:text-5xl">
            Blogs
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Notes on engineering, design, and building software.
          </p>
        </Reveal>
      </header>

      <div className="flex flex-col">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.15 + index * 0.05} inView>
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex items-start justify-between gap-6 border-b border-border py-5 transition-colors hover:border-border-strong"
            >
              <div className="flex flex-col gap-1.5">
                <h2 className="font-medium text-text transition-colors group-hover:text-text-secondary">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm text-text-secondary">
                    {post.description}
                  </p>
                )}
              </div>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-sm text-text-muted"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
