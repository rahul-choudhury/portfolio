import type { Metadata } from "next"
import { LabCard } from "@/components/labs/lab-card"
import { Reveal } from "@/components/motion-reveal"
import { LABS } from "@/lib/labs"

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Interface experiments exploring motion, feedback, and interaction.",
}

export default function LabsPage() {
  return (
    <>
      <header className="mb-12 md:mb-16">
        <Reveal>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-text md:text-5xl">
            Labs
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Small interface experiments exploring motion, feedback, and
            interaction.
          </p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {LABS.map((lab, index) => (
          <Reveal key={lab.slug} delay={0.15 + index * 0.05} inView>
            <LabCard lab={lab} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
