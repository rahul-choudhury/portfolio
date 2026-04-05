import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Build } from "rehype-autolink-headings"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { Reveal } from "@/components/motion-reveal"
import { TableOfContents } from "@/components/table-of-contents"
import { VideoPlayer } from "@/components/video-player"
import {
  getBlogMetadata,
  getBlogPost,
  getBlogSlugs,
  getTableOfContents,
} from "@/lib/blogs"

type Params = Promise<{ slug: string }>
const buildHeadingAnchorContent: Build = (element) => {
  const level = Number.parseInt(element.tagName.replace("h", ""), 10)

  return {
    type: "text",
    value: "#".repeat(Number.isNaN(level) ? 1 : level),
  }
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const metadata = getBlogMetadata(slug)
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
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params

  let post: ReturnType<typeof getBlogPost>
  try {
    post = getBlogPost(slug)
  } catch {
    notFound()
  }

  const { metadata, content } = post
  const toc = getTableOfContents(content)

  return (
    <article>
      <header className="mb-12">
        <Reveal>
          <Link
            href="/"
            className="text-text-muted hover:text-text mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            Back
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-text font-serif text-3xl font-medium tracking-tight md:text-4xl">
            {metadata.title}
          </h1>
        </Reveal>

        {metadata.date && (
          <Reveal delay={0.15}>
            <time className="text-text-muted mt-3 block font-mono text-sm">
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
            <p className="text-text-secondary mt-4 text-lg">
              {metadata.description}
            </p>
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
  )
}
