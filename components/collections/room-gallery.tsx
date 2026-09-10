'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { waLink, type Category } from '@/lib/catalog'
import { WhatsAppGlyph } from '@/components/quick-contact'

/** Wide opening shot, then four closer framings. */
const tileClass = [
  'col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[4/5]',
]

export function RoomGallery({ category }: { category: Category }) {
  const shots = category.gallery
  const [open, setOpen] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const show = (i: number) => {
    setOpen(i)
    dialogRef.current?.showModal()
  }
  const close = useCallback(() => {
    setOpen(null)
    dialogRef.current?.close()
  }, [])
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const current = open === null ? null : shots[open]

  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-6 md:pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pb-8 md:pb-12">
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-primary">The gallery</p>
          <h2 className="text-display text-4xl md:text-6xl text-balance">Look closer at {category.room.toLowerCase()}.</h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed text-pretty">
          Five frames from the same room — the wide view first, then the details you only notice standing in it. Tap any
          frame to open it full screen.
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        {shots.map((shot, i) => (
          <li key={shot.src} className={tileClass[i] ?? 'aspect-[4/5]'}>
            <button
              type="button"
              onClick={() => show(i)}
              className="group relative block size-full overflow-hidden border border-border bg-card text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes={i === 0 ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 640px) 25vw, 50vw'}
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex items-end justify-between gap-3">
                <span className="text-xs md:text-sm text-foreground/90 leading-snug text-pretty max-w-[85%] translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.caption}
                </span>
                <Expand className="size-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span className="absolute left-3 top-3 font-mono text-[0.65rem] tracking-widest text-foreground/70 bg-background/50 backdrop-blur px-2 py-1">
                {String(i + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="lightbox fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none bg-background/95 p-0 backdrop:bg-background/80"
        aria-label={`${category.name} gallery`}
      >
        {current && (
          <div className="relative flex h-full w-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <p className="eyebrow text-primary">
                {category.room}
                <span className="text-muted-foreground ml-2 font-mono normal-case tracking-widest">
                  {String((open ?? 0) + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-10 items-center justify-center text-foreground/70 hover:text-primary transition-colors"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close gallery</span>
              </button>
            </div>

            <div className="relative flex-1 min-h-0">
              <Image
                key={current.src}
                src={current.src}
                alt={current.caption}
                fill
                sizes="100vw"
                className="object-contain animate-in fade-in duration-500"
              />
              <NavButton side="left" onClick={() => step(-1)} />
              <NavButton side="right" onClick={() => step(1)} />
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <p className="max-w-2xl text-sm md:text-base text-foreground/85 leading-relaxed text-pretty">
                {current.caption}
              </p>
              <a
                href={waLink(
                  `Hello Anand Furniture, I saw ${category.name} in your gallery (frame ${(open ?? 0) + 1}) and I would like to discuss something similar for my home.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-2 bg-primary px-5 py-3 text-xs tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <WhatsAppGlyph className="size-4" />
                Ask about this
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center border border-border bg-background/60 backdrop-blur text-foreground/80 hover:text-primary hover:border-primary/60 transition-colors',
        side === 'left' ? 'left-3 md:left-6' : 'right-3 md:right-6',
      )}
    >
      <Icon className="size-6" aria-hidden="true" />
      <span className="sr-only">{side === 'left' ? 'Previous frame' : 'Next frame'}</span>
    </button>
  )
}
