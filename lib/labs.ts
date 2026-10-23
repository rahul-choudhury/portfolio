import { ActionFeedback } from "@/components/labs/action-feedback";
import { Composer } from "@/components/labs/composer";
import type { Lab } from "@/components/labs/lab-types";
import { MagneticAction } from "@/components/labs/magnetic-action";
import { ModelSlider } from "@/components/labs/model-slider";

export const LABS: Lab[] = [
  {
    slug: "model-slider",
    title: "Model Slider",
    description: "ChatGPT desktop app's model slider/picker.",
    Preview: ModelSlider,
  },
  {
    slug: "composer",
    title: "Composer",
    description:
      "ChatGPT's composer, whose add button pulls away from the field.",
    Preview: Composer,
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
