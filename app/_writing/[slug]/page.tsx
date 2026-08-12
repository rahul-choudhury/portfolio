import { ArrowUDownLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Build } from "rehype-autolink-headings";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Reveal } from "@/components/motion-reveal";
import { TableOfContents } from "@/components/table-of-contents";
import { VideoPlayer } from "@/components/video-player";
import {
  getBlogMetadata,
  getBlogPost,
  getBlogSlugs,
  getTableOfContents,
} from "@/lib/blogs";

type Params = Promise<{ slug: string }>;
const buildHeadingAnchorContent: Build = (element) => {
  const level = Number.parseInt(element.tagName.replace("h", ""), 10);

  return {
    type: "text",
    value: "#".repeat(Number.isNaN(level) ? 1 : level),
  };
};

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
    const metadata = getBlogMetadata(slug);
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: "article",
        publishedTime: metadata.date,
        url: `/writing/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  let post: ReturnType<typeof getBlogPost>;
  try {
    post = getBlogPost(slug);
  } catch {
    notFound();
  }

  const { metadata, content } = post;
  const toc = getTableOfContents(content);

  return (
    <article className="mx-auto max-w-xl pt-10 md:pt-20">
      <header className="mb-10">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-serif text-2xl font-medium tracking-tight text-text md:text-3xl">
              {metadata.title}
            </h1>
            <Link
              href="/writing"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
            >
              <ArrowUDownLeftIcon aria-hidden="true" size={14} />
              Go back
            </Link>
          </div>
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
      </header>

      <Reveal delay={0.25}>
        <TableOfContents toc={toc} />
      </Reveal>

      <Reveal delay={0.3}>
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
                      content: buildHeadingAnchorContent,
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
}
