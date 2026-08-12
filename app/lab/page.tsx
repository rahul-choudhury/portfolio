import { ArrowUDownLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { LabCard } from "@/components/labs/lab-card";
import { Reveal } from "@/components/motion-reveal";
import { LABS } from "@/lib/labs";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interface experiments exploring motion, feedback, and interaction.",
};

export default function LabPage() {
  return (
    <div className="mx-auto max-w-xl pt-10 md:pt-20">
      <header className="mb-9">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-serif text-2xl font-medium tracking-tight text-text md:text-3xl">
              Lab
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

      <div className="grid grid-cols-1 gap-4">
        {LABS.map((lab, index) => (
          <Reveal key={lab.slug} delay={0.15 + index * 0.05} inView>
            <LabCard lab={lab} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
