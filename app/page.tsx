import { InlineLink } from "@/components/inline-link";
import { Reveal } from "@/components/motion-reveal";
import { Page, PageTitle } from "@/components/page";
import { ThemeToggle } from "@/components/theme-toggle";
import { EmailLink } from "./email-link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Page as="article">
      <Reveal delay={0.05}>
        <PageTitle>Hi! I&apos;m Rahul.</PageTitle>
      </Reveal>

      <div className={styles.intro}>
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
            <InlineLink href="/design-system">design system</InlineLink>. Oh,
            and try pressing <ThemeToggle />
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
        <div className={styles.contact}>
          <p className={styles.prompt}>Have something in mind?</p>
          <EmailLink />
        </div>
      </Reveal>
    </Page>
  );
}
