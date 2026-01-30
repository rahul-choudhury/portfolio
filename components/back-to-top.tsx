"use client";

import { ArrowDownIcon } from "@phosphor-icons/react/ssr";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase decoration-1 underline-offset-4 hover:underline"
    >
      Back to Top <ArrowDownIcon className="size-3 rotate-180" />
    </button>
  );
}
