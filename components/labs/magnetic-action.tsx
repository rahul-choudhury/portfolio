"use client"

import { Button } from "@rahul-choudhury/ui/components"
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks"
import { motion, useMotionValue, useSpring } from "motion/react"
import type { PointerEvent } from "react"
import { LabStage } from "./lab-stage"
import type { LabComponentProps } from "./lab-types"

const spring = { stiffness: 260, damping: 20, mass: 0.7 }

export function MagneticAction({ compact = false }: LabComponentProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") return

    const bounds = event.currentTarget.getBoundingClientRect()
    const strength = compact ? 0.14 : 0.18
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength)
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength)
  }

  function resetPosition() {
    x.set(0)
    y.set(0)
  }

  return (
    <LabStage compact={compact}>
      <div
        className="flex size-full items-center justify-center"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPosition}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
        >
          <Button
            size={compact ? "md" : "lg"}
            className="rounded-sm px-5 shadow-sm"
          >
            Start building
          </Button>
        </motion.div>
      </div>
    </LabStage>
  )
}
