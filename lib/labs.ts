import { ActionFeedback } from "@/components/labs/action-feedback";
import { GooeyInput } from "@/components/labs/gooey-input";
import type { Lab } from "@/components/labs/lab-types";
import { MagneticAction } from "@/components/labs/magnetic-action";

export const LABS: Lab[] = [
  {
    slug: "gooey-input",
    title: "Gooey Input",
    Preview: GooeyInput,
  },
  {
    slug: "magnetic-action",
    title: "Magnetic Action",
    Preview: MagneticAction,
  },
  {
    slug: "action-feedback",
    title: "Action Feedback",
    Preview: ActionFeedback,
  },
];
