'use client'

import { motion, type Variants } from 'motion/react'
import type { Spec } from '@/lib/catalog'

/**
 * Material callouts pinned to the photograph: a dot on the thing itself, a
 * leader line drawn out from it, then the label. They arrive one after another
 * once the room has settled, which is what makes the eye follow them.
 */

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
}

const pin: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.3 } },
}

const dot: Variants = {
  hidden: { scale: 0 },
  shown: { scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const leader: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 } },
}

const label = (side: number): Variants => ({
  hidden: { opacity: 0, x: 10 * side },
  shown: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.22 } },
})

export function SpecPins({ specs, active }: { specs: readonly Spec[]; active: boolean }) {
  return (
    <motion.div
      variants={group}
      initial="hidden"
      animate={active ? 'shown' : 'hidden'}
      className="pointer-events-none absolute inset-0 hidden md:block"
      aria-hidden="true"
    >
      {specs.map((spec) => {
        // Past the middle of the frame the label has to run back inwards.
        const flip = spec.at[0] > 52
        return (
          <motion.div
            key={spec.text}
            variants={pin}
            // A flipped pin is anchored by its right edge, so the dot still
            // lands on the point rather than the label's far end.
            style={
              flip
                ? { right: `${100 - spec.at[0]}%`, top: `${spec.at[1]}%` }
                : { left: `${spec.at[0]}%`, top: `${spec.at[1]}%` }
            }
            className={`absolute flex items-center ${flip ? 'flex-row-reverse' : ''}`}
          >
            <span className="relative grid size-3 shrink-0 place-items-center">
              <motion.span variants={dot} className="size-[7px] rounded-full bg-primary shadow-[0_0_12px_2px_oklch(0.78_0.1_78/0.45)]" />
              <span className="absolute size-3 rounded-full border border-primary/60 animate-pulse-dot" />
            </span>
            <motion.span
              variants={leader}
              className={`h-px w-10 from-primary/80 to-primary/30 lg:w-16 ${
                flip ? 'origin-right bg-gradient-to-l' : 'origin-left bg-gradient-to-r'
              }`}
            />
            <motion.span
              variants={label(flip ? -1 : 1)}
              className="whitespace-nowrap border border-border/70 bg-background/75 px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide text-foreground backdrop-blur-sm"
            >
              {spec.text}
            </motion.span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
