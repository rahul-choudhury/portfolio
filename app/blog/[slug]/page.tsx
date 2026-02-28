import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Reveal } from "@/components/motion-reveal";
import { VideoPlayer } from "@/components/video-player";
import { getBlogPost, getBlogSlugs } from "@/lib/blogs";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { metadata } = getBlogPost(slug);
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: "article",
        publishedTime: metadata.date,
        url: `/blog/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  try {
    const { metadata, content } = getBlogPost(slug);

    return (
      <article>
        <header className="mb-12">
          <Reveal>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
            >
              <span aria-hidden="true">&larr;</span>
              Back
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl font-medium tracking-tight text-text md:text-4xl">
              {metadata.title}
            </h1>
          </Reveal>

          {metadata.date && (
            <Reveal delay={0.15}>
              <time className="mt-3 block font-mono text-sm text-text-muted">
                {new Date(metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Reveal>
          )}

          {metadata.description && (
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-text-secondary">
                {metadata.description}
              </p>
            </Reveal>
          )}
        </header>

        <Reveal delay={0.25}>
          <div className="prose">
            <MDXRemote
              source={content}
              components={{ VideoPlayer }}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "append",
                        properties: { className: "heading-anchor" },
                        content: {
                          type: "text",
                          value: "#",
                        },
                      },
                    ],
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-light-default",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </Reveal>
      </article>
    );
  } catch {
    notFound();
  }
}
