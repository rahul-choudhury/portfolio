import Link from "next/link";
import type { ComponentProps } from "react";
import { Reveal } from "@/components/motion-reveal";
import { EmailLink } from "./email-link";

export default function Home() {
  return (
    <article className="mx-auto max-w-xl pt-10 md:pt-20">
      <Reveal delay={0.05}>
        <h1 className="font-serif text-2xl font-medium tracking-tight text-text md:text-3xl">
          Hi! I&apos;m Rahul.
        </h1>
      </Reveal>

      <div className="mt-8 space-y-6 text-base leading-7 text-text-secondary md:mt-9">
        <Reveal delay={0.1}>
          <p>I&apos;m a Frontend Developer at Growth Panda.</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p>
            Most days, I&apos;m working with TypeScript, React, and Next.js. I
            also reach for Go and PostgreSQL when the work moves beyond the
            interface.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p>
            {/* I keep longer notes about engineering and design in my{" "} */}
            {/* <InlineLink href="/writing"> */}
            {/*   writing */}
            {/* </InlineLink> */}
            {/* , explore motion and interaction in the{" "} */}I explore motion
            and interaction in the <InlineLink href="/lab">lab</InlineLink>, and
            document the components and decisions behind this site and my
            personal projects in its{" "}
            <InlineLink href="/design-system">design system</InlineLink>.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p>
            You can find me on{" "}
            <InlineLink
              href="https://github.com/rahul-choudhury"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </InlineLink>
            , connect with me on{" "}
            <InlineLink
              href="https://www.linkedin.com/in/rchoudhurydev"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </InlineLink>
            , or take a look at my{" "}
            <InlineLink
              href="/resume_rahul-choudhury.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              résumé
            </InlineLink>
            .
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <div className="mt-9 border-t border-border pt-6 md:mt-10">
          <p className="mb-3 text-sm text-text-muted">
            Have something in mind?
          </p>
          <EmailLink />
        </div>
      </Reveal>
    </article>
  );
}

function InlineLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link
      {...props}
      className="font-medium text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
    />
  );
}
