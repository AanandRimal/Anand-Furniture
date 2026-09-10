'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { Category } from '@/lib/catalog'
import { SpecList } from '@/components/spec-list'

export function RoomHero({ category }: { category: Category }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[88svh] min-h-[560px] overflow-hidden film-grain">
      <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0 will-change-transform">
        <Image src={category.image} alt={category.room} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
      <div className="absolute inset-0 vignette" />

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-14 md:pb-20 flex flex-col gap-5 max-w-3xl"
      >
        <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground flex items-center gap-2">
          <Link href="/collections" className="hover:text-primary transition-colors inline-block py-1">Collections</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary">{category.sceneIndex}</span>
        </nav>
        <p className="eyebrow text-foreground/70">{category.room}</p>
        <h1 className="text-display text-[clamp(3rem,9vw,8rem)] text-balance">{category.name}</h1>
        <p className="font-serif italic text-2xl md:text-3xl text-foreground/80">{category.tagline}</p>
        <SpecList items={category.specs} className="mt-1 max-w-md" />
      </motion.div>
    </section>
  )
}
