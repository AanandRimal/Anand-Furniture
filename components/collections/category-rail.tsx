import Link from 'next/link'
import { categories } from '@/lib/catalog'
import { cn } from '@/lib/utils'

/** Every collection, one tap away, wherever you are in the catalogue. */
export function CategoryRail({ current }: { current?: string }) {
  return (
    <nav aria-label="All collections" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <ul className="flex items-stretch gap-px overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const active = c.slug === current
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/collections/${c.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex h-full flex-col justify-center gap-0.5 border-b-2 px-4 py-3.5 transition-colors md:px-5',
                    active
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-foreground/60 hover:border-border hover:text-foreground',
                  )}
                >
                  <span className="whitespace-nowrap font-serif text-lg leading-tight md:text-xl">{c.name}</span>
                  <span className="whitespace-nowrap font-mono text-[0.65rem] text-muted-foreground">
                    {c.designs.length} designs · {c.gallery.length} photos
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
