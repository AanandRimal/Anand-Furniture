'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { walkthroughScenes } from '@/lib/catalog'
import { SpecList } from '@/components/spec-list'
import { SpecPins } from '@/components/home/spec-pins'

const scenes = walkthroughScenes
const count = scenes.length
const slot = 1 / count

// Scroll timelines require keyframe offsets strictly inside [0, 1]; the first and
// last scenes' transition windows would otherwise spill past the edges.
/**
 * Where scene i sits still, as a multiple of the viewport height from the top
 * of the section. The sticky panel scrolls (count - 1) viewports in total, so
 * the middle of scene i's hold is not simply i + 0.5.
 */
const restAt = (i: number) => ((i + 0.5) / count) * (count - 1)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const range = (...points: number[]) => {
  const out = points.map(clamp01)
  for (let i = 1; i < out.length; i++) {
    if (out[i] <= out[i - 1]) out[i] = Math.min(1, out[i - 1] + 0.0001)
  }
  return out
}

export function Walkthrough() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count + 0.0001)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const jumpTo = useCallback((index: number) => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + restAt(index) * window.innerHeight, behavior: 'smooth' })
  }, [])

  if (reduceMotion) {
    return <StaticWalkthrough />
  }

  return (
    <section
      ref={sectionRef}
      aria-label="A walkthrough of the house"
      style={{ height: `${count * 100}svh` }}
      className="relative bg-background"
    >
      {/*
        One snap point per room, parked where that room sits still. Scrolling
        therefore settles on a room rather than halfway through a doorway, and a
        fast flick cannot skip past one unseen.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden="true">
        {scenes.map((scene, i) => (
          <div
            key={scene.slug}
            className="absolute inset-x-0 h-px snap-start"
            style={{ top: `calc(${restAt(i).toFixed(4)} * 100svh)` }}
          />
        ))}
      </div>

      <div className="sticky top-0 h-svh overflow-hidden bg-background film-grain">
        {/*
          Only the room either side of this one is mounted, so the next
          photograph is decoded before its door opens. Each one then hides
          itself outside its own window: a clipped full-bleed layer still costs
          a composite even when nothing of it is showing, and stacking those
          was what made the scroll stutter.
        */}
        {scenes.map((scene, i) =>
          Math.abs(i - active) <= 1 ? (
            <Scene key={scene.slug} index={i} progress={scrollYProgress} scene={scene} isActive={active === i} />
          ) : null,
        )}
        <SceneRail active={active} onJump={jumpTo} />
        <ProgressStrip progress={scrollYProgress} active={active} />
      </div>
    </section>
  )
}

type SceneProps = {
  index: number
  progress: MotionValue<number>
  scene: (typeof scenes)[number]
  isActive: boolean
}

function Scene({ index, progress, scene, isActive }: SceneProps) {
  const start = index * slot
  const end = start + slot
  const isFirst = index === 0
  const isLast = index === count - 1
  const drift = index % 2 === 0 ? 1 : -1

  // Each room opens out of a door-shaped aperture in the middle of the frame.
  const enterFrom = start - slot * 0.22
  const enterTo = start + slot * 0.12
  const enterRange = range(enterFrom, enterFrom + (enterTo - enterFrom) * 0.25, enterTo)
  const insetY = useTransform(progress, enterRange, isFirst ? [0, 0, 0] : [14, 12, 0])
  const insetX = useTransform(progress, enterRange, isFirst ? [0, 0, 0] : [50, 42, 0])
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}%)`

  // The camera never stops moving forward: it pushes through the hold and keeps
  // pushing while the next doorway opens over the top of it.
  const cameraRange = range(enterFrom, enterTo, end - slot * 0.22, end + slot * 0.12)
  const scale = useTransform(progress, cameraRange, isFirst ? [1.06, 1.06, 1.16, 1.28] : [1.3, 1.08, 1.17, 1.29])
  const x = useTransform(progress, cameraRange, [`${-1.6 * drift}%`, `${0.4 * drift}%`, `${1.4 * drift}%`, `${2.2 * drift}%`])

  // The light dips as you pass through the threshold. This used to be a
  // filter: blur() plus brightness() on the photograph, which repaints a
  // full-screen layer on every frame and was the main source of the stutter.
  // An overlay's opacity gets the same read for free on the compositor.
  const shade = useTransform(progress, enterRange, isFirst ? [0, 0, 0] : [0.55, 0.34, 0])

  const dim = useTransform(progress, range(end - slot * 0.22, end + slot * 0.12), isLast ? [0, 0] : [0, 0.75])

  // Outside its own stretch of the scroll a room paints nothing at all, so a
  // hold costs one layer and only a threshold costs two.
  const exitEnd = end + slot * 0.14
  const visibility = useTransform(progress, (p) =>
    p >= enterFrom - 0.002 && p <= exitEnd ? 'visible' : 'hidden',
  )

  // The doorjamb sweeping past the lens as you step through it.
  const frameScale = useTransform(progress, enterRange, [1, 1.5, 3])
  const frameOpacity = useTransform(progress, enterRange, isFirst ? [0, 0, 0] : [0.55, 0.4, 0])

  const textRange = range(start + slot * 0.08, start + slot * 0.3, end - slot * 0.3, end - slot * 0.16)
  const textOpacity = useTransform(progress, textRange, isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0])
  const textY = useTransform(progress, textRange, isFirst ? [0, 0, 0, -40] : isLast ? [48, 0, 0, 0] : [48, 0, 0, -40])
  const ghostY = useTransform(progress, textRange, ['12%', '0%', '-4%', '-14%'])

  return (
    <motion.div style={{ clipPath, zIndex: index, visibility }} className="absolute inset-0 will-change-[clip-path]">
      <motion.div style={{ scale, x }} className="absolute inset-0 origin-center will-change-transform">
        <Image src={scene.image} alt={scene.label} fill sizes="100vw" className="object-cover" />
        <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-[oklch(0.08_0.01_55)]" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/30" />
      <div className="absolute inset-0 vignette" />
      {!isFirst && <SpecPins specs={scene.specs} active={isActive} />}
      <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-background" />

      {!isFirst && (
        <motion.div
          style={{ scale: frameScale, opacity: frameOpacity }}
          className="pointer-events-none absolute inset-0 origin-center border-[6vmin] border-[oklch(0.1_0.01_55)]"
          aria-hidden="true"
        />
      )}

      {isFirst ? (
        <FrontDoor progress={progress} />
      ) : (
        <>
          <motion.p
            style={{ y: ghostY, opacity: textOpacity }}
            aria-hidden="true"
            className="pointer-events-none absolute right-[-1vw] top-[6vh] font-serif text-[26vw] leading-none text-foreground/[0.09] select-none"
          >
            {scene.index.replace(/\D/g, '')}
          </motion.p>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-x-0 bottom-0 px-5 pb-24 md:px-10 md:pb-20 lg:pr-72"
          >
            <div className="max-w-2xl flex flex-col gap-5">
              <p className="eyebrow text-primary">
                {scene.index} <span className="text-muted-foreground mx-2">/</span> {scene.label}
              </p>
              <h3 className="text-display text-[clamp(2.5rem,7vw,6rem)] text-balance">{scene.title}</h3>
              <p className="text-foreground/80 leading-relaxed max-w-lg text-pretty hidden sm:block">{scene.copy}</p>
              <SpecList items={scene.specs} className="max-w-sm md:hidden" />
              <Link
                href={scene.href}
                className="group inline-flex w-fit items-center gap-3 border-b border-primary/50 pt-1.5 pb-1 text-sm tracking-widest uppercase text-primary hover:border-primary transition-colors"
              >
                Enter the room
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

/** Scene 01: the two front doors, pulled apart by the scroll itself. */
function FrontDoor({ progress }: { progress: MotionValue<number> }) {
  const doorRange = range(slot * 0.04, slot * 0.5)
  const leftX = useTransform(progress, doorRange, ['0%', '-101%'])
  const rightX = useTransform(progress, doorRange, ['0%', '101%'])
  const panels = useTransform(progress, range(slot * 0.46, slot * 0.56), [1, 0])
  const title = useTransform(progress, range(0, slot * 0.16), [1, 0])
  const titleY = useTransform(progress, range(0, slot * 0.16), [0, -50])
  const cue = useTransform(progress, range(0, slot * 0.1), [1, 0])
  const gap = useTransform(progress, range(slot * 0.04, slot * 0.22), [0.9, 0])

  return (
    <>
      <motion.div style={{ opacity: panels }} className="absolute inset-0" aria-hidden="true">
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 w-1/2 bg-[oklch(0.12_0.012_55)] border-r border-primary/25 flex items-center justify-end"
        >
          <span className="font-serif text-[clamp(3rem,10vw,8rem)] leading-none text-foreground/90 pr-1">An</span>
          <span className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        </motion.div>
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 w-1/2 bg-[oklch(0.12_0.012_55)] border-l border-primary/25 flex items-center justify-start"
        >
          <span className="font-serif text-[clamp(3rem,10vw,8rem)] leading-none text-foreground/90 pl-1">and</span>
        </motion.div>
        {/* the sliver of warm light escaping between the doors as they part */}
        <motion.div
          style={{ opacity: gap }}
          className="absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.1_78/0.45),transparent_70%)]"
        />
      </motion.div>

      <motion.div
        style={{ opacity: title, y: titleY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="eyebrow text-primary mb-6">Now come inside</p>
        <h2 className="text-display text-[clamp(3rem,12vw,10rem)] text-balance">
          A house,
          <br />
          <span className="italic font-light">told room by room.</span>
        </h2>
        <p className="mt-8 max-w-md text-muted-foreground leading-relaxed text-pretty">
          Ten rooms in one continuous walk, from the front door to the last wardrobe. Every piece in it is ours.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: cue }}
        className="absolute bottom-10 inset-x-0 z-10 flex flex-col items-center gap-3 text-muted-foreground"
      >
        <span className="eyebrow">Scroll to open the door</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.div>
    </>
  )
}

function SceneRail({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <nav aria-label="Scenes" className="absolute right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {scenes.map((s, i) => {
        const isActive = i === active
        return (
          <button
            key={s.slug}
            type="button"
            onClick={() => onJump(i)}
            aria-current={isActive ? 'step' : undefined}
            className="group flex items-center justify-end gap-3 py-1.5 text-right"
          >
            <span
              className={cn(
                'eyebrow transition-all duration-300',
                isActive
                  ? 'text-primary opacity-100 translate-x-0'
                  : 'text-foreground/60 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                'block h-px transition-all duration-300',
                isActive ? 'w-8 bg-primary' : 'w-4 bg-foreground/40 group-hover:bg-foreground',
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}

function ProgressStrip({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const scene = scenes[active]
  return (
    <div className="absolute inset-x-0 bottom-0 z-40">
      <div className="flex items-center justify-between px-5 md:px-10 pb-4 text-muted-foreground">
        <p className="eyebrow flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" aria-hidden="true" />
          {scene.index}
          <span className="text-foreground/40">of {String(count).padStart(2, '0')}</span>
        </p>
        <p className="eyebrow lg:hidden">{scene.label}</p>
      </div>
      <div className="h-px w-full bg-foreground/15">
        <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-primary" />
      </div>
    </div>
  )
}

function StaticWalkthrough() {
  return (
    <section aria-label="A walkthrough of the house" className="flex flex-col">
      {scenes.map((scene, i) => (
        <div key={scene.slug} className="relative h-[80svh] min-h-[480px] overflow-hidden">
          <Image src={scene.image} alt={scene.label} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-12 flex flex-col gap-4 max-w-2xl">
            <p className="eyebrow text-primary">
              {scene.index} / {scene.label}
            </p>
            <h3 className="text-display text-5xl md:text-7xl text-balance">{scene.title}</h3>
            <p className="text-foreground/80 leading-relaxed text-pretty">{scene.copy}</p>
            <SpecList items={scene.specs} className="max-w-sm" />
            <Link
              href={scene.href}
              className="text-primary text-sm tracking-widest uppercase w-fit border-b border-primary/50 pt-1.5 pb-1"
            >
              Enter the room
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
