'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { allDesigns, categories, formatPrice, PRICE_NOTE, waLink } from '@/lib/catalog'
import { WhatsAppGlyph } from '@/components/quick-contact'
import { SelectionToggle } from '@/components/selection-toggle'
import { cn } from '@/lib/utils'

type Props = {
  /** Show a taster with a link to the full catalogue, or leave off for everything. */
  limit?: number
  /** Lead with one piece from every room, so the whole range is visible at a glance. */
  perRoom?: boolean
  heading: string
  eyebrow: string
  intro: string
}

const sorts = {
  featured: 'Featured',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
} as const

export function DesignBrowser({ limit, perRoom, heading, eyebrow, intro }: Props) {
  const [room, setRoom] = useState<string>('all')
  const [sort, setSort] = useState<keyof typeof sorts>('featured')

  const filtered = useMemo(() => {
    const list =
      perRoom && room === 'all'
        ? categories.map((category) => ({ design: category.designs[0], category }))
        : allDesigns.filter((d) => room === 'all' || d.category.slug === room)
    if (sort === 'featured') return list
    return [...list].sort((a, b) =>
      sort === 'price-asc'
        ? a.design.priceFrom - b.design.priceFrom
        : b.design.priceFrom - a.design.priceFrom,
    )
  }, [room, sort, perRoom])

  const shown = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance">{heading}</h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed text-pretty">{intro}</p>
        </div>

        <div className="flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by room"
          >
            <Chip active={room === 'all'} onClick={() => setRoom('all')}>
              Everything <span className="font-mono text-[0.7rem] opacity-60">{allDesigns.length}</span>
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={room === c.slug} onClick={() => setRoom(c.slug)}>
                {c.name} <span className="font-mono text-[0.7rem] opacity-60">{c.designs.length}</span>
              </Chip>
            ))}
          </div>
          <label className="flex shrink-0 items-center gap-3 text-sm">
            <span className="eyebrow text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
              className="border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {Object.entries(sorts).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul
          className={cn(
            'grid grid-cols-2 gap-px bg-border border border-border md:grid-cols-3',
            !perRoom && 'xl:grid-cols-4',
          )}
        >
          {shown.map(({ design, category }) => (
            <li key={design.id} className="bg-background flex flex-col">
              <Link
                href={`/collections/${category.slug}`}
                className="group flex flex-1 flex-col gap-4 p-3 pb-4 md:p-4 md:pb-5"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <p className="absolute left-2.5 top-2.5 eyebrow bg-background/60 backdrop-blur px-2 py-1 text-foreground/80">
                    {category.name}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-serif text-xl md:text-2xl leading-tight tracking-tight group-hover:text-primary transition-colors text-balance">
                    {design.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{design.note}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-mono text-sm text-primary">{formatPrice(design)}</p>
                  <p className="text-[0.7rem] text-muted-foreground">from · ready in {design.leadTime}</p>
                </div>
              </Link>
              <div className="mx-3 mb-3 md:mx-4 md:mb-4 grid grid-cols-2 gap-2">
                <SelectionToggle id={design.id} />
                <a
                  href={waLink(
                    `Hello Anand Furniture, I am interested in the "${design.name}" (${category.name}). Could you send me the details and a quote?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border py-2.5 text-[0.7rem] tracking-widest uppercase text-foreground/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <WhatsAppGlyph className="size-3.5" />
                  Enquire
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{PRICE_NOTE}</p>
          {shown.length < allDesigns.length && (
            <Link
              href="/collections"
              className="group inline-flex w-fit items-center gap-3 border-b border-primary/50 pt-1.5 pb-1 text-sm tracking-widest uppercase text-primary hover:border-primary transition-colors"
            >
              See all {allDesigns.length} designs
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 border px-3.5 py-2 text-sm transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-foreground/75 hover:border-foreground/50 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
