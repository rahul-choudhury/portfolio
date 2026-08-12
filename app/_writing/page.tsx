import { ArrowUDownLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion-reveal";
import { getAllBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on engineering, design, and building software.",
};

export default function BlogsPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-xl pt-10 md:pt-20">
      <header className="mb-9">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-serif text-2xl font-medium tracking-tight text-text md:text-3xl">
              Writing
            </h1>
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
            >
              <ArrowUDownLeftIcon aria-hidden="true" size={14} />
              Go back
            </Link>
          </div>
        </Reveal>
      </header>

      <div className="flex flex-col">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.15 + index * 0.05} inView>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex items-start justify-between gap-6 border-b border-border py-4 transition-colors hover:border-border-strong"
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
    </div>
  );
}
