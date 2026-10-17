import { ActionFeedback } from "@/components/labs/action-feedback";
import { DitherRipple } from "@/components/labs/dither-ripple";
import type { Lab } from "@/components/labs/lab-types";
import { MagneticAction } from "@/components/labs/magnetic-action";

export const LABS: Lab[] = [
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
  {
    slug: "dither-ripple",
    title: "Dither Ripple",
    Preview: DitherRipple,
  },
];
