import { Star } from 'lucide-react'
import { testimonials } from '@/lib/catalog'
import { Reveal } from '@/components/reveal'

export function Testimonials() {
  const avg = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1)

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 flex flex-col gap-14">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-primary">Ratings</p>
            <h2 className="text-display text-5xl md:text-7xl text-balance">What the houses say back.</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-5xl leading-none">{avg}</span>
            <div className="flex flex-col gap-1">
              <Stars value={5} />
              <span className="text-xs text-muted-foreground">from {testimonials.length} recent homes</span>
            </div>
          </div>
        </Reveal>

        <ul className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="li"
              delay={i * 0.06}
              className="bg-background p-7 md:p-8 flex flex-col justify-between gap-8 min-h-72"
            >
              <blockquote className="font-serif text-xl md:text-2xl leading-snug text-pretty">“{t.text}”</blockquote>
              <footer className="flex flex-col gap-2">
                <Stars value={t.rating} />
                <p className="text-sm">
                  {t.name}
                  <span className="text-muted-foreground"> · {t.location}</span>
                </p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < value ? 'size-3.5 fill-primary text-primary' : 'size-3.5 text-foreground/25'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
