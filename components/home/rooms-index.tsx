'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/lib/catalog'
import { cn } from '@/lib/utils'

export function RoomsIndex() {
  const [hovered, setHovered] = useState<string>(categories[0].slug)
  const current = categories.find((c) => c.slug === hovered) ?? categories[0]

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14 md:mb-20">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">The rooms</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance">Choose where to begin.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">
            Nine rooms, one grain. Every collection is designed to sit beside the others without a seam.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <ol className="lg:col-span-7 flex flex-col divide-y divide-border border-y border-border">
            {categories.map((c, i) => {
              const active = c.slug === hovered
              return (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    onMouseEnter={() => setHovered(c.slug)}
                    onFocus={() => setHovered(c.slug)}
                    className={cn(
                      'group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 md:py-6 transition-colors',
                      active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground',
                    )}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex flex-col gap-1">
                      <span className="font-serif text-3xl md:text-5xl leading-none tracking-tight">{c.name}</span>
                      <span className="text-xs text-muted-foreground hidden sm:block">{c.accent} · {c.designs.length} designs</span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        'size-5 transition-all duration-300',
                        active ? 'text-primary translate-x-0 translate-y-0' : 'translate-y-1 -translate-x-1 opacity-40',
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ol>

          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={current.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                <p className="eyebrow text-primary">{current.sceneIndex} / {current.room}</p>
                <p className="font-serif text-2xl md:text-3xl leading-tight">{current.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
