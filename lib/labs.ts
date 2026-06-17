import { ActionFeedback } from "@/components/labs/action-feedback"
import type { Lab } from "@/components/labs/lab-types"
import { MagneticAction } from "@/components/labs/magnetic-action"

export const LABS: Lab[] = [
  {
    slug: "magnetic-action",
    title: "Magnetic Action",
    description:
      "A button that responds to pointer proximity and springs naturally back into place.",
    Preview: MagneticAction,
    Demo: MagneticAction,
  },
  {
    slug: "action-feedback",
    title: "Action Feedback",
    description:
      "A compact action that communicates progress, completion, and recovery.",
    Preview: ActionFeedback,
    Demo: ActionFeedback,
  },
]

export function getLab(slug: string) {
  return LABS.find((lab) => lab.slug === slug)
}
