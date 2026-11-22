import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion-reveal";
import { Page, PageTitle, TitleRow } from "@/components/page";
import { getAllBlogPosts } from "@/lib/blogs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on engineering, design, and building software.",
};

export default function BlogsPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <Page>
      <header className={styles.header}>
        <Reveal>
          <TitleRow backHref="/">
            <PageTitle>Writing</PageTitle>
          </TitleRow>
        </Reveal>
      </header>

      <div className={styles.posts}>
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.15 + index * 0.05} inView>
            <Link href={`/writing/${post.slug}`} className={styles.post}>
              <div className={styles.summary}>
                <h2 className={styles.title}>{post.title}</h2>
                {post.description && (
                  <p className={styles.description}>{post.description}</p>
                )}
              </div>
              {post.date && (
                <time dateTime={post.date} className={styles.date}>
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
    </Page>
  );
}
