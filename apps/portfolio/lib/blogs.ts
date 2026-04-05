import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { blogPostMetadata, type BlogPostMetadata } from "./blog-metadata"

const CONTENT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../content"
)

export type TocEntry = { id: string; title: string; level: 2 | 3 }

export function getTableOfContents(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length as 2 | 3
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
    entries.push({ id, title, level })
  }

  return entries
}

export interface BlogPost extends BlogPostMetadata {}

export function getBlogSlugs(): string[] {
  return blogPostMetadata.map((post) => post.slug)
}

export function getBlogMetadata(slug: string): BlogPost {
  const post = blogPostMetadata.find((entry) => entry.slug === slug)

  if (!post) {
    throw new Error(`Blog post not found for slug: ${slug}`)
  }

  return post
}

export function getBlogPost(slug: string): {
  metadata: BlogPost
  content: string
} {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    metadata: {
      ...getBlogMetadata(slug),
      title: data.title ?? getBlogMetadata(slug).title,
      date: data.date ?? getBlogMetadata(slug).date,
      description: data.description ?? getBlogMetadata(slug).description,
    },
    content,
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPostMetadata]
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}
