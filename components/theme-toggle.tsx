"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const keycapRef = useRef<HTMLElement>(null);
  const previousTheme = useRef(resolvedTheme);

  useEffect(() => {
    const changed =
      previousTheme.current !== undefined &&
      previousTheme.current !== resolvedTheme;
    previousTheme.current = resolvedTheme;

    if (
      !changed ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const keycap = keycapRef.current;
    if (!keycap) return;

    // Keep colors live during a theme change instead of capturing old RGB values.
    const raisedShadow = "var(--keycap-raised-shadow)";
    const pressedShadow = "var(--keycap-pressed-shadow)";

    const animation = keycap.animate(
      [
        { transform: "translateY(0)", boxShadow: raisedShadow },
        {
          transform: "translateY(3px)",
          boxShadow: pressedShadow,
          offset: 0.35,
        },
        { transform: "translateY(0)", boxShadow: raisedShadow },
      ],
      { duration: 180, easing: "ease-out" },
    );

    return () => animation.cancel();
  }, [resolvedTheme]);

  return (
    <button
      type="button"
      aria-label="Switch between light and dark themes"
      title="Switch themes (d)"
      onClick={() => {
        if (resolvedTheme === "light" || resolvedTheme === "dark") {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }
      }}
      className="group/keycap relative inline-flex cursor-pointer rounded-sm bg-transparent p-0 align-baseline after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] focus-visible:outline-none"
    >
      <kbd
        ref={keycapRef}
        className="inline-flex h-6 min-w-6.25 items-center justify-center rounded-sm border border-border-strong bg-linear-to-b from-surface to-surface-soft font-mono text-xs leading-none text-text-secondary shadow-(--keycap-raised-shadow) transition-transform duration-(--duration-fast) ease-out-quint [--keycap-pressed-shadow:0_0_0_var(--color-border-strong),0_1px_1px_rgb(0_0_0/0.12),inset_0_1px_0_var(--color-surface)] [--keycap-raised-shadow:0_3px_0_var(--color-border-strong),0_4px_2px_rgb(0_0_0/0.15),inset_0_1px_0_var(--color-surface)] group-hover/keycap:text-text group-focus-visible/keycap:text-text group-focus-visible/keycap:underline group-active/keycap:translate-y-0.75 group-active/keycap:shadow-(--keycap-pressed-shadow) motion-reduce:transition-none motion-reduce:group-active/keycap:translate-y-0"
      >
        d
      </kbd>
    </button>
  );
}
