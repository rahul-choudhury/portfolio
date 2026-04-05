"use client"

import { motion, useAnimationControls } from "motion/react"
import { type ReactNode, useEffect } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  inView?: boolean
}

const easeOutQuint = [0.23, 1, 0.32, 1] as const

const baseTransition = {
  duration: 0.55,
  ease: easeOutQuint,
}

// Module-level promise that resolves when the page is ready for animations.
// On a fresh page load/reload, this waits for the load event + rAF to ensure
// Chrome has released paint holding before animations fire.
// On client-side navigation, the module was already loaded so the promise
// is already resolved. Animations start immediately.
let readyResolve: (() => void) | null = null
const animationReady: Promise<void> =
  typeof window !== "undefined"
    ? new Promise<void>((resolve) => {
        readyResolve = resolve
      })
    : Promise.resolve()

if (typeof window !== "undefined") {
  const markReady = () => {
    requestAnimationFrame(() => {
      readyResolve?.()
    })
  }

  if (document.readyState === "complete") {
    markReady()
  } else {
    window.addEventListener("load", markReady, { once: true })
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  inView = false,
}: RevealProps) {
  const controls = useAnimationControls()

  useEffect(() => {
    if (inView) return

    let cancelled = false
    animationReady.then(() => {
      if (!cancelled) {
        controls.start({ opacity: 1, filter: "blur(0px)" })
      }
    })

    return () => {
      cancelled = true
    }
  }, [controls, inView])

  return (
    <motion.div
      initial={{ opacity: 0.01, filter: "blur(4px)" }}
      transition={{ ...baseTransition, delay }}
      className={className}
      {...(inView
        ? {
            whileInView: { opacity: 1, filter: "blur(0px)" },
            viewport: { once: true, amount: 0.35 },
          }
        : { animate: controls })}
    >
      {children}
    </motion.div>
  )
}
