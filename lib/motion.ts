import { easeOutQuint } from "@rahul-choudhury/ui";

export const BLUR_REVEAL_TRANSITION = {
  duration: 0.4,
  ease: easeOutQuint,
};

export const BLUR_REVEAL_FILTER = {
  hidden: "blur(4px)",
  visible: "blur(0px)",
};
