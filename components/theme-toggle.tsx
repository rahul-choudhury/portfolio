"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import styles from "./theme-toggle.module.css";

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
      className={styles.toggle}
    >
      <kbd ref={keycapRef} className={styles.keycap}>
        d
      </kbd>
    </button>
  );
}
