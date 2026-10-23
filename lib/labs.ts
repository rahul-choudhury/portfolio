import { ActionFeedback } from "@/components/labs/action-feedback";
import { GooeyInput } from "@/components/labs/gooey-input";
import type { Lab } from "@/components/labs/lab-types";
import { MagneticAction } from "@/components/labs/magnetic-action";

export const LABS: Lab[] = [
  {
    slug: "gooey-input",
    title: "Gooey Input",
    description: "A search field whose icon dissolves into the text.",
    Preview: GooeyInput,
  },
  {
    slug: "magnetic-action",
    title: "Magnetic Action",
    description: "A button that drifts toward the pointer.",
    Preview: MagneticAction,
  },
  {
    slug: "action-feedback",
    title: "Action Feedback",
    description: "A button that shows its own progress.",
    Preview: ActionFeedback,
  },
];

export function getLab(slug: string) {
  return LABS.find((lab) => lab.slug === slug);
}
