import { Bot } from "@/components/labs/bot";
import { Composer } from "@/components/labs/composer";
import type { Lab } from "@/components/labs/lab-types";
import { ModelSlider } from "@/components/labs/model-slider";

export const LABS: Lab[] = [
  {
    slug: "bot",
    title: "Bot",
    description: "Grok Bot's default avatar, whose eyes follow the pointer.",
    Preview: Bot,
  },
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
      "Claude's in-chat composer, with its menus, attachments, dictation and voice mode.",
    Preview: Composer,
  },
];

export function getLab(slug: string) {
  return LABS.find((lab) => lab.slug === slug);
}
